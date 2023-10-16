//validateDBId.ts
import mongoose from 'mongoose';

export default async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
};
