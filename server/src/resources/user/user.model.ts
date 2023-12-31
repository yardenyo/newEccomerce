import User from '@/resources/user/user.interface';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Schema, model } from 'mongoose';

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
                ref: 'Cart',
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
        userSettings: {
            type: Schema.Types.ObjectId,
            ref: 'Setting',
        },
        passwordChangedAt: Date,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true,
    },
);

UserSchema.pre<User>('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error: any) {
        next(error);
    }
});

UserSchema.methods.createPasswordResetToken =
    async function (): Promise<string> {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
        return resetToken;
    };

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
