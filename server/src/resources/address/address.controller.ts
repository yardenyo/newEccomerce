import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/address/address.validation';
import AddressService from '@/resources/address/address.service';
import {
    authMiddleware,
    creatorMiddleware,
    adminMiddleware,
} from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class AddressController implements Controller {
    public path = '/addresses';
    public router = Router();
    private addressService = new AddressService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.createAddress),
            authMiddleware,
            this.createAddress,
        );
        this.router.post(`${this.path}`, authMiddleware, this.getAllAddresss);
        this.router.get(
            `${this.path}/:id`,
            authMiddleware,
            this.getAddressById,
        );
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateAddress),
            authMiddleware,
            this.updateAddress,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            this.deleteAddress,
        );
        this.router.delete(
            `${this.path}`,
            authMiddleware,
            this.deleteAllAddresss,
        );
    }

    private createAddress = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const addressData = req.body;
            const userId = req.body.user._id;
            await validateDBId(userId);
            const address = await this.addressService.createAddress(
                addressData,
                userId,
            );
            res.json(new SuccessResponse('Address created', address));
        } catch (error) {
            next(new HttpException(500, 'Error creating address'));
        }
    };

    private getAllAddresss = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const addresss = await this.addressService.getAllAddresses(
                req.body,
            );
            res.json(new SuccessResponse('Addresss retrieved', addresss));
        } catch (error) {
            next(new HttpException(500, 'Error retrieving addresss'));
        }
    };

    private getAddressById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const address = await this.addressService.getAddressById(
                req.params.id,
            );
            res.json(new SuccessResponse('Address retrieved', address));
        } catch (error) {
            next(new HttpException(500, 'Error retrieving address'));
        }
    };

    private updateAddress = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            await validateDBId(id);
            const address = await this.addressService.updateAddress(
                id,
                req.body,
                req.body.user,
            );
            res.json(new SuccessResponse('Address updated', address));
        } catch (error) {
            next(new HttpException(500, 'Error updating address'));
        }
    };

    private deleteAddress = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            await validateDBId(id);
            await this.addressService.deleteAddress(id, req.body.user);
            res.json(new SuccessResponse('Address deleted'));
        } catch (error) {
            next(new HttpException(500, 'Error deleting address'));
        }
    };

    private deleteAllAddresss = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await this.addressService.deleteAllAddresses();
            res.json(new SuccessResponse('All addresss deleted'));
        } catch (error) {
            next(new HttpException(500, 'Error deleting addresss'));
        }
    };
}

export default AddressController;
