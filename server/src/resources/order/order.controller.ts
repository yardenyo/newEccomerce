import { authMiddleware } from '@/middleware/auth.middleware';
import SuccessResponse from '@/middleware/success.middleware';
import OrderService from '@/resources/order/order.service';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class OrderController implements Controller {
    public path = '/orders';
    public router = Router();
    private orderService = new OrderService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(`${this.path}`, authMiddleware, this.createOrder);
    }

    private createOrder = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const session = await this.orderService.createOrder(req.body.user);
            res.json(new SuccessResponse('Order created', session));
        } catch (error) {
            next(error);
        }
    };
}

export default OrderController;
