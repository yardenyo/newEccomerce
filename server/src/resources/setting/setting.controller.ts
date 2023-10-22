import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import SuccessResponse from '@/middleware/success.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/setting/setting.validation';
import SettingService from '@/resources/setting/setting.service';
import { authMiddleware, adminMiddleware } from '@/middleware/auth.middleware';
import validateDBId from '@/utils/validateDBId';

class SettingController implements Controller {
    public path = '/settings';
    public router = Router();
    private settingService = new SettingService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            authMiddleware,
            adminMiddleware,
            this.getAllSettings,
        );
        this.router.get(`${this.path}`, authMiddleware, this.getUserSetting);
        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(validate.updateSetting),
            authMiddleware,
            this.updateUserSetting,
        );
    }

    private getAllSettings = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const settings = await this.settingService.getAllSettings(req.body);
            res.json(new SuccessResponse('User settings retrieved', settings));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getUserSetting = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userId = req.body.user._id;
            await validateDBId(userId);
            const setting = await this.settingService.getSetting(userId);
            res.json(new SuccessResponse('User setting retrieved', setting));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private updateUserSetting = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userId = req.body.user._id;
            await validateDBId(userId);
            const setting = await this.settingService.updateSetting(
                userId,
                req.body,
            );
            res.json(new SuccessResponse('User setting updated', setting));
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default SettingController;
