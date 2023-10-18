import jwt from 'jsonwebtoken';

export const generateRefreshToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET!, {
        expiresIn: '3d',
    });
};
