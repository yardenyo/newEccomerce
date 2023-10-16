import rateLimit from 'express-rate-limit';
import HttpException from '@/utils/exceptions/http.exception';

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again after 15 minutes',
    handler: (req, res, next, options) => {
        next(new HttpException(429, options.message));
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default loginLimiter;
