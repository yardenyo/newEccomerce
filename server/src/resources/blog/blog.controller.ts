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

    private initializeRoutes(): void {}
}

export default BlogController;
