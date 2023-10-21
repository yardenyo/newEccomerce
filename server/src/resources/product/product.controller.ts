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
import {
    uploadPhoto,
    productImageResize,
} from '@/middleware/uploadImage.middleware';
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
            validationMiddleware(validate.createProduct),
            authMiddleware,
            creatorMiddleware,
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
            validationMiddleware(validate.updateProduct),
            authMiddleware,
            creatorMiddleware,
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
        this.router.put(
            `${this.path}/wishlist/add`,
            validationMiddleware(validate.addProductToWishlist),
            authMiddleware,
            this.addProductToWishlist,
        );
        this.router.put(
            `${this.path}/wishlist/remove`,
            validationMiddleware(validate.removeProductFromWishlist),
            authMiddleware,
            this.removeProductFromWishlist,
        );
        this.router.put(
            `${this.path}/wishlist/removeAll`,
            authMiddleware,
            this.removeAllProductsFromWishlist,
        );
        this.router.put(
            `${this.path}/cart/add`,
            validationMiddleware(validate.addProductToCart),
            authMiddleware,
            this.addProductToCart,
        );
        this.router.put(
            `${this.path}/cart/remove`,
            validationMiddleware(validate.removeProductFromCart),
            authMiddleware,
            this.removeProductFromCart,
        );
        this.router.put(
            `${this.path}/ratings/add`,
            validationMiddleware(validate.addProductRating),
            authMiddleware,
            this.addProductRating,
        );
        this.router.put(
            `${this.path}/upload/:productId`,
            authMiddleware,
            creatorMiddleware,
            uploadPhoto.array('images', 10),
            productImageResize,
            this.uploadProductImages,
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

    private addProductToWishlist = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.ProductService.addProductToWishlist(
                req.body,
            );
            res.json(new SuccessResponse('Product added to wishlist', product));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private removeProductFromWishlist = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.ProductService.removeProductFromWishlist(
                req.body,
            );
            res.json(
                new SuccessResponse('Product removed from wishlist', product),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private removeAllProductsFromWishlist = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product =
                await this.ProductService.removeAllProductsFromWishlist(
                    req.body,
                );
            res.json(
                new SuccessResponse(
                    'All products removed from wishlist',
                    product,
                ),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private addProductToCart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.ProductService.addProductToCart(
                req.body,
            );
            res.json(new SuccessResponse('Product added to cart', product));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private removeProductFromCart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.ProductService.removeProductFromCart(
                req.body,
            );
            res.json(new SuccessResponse('Product removed from cart', product));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private addProductRating = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const product = await this.ProductService.addProductRating(
                req.body,
            );
            res.json(new SuccessResponse('Product rating added', product));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private uploadProductImages = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const productId = req.params.productId;
            validateDBId(productId);
            const product = await this.ProductService.uploadProductImages(
                req.params.productId,
                req.body.images as Express.Multer.File[],
            );
            res.json(new SuccessResponse('Product images uploaded', product));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default ProductController;
