
import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/order/order.validation';
import OrderService from '@/resources/order/order.service';
import {
    authMiddleware,
    creatorMiddleware,
} from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class OrderController implements Controller {
    public path = '/orders';
    public router = Router();
    private orderService = new OrderService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {

    }

    
}

export default OrderController;
