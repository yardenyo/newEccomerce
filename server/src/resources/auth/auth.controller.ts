import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/auth/auth.validation';
import AuthService from '@/resources/auth/auth.service';

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
            res.status(201).json({ user });
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
            res.status(200).json({ user });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default AuthController;
