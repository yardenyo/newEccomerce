import jwt from 'jsonwebtoken';

// Generate refresh token
export const generateRefreshToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '3d',
    });
};
