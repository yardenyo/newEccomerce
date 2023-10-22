import Product from '@/resources/product/product.interface';
import orderStatus from '@/utils/enums/orderStatus.enums';
import { Document } from 'mongoose';

export default interface Order extends Document {
    _id: string;
    products: Product[];
    paymentIntent: string;
    orderStatus: orderStatus;
    orderBy: string;
    createdAt: string;
    updatedAt: string;
}
