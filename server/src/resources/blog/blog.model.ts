import { Schema, model } from 'mongoose';
import Blog from '@/resources/blog/blog.interface';

const BlogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isLiked: {
            type: Boolean,
            default: false,
        },
        isDisliked: {
            type: Boolean,
            default: false,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        dislikes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        image: {
            type: String,
            default:
                'https://thumbs.dreamstime.com/z/blogging-blog-concepts-ideas-worktable-blogging-blog-concepts-ideas-white-worktable-110423482.jpg?w=992',
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    },
);

const BlogModel = model<Blog>('Blog', BlogSchema);

export default BlogModel;
