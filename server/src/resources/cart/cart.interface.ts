import { Document } from 'mongoose';
import Product from '@/resources/product/product.interface';

export default interface Cart extends Document {
    _id: string;
    products: Product[];
    cartTotal: number;
    totalAfterDiscount: number;
    orderedBy: string;
    createdAt: string;
    updatedAt: string;
}
