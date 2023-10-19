import { Document } from 'mongoose';

export default interface BlogCategory extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
}
