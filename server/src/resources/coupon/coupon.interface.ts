import { Document } from 'mongoose';

export default interface Coupon extends Document {
    code?: string;
    discount: number;
    expireAfterDays?: number;
    expiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
