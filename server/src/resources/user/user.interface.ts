import { Document } from 'mongoose';
import Roles from '@/utils/enums/roles.enums';

export default interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    role: Roles;
    isBlocked: boolean;
    cart: string | undefined;
    wishlist: string[];
    address: string[];
    password: string;
    createdAt: Date;
    updatedAt: Date;
    passwordChangedAt: Date;
    resetPasswordToken: string | undefined;
    resetPasswordExpires: Date | undefined;
    isValidPassword(password: string): Promise<boolean>;
    createPasswordResetToken(): Promise<string>;
}
