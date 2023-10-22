import {
    authMiddleware,
    creatorMiddleware,
} from '@/middleware/auth.middleware';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import BrandService from '@/resources/brand/brand.service';
import validate from '@/resources/brand/brand.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import validateDBId from '@/utils/validateDBId';
import { NextFunction, Request, Response, Router } from 'express';

class BrandController implements Controller {
    public path = '/brands';
    public router = Router();
    private brandService = new BrandService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.createBrand),
            authMiddleware,
            creatorMiddleware,
            this.createBrand,
        );
        this.router.post(`${this.path}`, authMiddleware, this.getAllBrands);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getBrandById);
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateBrand),
            authMiddleware,
            creatorMiddleware,
            this.updateBrand,
        );
        this.router.delete(
            `${this.path}/:id`,
            authMiddleware,
            creatorMiddleware,
            this.deleteBrand,
        );
        this.router.delete(
            `${this.path}`,
            authMiddleware,
            creatorMiddleware,
            this.deleteAllBrands,
        );
    }

    private createBrand = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const brandData = req.body;
            const createdBrand = await this.brandService.createBrand(brandData);
            res.json(
                new SuccessResponse('Brand created successfully', createdBrand),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getAllBrands = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const brands = await this.brandService.getAllBrands(req.body);
            res.json(
                new SuccessResponse('Brands retrieved successfully', brands),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getBrandById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            validateDBId(id);
            const brand = await this.brandService.getBrandById(id);
            res.json(
                new SuccessResponse('Brand retrieved successfully', brand),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateBrand = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            validateDBId(id);
            const brandData = req.body;
            const updatedBrand = await this.brandService.updateBrand(
                id,
                brandData,
            );
            res.json(
                new SuccessResponse('Brand updated successfully', updatedBrand),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteBrand = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const id = req.params.id;
            validateDBId(id);
            const deletedBrand = await this.brandService.deleteBrand(id);
            res.json(
                new SuccessResponse('Brand deleted successfully', deletedBrand),
            );
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteAllBrands = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            await this.brandService.deleteAllBrands();
            res.json(new SuccessResponse('Brands deleted successfully'));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default BrandController;
