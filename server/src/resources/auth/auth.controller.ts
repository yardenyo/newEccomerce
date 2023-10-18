import loginLimiter from '@/middleware/loginLimiter.middleware';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import {
    verifyRefreshTokenMiddleware,
    authMiddleware,
} from '@/middleware/auth.middleware';
import AuthService from '@/resources/auth/auth.service';
import validate from '@/resources/auth/auth.validation';
import Roles from '@/utils/enums/roles.enums';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';
import validateDBId from '@/utils/validateDBId';

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
        this.router.post(
            `${this.path}/refresh-token`,
            validationMiddleware(validate.refreshToken),
            verifyRefreshTokenMiddleware,
            this.refreshToken,
        );
        this.router.get(`${this.path}/signout`, authMiddleware, this.signout);
        this.router.put(
            `${this.path}/update-password`,
            validationMiddleware(validate.updatePassword),
            authMiddleware,
            this.updatePassword,
        );
    }

    private signup = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await this.AuthService.signup(req.body, Roles.USER);

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
            const { accessToken, refreshToken } = await this.AuthService.signin(
                email,
                password,
            );

            res.json(
                new SuccessResponse('User signed in successfully', {
                    accessToken,
                    refreshToken,
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
            const { id } = req.body;
            await validateDBId(id);
            const { accessToken, refreshToken } =
                await this.AuthService.refreshToken(id);

            res.json(
                new SuccessResponse('Token refreshed successfully', {
                    accessToken,
                    refreshToken,
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
            const { _id } = req.body.user;
            await this.AuthService.signout(_id);

            res.json(new SuccessResponse('User signed out successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updatePassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.body.user;
            const { password } = req.body;

            await validateDBId(id);

            await this.AuthService.updatePassword(id, password);

            res.json(new SuccessResponse('Password updated successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default AuthController;
