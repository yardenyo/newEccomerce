import { Document } from 'mongoose';
import Roles from '@/utils/enums/roles.enums';

export default interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    role: Roles;
    isBlocked: boolean;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isValidPassword(password: string): Promise<boolean>;
}
