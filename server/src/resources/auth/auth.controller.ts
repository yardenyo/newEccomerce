import validationMiddleware from '@/middleware/validation.middleware';
import loginLimiter from '@/middleware/loginLimiter';
import AuthService from '@/resources/auth/auth.service';
import validate from '@/resources/auth/auth.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { generateToken } from '@/utils/jwtToken';
import { generateRefreshToken } from '@/utils/refreshToken';
import SuccessResponse from '@/utils/responses/success.response';
import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

class AuthController implements Controller {
    public path = '/auth';
    public router = Router();
    private AuthService = new AuthService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/signup`,
            validationMiddleware(validate.signup),
            this.signup,
        );
        this.router.post(
            `${this.path}/signin`,
            loginLimiter,
            validationMiddleware(validate.signin),
            this.signin,
        );
        this.router.get(`${this.path}/refresh-token`, this.refreshToken);
        this.router.get(`${this.path}/signout`, this.signout);
    }

    private signup = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { firstName, lastName, email, mobile, password } = req.body;
            const user = await this.AuthService.signup(
                firstName,
                lastName,
                email,
                mobile,
                password,
            );
            res.json(
                new SuccessResponse('User created successfully', {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    mobile: user.mobile,
                }),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private signin = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await this.AuthService.signin(email, password);

            const refreshToken = generateRefreshToken(user._id);

            await this.AuthService.updateRefreshToken(user._id, refreshToken);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
            });

            res.json(
                new SuccessResponse('User signed in successfully', {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    mobile: user.mobile,
                    token: generateToken(user._id),
                }),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private refreshToken = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { refreshToken } = req.cookies;
            const user = await this.AuthService.refreshToken(refreshToken);

            jwt.verify(
                user.refreshToken,
                process.env.JWT_SECRET as string,
                (err: any, decoded: any) => {
                    if (err) {
                        throw new Error('Invalid refresh token');
                    }
                },
            );

            const newRefreshToken = generateRefreshToken(user._id);

            await this.AuthService.updateRefreshToken(
                user._id,
                newRefreshToken,
            );

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 72 * 60 * 60 * 1000,
            });

            res.json(
                new SuccessResponse('Token refreshed successfully', {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    mobile: user.mobile,
                    refreshToken: user.refreshToken,
                    token: generateToken(user._id),
                }),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private signout = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { refreshToken } = req.cookies;
            await this.AuthService.signout(refreshToken);
            res.clearCookie('refreshToken', {
                httpOnly: true,
            });
            res.json(new SuccessResponse('User signed out successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default AuthController;
