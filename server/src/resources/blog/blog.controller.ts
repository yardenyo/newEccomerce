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
    }

    private createBlog = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const blogData = req.body;
            const userId = req.body.user._id;
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
}

export default BlogController;
