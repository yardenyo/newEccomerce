import BlogCategory from '@/resources/blogCategory/blogCategory.interface';
import { Schema, model } from 'mongoose';

const BlogCategorySchema = new Schema(
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

const BlogCategoryModel = model<BlogCategory>(
    'BlogCategory',
    BlogCategorySchema,
);

export default BlogCategoryModel;
