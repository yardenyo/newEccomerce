import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

function errorMiddleware(
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const status = error.status || 500;
    const success = error.success || false;
    const message = error.message || 'Something went wrong';
    const errors = error.errors || [];

    response.status(status).send({
        status,
        success,
        message,
        ...(errors.length > 0 && { errors }),
    });
}

export default errorMiddleware;
