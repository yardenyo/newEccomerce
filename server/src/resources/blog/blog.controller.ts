import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/blog/blog.validation';
import BlogService from '@/resources/blog/blog.service';
import {
    authMiddleware,
    creatorMiddleware,
} from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class BlogController implements Controller {
    public path = '/blogs';
    public router = Router();
    private blogService = new BlogService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.createBlog),
            authMiddleware,
            creatorMiddleware,
            this.createBlog,
        );
        this.router.post(`${this.path}`, authMiddleware, this.getAllBlogs);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getBlogById);
        this.router.put(
            `${this.path}/:id`,
            authMiddleware,
            creatorMiddleware,
            this.updateBlog,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            creatorMiddleware,
            this.deleteBlog,
        );
        this.router.delete(
            `${this.path}`,
            authMiddleware,
            creatorMiddleware,
            this.deleteAllBlogs,
        );
        this.router.post(
            `${this.path}/like/:id`,
            authMiddleware,
            this.likeBlog,
        );
        this.router.post(
            `${this.path}/dislike/:id`,
            authMiddleware,
            this.dislikeBlog,
        );
    }

    private createBlog = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const blogData = req.body;
            const userId = req.body.user._id;
            await validateDBId(userId);
            const blog = await this.blogService.createBlog(blogData, userId);
            res.json(new SuccessResponse('Blog created successfully', blog));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllBlogs = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const blogs = await this.blogService.getAllBlogs(req.body);
            res.json(
                new SuccessResponse('Blogs retrieved successfully', blogs),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getBlogById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            await validateDBId(id);
            const blog = await this.blogService.getBlogById(id);
            res.json(new SuccessResponse('Blog retrieved successfully', blog));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateBlog = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            await validateDBId(id);
            const { user, ...blogData } = req.body;
            const blog = await this.blogService.updateBlog(id, blogData, user);
            res.json(new SuccessResponse('Blog updated successfully', blog));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteBlog = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            await validateDBId(id);
            const user = req.body.user;
            await this.blogService.deleteBlog(id, user);
            res.json(new SuccessResponse('Blog deleted successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteAllBlogs = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await this.blogService.deleteAllBlogs();
            res.json(new SuccessResponse('Blogs deleted successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private likeBlog = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            await validateDBId(id);
            const user = req.body.user;
            await this.blogService.likeBlog(id, user);
            res.json(new SuccessResponse('Blog liked successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private dislikeBlog = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            await validateDBId(id);
            const user = req.body.user;
            await this.blogService.dislikeBlog(id, user);
            res.json(new SuccessResponse('Blog disliked successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default BlogController;
