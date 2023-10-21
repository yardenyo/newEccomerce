import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/cart/cart.validation';
import CartService from '@/resources/cart/cart.service';
import {
    authMiddleware,
    creatorMiddleware,
} from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class CartController implements Controller {
    public path = '/cart';
    public router = Router();
    private cartService = new CartService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.put(
            `${this.path}/add`,
            validationMiddleware(validate.addToCart),
            authMiddleware,
            this.addProductToCart,
        );
    }

    private addProductToCart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { products } = req.body;
            const { _id: userId } = req.body.user;
            const cart = await this.cartService.addProductToCart(
                userId,
                products,
            );

            res.json(new SuccessResponse('Product added to cart', cart));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default CartController;
