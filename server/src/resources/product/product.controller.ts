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
            `${this.path}/create`,
            authMiddleware,
            creatorMiddleware,
            validationMiddleware(validate.createProduct),
            this.createProduct,
        );
        this.router.post(`${this.path}`, authMiddleware, this.getAllProducts);
        this.router.get(
            `${this.path}/:id`,
            authMiddleware,
            this.getProductById,
        );
        this.router.put(
            `${this.path}/:id`,
            authMiddleware,
            creatorMiddleware,
            validationMiddleware(validate.updateProduct),
            this.updateProduct,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            creatorMiddleware,
            this.deleteProduct,
        );
        this.router.delete(
            `${this.path}`,
            authMiddleware,
            creatorMiddleware,
            this.deleteAllProducts,
        );
    }

    private createProduct = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.ProductService.createProduct(req.body);
            res.json(new SuccessResponse('Product created', product));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllProducts = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const products = await this.ProductService.getAllProducts(req.body);
            res.json(new SuccessResponse('Products retrieved', products));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getProductById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            validateDBId(id);
            const product = await this.ProductService.getProductById(id);
            res.json(new SuccessResponse('Product retrieved', product));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateProduct = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            validateDBId(id);

            const product = await this.ProductService.updateProduct(
                id,
                req.body,
            );
            res.json(new SuccessResponse('Product updated', product));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteProduct = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            validateDBId(id);
            await this.ProductService.deleteProductById(id);
            res.json(new SuccessResponse('Product deleted'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteAllProducts = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await this.ProductService.deleteAllProducts();
            res.json(new SuccessResponse('Products deleted'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default ProductController;
