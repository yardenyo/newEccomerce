import { Document } from 'mongoose';
import User from '@/resources/user/user.interface';

export default interface Blog extends Document {
    title: string;
    description: string;
    category: string;
    views: number;
    isLiked: boolean;
    isDisliked: boolean;
    likes: User[];
    dislikes: User[];
    image: string;
    author: User;
}
