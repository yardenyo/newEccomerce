import userModel from '@/resources/user/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import User from '@/resources/user/user.interface';
import { Roles } from '@/utils/enums';

interface NewRequest extends Request {
    user?: User;
}

const authMiddleware = async (
    req: NewRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new HttpException(401, 'Not Authorized');
        }
        let decoded: JwtPayload;
        try {
            decoded = jwt.verify(
                token,
                process.env.JWT_SECRET as string,
            ) as JwtPayload;
        } catch (error) {
            throw new HttpException(401, 'Not Authorized');
        }
        const user = await userModel.findById(decoded.id);
        if (!user) {
            throw new HttpException(401, 'Not Authorized');
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

const adminMiddleware = async (
    req: NewRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        if (req.user && req.user.role === Roles.ADMIN) {
            next();
        } else {
            throw new HttpException(401, 'Not Authorized');
        }
    } catch (error) {
        next(error);
    }
};

export { authMiddleware, adminMiddleware };
