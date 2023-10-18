import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/role/role.validation';
import RoleService from '@/resources/role/role.service';
import { authMiddleware, adminMiddleware } from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class RoleController implements Controller {
    public path = '/roles';
    public router = Router();
    private roleService = new RoleService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            authMiddleware,
            adminMiddleware,
            this.getAllRoles,
        );
        this.router.get(
            `${this.path}/:id`,
            authMiddleware,
            adminMiddleware,
            this.getRoleById,
        );
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.createRole),
            authMiddleware,
            adminMiddleware,
            this.createRole,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            adminMiddleware,
            this.deleteRoleById,
        );
        this.router.delete(
            `${this.path}`,
            authMiddleware,
            adminMiddleware,
            this.deleteAllRoles,
        );
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateRole),
            authMiddleware,
            adminMiddleware,
            this.updateRoleById,
        );
    }

    private getAllRoles = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const roles = await this.roleService.getAllRoles(request.body);
            response.json(
                new SuccessResponse('Successfully retrieved roles', roles),
            );
        } catch (error) {
            next(new HttpException(500, 'Error getting roles'));
        }
    };

    private getRoleById = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { id } = request.params;
        await validateDBId(id);

        try {
            const role = await this.roleService.getRoleById(id);
            response.json(
                new SuccessResponse('Successfully retrieved role', role),
            );
        } catch (error) {
            next(new HttpException(500, 'Error getting role'));
        }
    };

    private createRole = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { name } = request.body;

        try {
            const newRole = await this.roleService.createRole(name);
            response.json(
                new SuccessResponse('Successfully created role', newRole),
            );
        } catch (error) {
            next(new HttpException(500, 'Error creating role'));
        }
    };

    private deleteRoleById = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { id } = request.params;
        await validateDBId(id);

        try {
            await this.roleService.deleteRoleById(id);
            response.json(new SuccessResponse('Successfully deleted role'));
        } catch (error) {
            next(new HttpException(500, 'Error deleting role'));
        }
    };

    private deleteAllRoles = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await this.roleService.deleteAllRoles();
            response.json(new SuccessResponse('Successfully deleted roles'));
        } catch (error) {
            next(new HttpException(500, 'Error deleting roles'));
        }
    };

    private updateRoleById = async (
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<void> => {
        const { id } = request.params;
        const { role } = request.body;
        await validateDBId(id);

        try {
            const updatedRole = await this.roleService.updateRole(id, role);
            response.json(
                new SuccessResponse('Successfully updated role', updatedRole),
            );
        } catch (error) {
            next(new HttpException(500, 'Error updating role'));
        }
    };
}

export default RoleController;
