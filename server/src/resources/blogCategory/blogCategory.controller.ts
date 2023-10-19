import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/blogCategory/blogCategory.validation';
import BlogCategoryService from '@/resources/blogCategory/blogCategory.service';
import {
    authMiddleware,
    creatorMiddleware,
} from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class BlogCategoryController implements Controller {
    public path = '/blogCategories';
    public router = Router();
    private blogCategoryService = new BlogCategoryService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.createBlogCategory),
            authMiddleware,
            creatorMiddleware,
            this.createBlogCategory,
        );
        this.router.post(
            `${this.path}`,
            authMiddleware,
            this.getAllBlogCategories,
        );
        this.router.get(
            `${this.path}/:id`,
            authMiddleware,
            this.getBlogCategoryById,
        );
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateBlogCategory),
            authMiddleware,
            creatorMiddleware,
            this.updateBlogCategory,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            creatorMiddleware,
            this.deleteBlogCategory,
        );
        this.router.delete(
            `${this.path}`,
            authMiddleware,
            creatorMiddleware,
            this.deleteAllBlogCategories,
        );
    }

    private createBlogCategory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const blogCategoryData = req.body;
            const createdBlogCategory =
                await this.blogCategoryService.createBlogCategory(
                    blogCategoryData,
                );
            res.json(
                new SuccessResponse(
                    'Blog category created',
                    createdBlogCategory,
                ),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllBlogCategories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const blogCategories =
                await this.blogCategoryService.getAllBlogCategories(req.body);
            res.json(
                new SuccessResponse(
                    'Blog categories retrieved',
                    blogCategories,
                ),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getBlogCategoryById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            validateDBId(req.params.id);
            const blogCategory =
                await this.blogCategoryService.getBlogCategoryById(
                    req.params.id,
                );
            res.json(
                new SuccessResponse('Blog category retrieved', blogCategory),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateBlogCategory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const blogCategoryId = req.params.id;
            const blogCategoryData = req.body;
            const updatedBlogCategory =
                await this.blogCategoryService.updateBlogCategory(
                    blogCategoryId,
                    blogCategoryData,
                );
            res.json(
                new SuccessResponse(
                    'Blog category updated',
                    updatedBlogCategory,
                ),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteBlogCategory = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            validateDBId(req.params.id);
            const deletedBlogCategory =
                await this.blogCategoryService.deleteBlogCategory(
                    req.params.id,
                );
            res.json(
                new SuccessResponse(
                    'Blog category deleted',
                    deletedBlogCategory,
                ),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteAllBlogCategories = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const deletedBlogCategories =
                await this.blogCategoryService.deleteAllBlogCategories();
            res.json(
                new SuccessResponse(
                    'Blog categories deleted',
                    deletedBlogCategories,
                ),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default BlogCategoryController;
