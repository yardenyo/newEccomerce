import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import { authMiddleware, adminMiddleware } from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            `${this.path}`,
            authMiddleware,
            adminMiddleware,
            this.getAllUsers,
        );
        this.router.get(
            `${this.path}/:id`,
            authMiddleware,
            adminMiddleware,
            this.getUserById,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            adminMiddleware,
            this.deleteUserById,
        );
        this.router.delete(
            `${this.path}`,
            authMiddleware,
            adminMiddleware,
            this.deleteAllUsers,
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware,
            adminMiddleware,
            validationMiddleware(validate.updateUser),
            this.updateUserById,
        );
        this.router.put(
            `${this.path}/block/:id`,
            authMiddleware,
            adminMiddleware,
            this.blockUserById,
        );
        this.router.put(
            `${this.path}/unblock/:id`,
            authMiddleware,
            adminMiddleware,
            this.unblockUserById,
        );
        this.router.put(
            `${this.path}/role/:id`,
            authMiddleware,
            adminMiddleware,
            validationMiddleware(validate.updateRole),
            this.updateRole,
        );
    }

    private getAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const users = await this.UserService.getAllUsers(req.query);
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
            await validateDBId(id);
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
            await validateDBId(id);
            await this.UserService.deleteUserById(id);
            res.json(new SuccessResponse('User deleted successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteAllUsers = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await this.UserService.deleteAllUsers();
            res.json(new SuccessResponse('Users deleted successfully'));
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
            await validateDBId(id);
            const user = await this.UserService.updateUserById(id, req.body);
            res.json(new SuccessResponse('User updated successfully', user));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private blockUserById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await validateDBId(id);
            const user = await this.UserService.blockUserById(id);
            res.json(new SuccessResponse('User blocked successfully', user));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private unblockUserById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await validateDBId(id);
            const user = await this.UserService.unblockUserById(id);
            res.json(new SuccessResponse('User unblocked successfully', user));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateRole = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await validateDBId(id);
            const { role } = req.body;
            const user = await this.UserService.updateRole(id, role);
            res.json(
                new SuccessResponse('User role updated successfully', user),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default UserController;
