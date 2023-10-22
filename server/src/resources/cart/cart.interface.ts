import Product from '@/resources/product/product.interface';
import { Document } from 'mongoose';

export default interface Cart extends Document {
    _id: string;
    products: Product[];
    cartTotal: number;
    totalAfterDiscount: number;
    activeCoupon: string | undefined;
    orderedBy: string;
    createdAt: string;
    updatedAt: string;
}
