import { Document } from 'mongoose';

export default interface Category extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
