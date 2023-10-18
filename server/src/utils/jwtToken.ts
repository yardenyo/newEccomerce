import jwt from 'jsonwebtoken';

export const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
};
