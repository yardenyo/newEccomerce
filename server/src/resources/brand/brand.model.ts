import { Schema, model } from 'mongoose';
import Brand from '@/resources/brand/brand.interface';

const BrandSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
    },
    { timestamps: true },
);

const BrandModel = model<Brand>('Brand', BrandSchema);

export default BrandModel;
