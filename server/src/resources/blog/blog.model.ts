
import { Schema, model } from 'mongoose';
import Blog from '@/resources/blog/blog.interface';

const BlogSchema = new Schema(
    {
    },
    { timestamps: true },
);

const BlogModel = model<Blog>(
    'Blog',
    BlogSchema,
);

export default BlogModel;
