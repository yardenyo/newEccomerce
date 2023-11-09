import Category from '@/resources/category/category.interface';
import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const CategoryModel = model<Category>('Category', CategorySchema);

export default CategoryModel;
