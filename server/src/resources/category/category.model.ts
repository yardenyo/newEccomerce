import { Schema, model } from 'mongoose';
import Category from '@/resources/category/category.interface';

const CategorySchema = new Schema(
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

const CategoryModel = model<Category>('Category', CategorySchema);

export default CategoryModel;
