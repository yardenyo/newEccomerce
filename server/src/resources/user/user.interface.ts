import { Document } from 'mongoose';

export default interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    role: 'user' | 'admin';
    isBlocked: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    refreshToken: string;
    isValidPassword(password: string): Promise<boolean>;
}
