import { Schema, model } from 'mongoose';
import Cart from '@/resources/cart/cart.interface';

const CartSchema = new Schema(
    {
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                color: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        cartTotal: {
            type: Number,
            required: true,
        },
        totalAfterDiscount: {
            type: Number,
            required: true,
        },
        orderedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

const CartModel = model<Cart>('Cart', CartSchema);

export default CartModel;
