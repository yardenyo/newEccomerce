import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import User from '@/resources/user/user.interface';

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Schema.Types.ObjectId,
            ref: 'Role',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        cart: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
        address: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Address',
            },
        ],
        wishlist: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        ],
    },
    {
        timestamps: true,
    },
);

UserSchema.pre<User>('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error: any) {
        next(error);
    }
});

UserSchema.methods.isValidPassword = async function (
    password: string,
): Promise<boolean> {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error: any) {
        throw new Error(error);
    }
};

export default model<User>('User', UserSchema);
