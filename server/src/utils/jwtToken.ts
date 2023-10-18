import jwt from 'jsonwebtoken';

export const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: '1d',
    });
};
