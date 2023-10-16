import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/product/product.validation';
import ProductService from '@/resources/product/product.service';
import {
    authMiddleware,
    creatorMiddleware,
} from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class ProductController implements Controller {
    public path = '/products';
    public router = Router();
    private ProductService = new ProductService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            authMiddleware,
            creatorMiddleware,
            validationMiddleware(validate.create),
            this.create,
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const {
                title,
                slug,
                description,
                price,
                category,
                brand,
                quantity,
                sold,
                images,
                color,
                ratings,
            } = req.body;
            const product = await this.ProductService.create(
                title,
                slug,
                description,
                price,
                category,
                brand,
                quantity,
                sold,
                images,
                color,
                ratings,
            );
            res.json(new SuccessResponse('Product created', product));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default ProductController;
