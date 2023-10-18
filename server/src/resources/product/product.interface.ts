import { Document } from 'mongoose';

export default interface Product extends Document {
    title: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    quantity: number;
    sold: number;
    images: string[];
    color: string;
    ratings: {
        star: number;
        postedBy: string;
    }[];
}
