import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/coupon/coupon.validation';
import CouponService from '@/resources/coupon/coupon.service';
import { authMiddleware, adminMiddleware } from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class CouponController implements Controller {
    public path = '/coupons';
    public router = Router();
    private couponService = new CouponService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.createCoupon),
            authMiddleware,
            adminMiddleware,
            this.createCoupon,
        );
        this.router.post(
            `${this.path}`,
            authMiddleware,
            adminMiddleware,
            this.getAllCoupons,
        );
        this.router.get(
            `${this.path}/:id`,
            authMiddleware,
            adminMiddleware,
            this.getCouponById,
        );
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateCoupon),
            authMiddleware,
            adminMiddleware,
            this.updateCoupon,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            adminMiddleware,
            this.deleteCoupon,
        );
        this.router.delete(
            `${this.path}`,
            authMiddleware,
            adminMiddleware,
            this.deleteAllCoupons,
        );
    }

    private createCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { discount, expireAfterDays } = req.body;
            const createdCoupon = await this.couponService.createCoupon(
                discount,
                expireAfterDays,
            );
            res.json(new SuccessResponse('Coupon created', createdCoupon));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllCoupons = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const coupons = await this.couponService.getAllCoupons(req.body);
            res.json(new SuccessResponse('Coupons retrieved', coupons));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getCouponById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            validateDBId(id);
            const coupon = await this.couponService.getCouponById(id);
            res.json(new SuccessResponse('Coupon retrieved', coupon));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const couponData = req.body;
            validateDBId(id);
            const updatedCoupon = await this.couponService.updateCoupon(
                id,
                couponData,
            );
            res.json(new SuccessResponse('Coupon updated', updatedCoupon));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteCoupon = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            validateDBId(id);
            const deletedCoupon = await this.couponService.deleteCoupon(id);
            res.json(new SuccessResponse('Coupon deleted', deletedCoupon));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteAllCoupons = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await this.couponService.deleteAllCoupons();
            res.json(new SuccessResponse('Coupons deleted'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default CouponController;
