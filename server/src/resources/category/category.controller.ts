import {
    authMiddleware,
    creatorMiddleware,
} from '@/middleware/auth.middleware';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import CategoryService from '@/resources/category/category.service';
import validate from '@/resources/category/category.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import validateDBId from '@/utils/validateDBId';
import { NextFunction, Request, Response, Router } from 'express';

class CategoryController implements Controller {
    public path = '/categories';
    public router = Router();
    private categoryService = new CategoryService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.createCategory),
            authMiddleware,
            creatorMiddleware,
            this.createCategory,
        );
        this.router.post(`${this.path}`, authMiddleware, this.getAllCategories);
        this.router.get(
            `${this.path}/:id`,
            authMiddleware,
            this.getCategoryById,
        );
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateCategory),
            authMiddleware,
            creatorMiddleware,
            this.updateCategory,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            creatorMiddleware,
            this.deleteCategory,
        );
        this.router.delete(
            `${this.path}`,
            authMiddleware,
            creatorMiddleware,
            this.deleteAllCategories,
        );
    }

    private createCategory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const categoryData = req.body;
            const newCategory =
                await this.categoryService.createCategory(categoryData);
            res.json(new SuccessResponse('Category created', newCategory));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllCategories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const categories = await this.categoryService.getAllCategories(
                req.body,
            );
            res.json(new SuccessResponse('Categories found', categories));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getCategoryById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const categoryId = req.params.id;
            await validateDBId(categoryId);
            const category =
                await this.categoryService.getCategoryById(categoryId);
            res.json(new SuccessResponse('Category found', category));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateCategory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const categoryId = req.params.id;
            const categoryData = req.body;
            await validateDBId(categoryId);
            const updatedCategory = await this.categoryService.updateCategory(
                categoryId,
                categoryData,
            );
            res.json(new SuccessResponse('Category updated', updatedCategory));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteCategory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const categoryId = req.params.id;
            await validateDBId(categoryId);
            const deletedCategory =
                await this.categoryService.deleteCategory(categoryId);
            res.json(new SuccessResponse('Category deleted', deletedCategory));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteAllCategories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await this.categoryService.deleteAllCategories();
            res.json(new SuccessResponse('All categories deleted'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default CategoryController;
