import { Schema, model } from 'mongoose';
import Order from '@/resources/order/order.interface';
import orderStatus from '@/utils/enums/orderStatus.enums';

const OrderSchema = new Schema(
    {
        products: [
            {
                product: {
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
            },
        ],
        paymentIntent: {
            type: String,
            required: true,
        },
        orderStatus: {
            type: String,
            enum: Object.values(orderStatus),
            default: orderStatus.NOT_PROCESSED,
        },
        orderBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true },
);

const OrderModel = model<Order>('Order', OrderSchema);

export default OrderModel;
