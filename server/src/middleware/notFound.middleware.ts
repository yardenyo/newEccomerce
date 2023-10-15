import { Request, Response, NextFunction } from 'express';

function notFoundHandler(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const status = 404;
    const success = false;
    const message = 'Not Found';

    response.status(status).send({
        status,
        success,
        message,
    });
}

export default notFoundHandler;
