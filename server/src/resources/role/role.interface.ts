import { Document } from 'mongoose';

export default interface Role extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
