import { authMiddleware } from '@/middleware/auth.middleware';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import CartService from '@/resources/cart/cart.service';
import validate from '@/resources/cart/cart.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import validateDBId from '@/utils/validateDBId';
import { NextFunction, Request, Response, Router } from 'express';

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
        this.router.put(
            `${this.path}/remove`,
            validationMiddleware(validate.removeFromCart),
            authMiddleware,
            this.removeProductFromCart,
        );
        this.router.get(`${this.path}`, authMiddleware, this.getUserCart);
        this.router.delete(`${this.path}`, authMiddleware, this.emptyCart);
        this.router.post(
            `${this.path}/apply-coupon`,
            validationMiddleware(validate.applyCoupon),
            authMiddleware,
            this.applyCoupon,
        );
        this.router.post(
            `${this.path}/remove-coupon`,
            validationMiddleware(validate.removeCoupon),
            authMiddleware,
            this.removeCoupon,
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
            await validateDBId(userId);
            const cart = await this.cartService.addProductToCart(
                userId,
                products,
            );

            res.json(new SuccessResponse('Product added to cart', cart));
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
            const { products } = req.body;
            const { _id: userId } = req.body.user;
            await validateDBId(userId);
            const cart = await this.cartService.removeProductFromCart(
                userId,
                products,
            );

            res.json(new SuccessResponse('Product removed from cart', cart));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUserCart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { _id: userId } = req.body.user;
            await validateDBId(userId);
            const cart = await this.cartService.getUserCart(userId);

            res.json(new SuccessResponse('User cart', cart));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private emptyCart = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { _id: userId } = req.body.user;
            await validateDBId(userId);
            const cart = await this.cartService.emptyCart(userId);

            res.json(new SuccessResponse('Cart emptied', cart));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private applyCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { coupon } = req.body;
            const { _id: userId } = req.body.user;
            await validateDBId(userId);
            const cart = await this.cartService.applyCoupon(userId, coupon);

            res.json(new SuccessResponse('Coupon applied', cart));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private removeCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { coupon } = req.body;
            const { _id: userId } = req.body.user;
            await validateDBId(userId);
            const cart = await this.cartService.removeCoupon(userId);

            res.json(new SuccessResponse('Coupon removed', cart));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default CartController;
