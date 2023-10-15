import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/utils/responses/success.response';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/auth/auth.validation';
import AuthService from '@/resources/auth/auth.service';
import { generateToken } from '@/utils/jwtToken';

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
            validationMiddleware(validate.signin),
            this.signin,
        );
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
}

export default AuthController;
