import { Document } from 'mongoose';

export default interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    role: 'user' | 'admin';
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
