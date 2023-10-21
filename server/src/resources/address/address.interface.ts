import { Document } from 'mongoose';

export default interface Address extends Document {
    user: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    isDefault: boolean;
}
