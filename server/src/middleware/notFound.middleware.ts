import { Request, Response, NextFunction } from 'express';

function notFoundHandler(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const status = 404;
    const message = 'Not Found';

    response.status(status).send({
        status,
        message,
    });
}

export default notFoundHandler;
