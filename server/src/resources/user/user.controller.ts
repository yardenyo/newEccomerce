import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/utils/responses/success.response';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(`${this.path}`, this.getAllUsers);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.delete(`${this.path}/:id`, this.deleteUserById);
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateUser),
            this.updateUserById,
        );
    }

    private getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const users = await this.UserService.getAllUsers();
            res.json(new SuccessResponse('Users fetched successfully', users));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUserById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const user = await this.UserService.getUserById(id);
            res.json(new SuccessResponse('User fetched successfully', user));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteUserById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await this.UserService.deleteUserById(id);
            res.json(new SuccessResponse('User deleted successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateUserById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const { firstName, lastName, email, mobile } = req.body;
            const user = await this.UserService.updateUserById(
                id,
                firstName,
                lastName,
                email,
                mobile,
            );
            res.json(new SuccessResponse('User updated successfully', user));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UserController;
