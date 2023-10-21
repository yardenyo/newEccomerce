import { Document } from 'mongoose';
import Product from '@/resources/product/product.interface';
import orderStatus from '@/utils/enums/orderStatus.enums';

export default interface Order extends Document {
    _id: string;
    products: Product[];
    paymentIntent: string;
    orderStatus: orderStatus;
    orderBy: string;
    createdAt: string;
    updatedAt: string;
}
