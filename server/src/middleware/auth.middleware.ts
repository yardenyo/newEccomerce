import userModel from '@/resources/user/user.model';
import roleModel from '@/resources/role/role.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';
import User from '@/resources/user/user.interface';
import Roles from '@/utils/enums/roles.enums';
import { verifyToken } from '@/utils/jwtToken';
import redisClient from '@/utils/config/redisConfig';
import { verifyRefreshToken } from '@/utils/refreshToken';

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
            decoded = verifyToken(token) as JwtPayload;
        } catch (error) {
            throw new HttpException(401, 'Not Authorized');
        }
        const user = await userModel.findById(decoded.id);
        if (!user) {
            throw new HttpException(401, 'Not Authorized');
        }
        req.body.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

const creatorMiddleware = async (
    req: NewRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const role = await roleModel.findById(req.body.user?.role);
        if (
            (req.body.user && role?.name === Roles.MODERATOR) ||
            role?.name === Roles.ADMIN
        )
            next();
        else throw new HttpException(401, 'Not Authorized');
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
        const role = await roleModel.findById(req.body.user?.role);
        if (req.body.user && role?.name === Roles.ADMIN) next();
        else throw new HttpException(401, 'Not Authorized');
    } catch (error) {
        next(error);
    }
};

const verifyRefreshTokenMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) throw new HttpException(401, 'Not Authorized');

        const decoded = verifyRefreshToken(refreshToken);
        if (typeof decoded === 'string')
            throw new HttpException(401, 'Invalid token');

        const redisData = await redisClient.get(decoded.id.toString());

        if (!redisData) throw new HttpException(401, 'Not Authorized');

        const redisToken = JSON.parse(redisData).token;

        if (refreshToken !== redisToken)
            throw new HttpException(401, 'Not Authorized');

        req.body.id = decoded.id;
        next();
    } catch (error: any) {
        next();
    }
};

export {
    authMiddleware,
    creatorMiddleware,
    adminMiddleware,
    verifyRefreshTokenMiddleware,
};
