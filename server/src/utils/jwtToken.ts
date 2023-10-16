import jwt from 'jsonwebtoken';

// Generate token
export const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
    });
};
