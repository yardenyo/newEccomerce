import { Document } from 'mongoose';

export default interface Brand extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
