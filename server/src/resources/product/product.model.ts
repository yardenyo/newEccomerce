import { Schema, model } from 'mongoose';
import Product from '@/resources/product/product.interface';
import Colors from '@/utils/enums/colors.enums';

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 32,
            text: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
            text: true,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 32,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: 'Brand',
        },
        quantity: {
            type: Number,
            required: true,
        },
        sold: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
            required: true,
        },
        color: {
            type: String,
            enum: Colors,
            default: 'White',
        },
        ratings: [
            {
                star: {
                    type: Number,
                    required: true,
                },
                postedBy: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
    },
    {
        timestamps: true,
    },
);

export default model<Product>('Product', ProductSchema);
