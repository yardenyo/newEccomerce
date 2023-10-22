import Cart from '@/resources/cart/cart.interface';
import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
    {
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                name: {
                    type: String,
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
                images: {
                    type: Array,
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
        activeCoupon: {
            type: String,
        },
        orderedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true },
);

CartSchema.path('cartTotal').set(function (value: number) {
    return parseFloat(value.toFixed(2));
});

CartSchema.path('totalAfterDiscount').set(function (value: number) {
    return parseFloat(value.toFixed(2));
});

const CartModel = model<Cart>('Cart', CartSchema);

export default CartModel;
