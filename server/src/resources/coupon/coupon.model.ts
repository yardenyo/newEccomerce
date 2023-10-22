import { Schema, model } from 'mongoose';
import voucher_codes from 'voucher-code-generator';

const CouponSchema = new Schema(
    {
        code: {
            type: String,
            uppercase: true,
            unique: true,
        },
        discount: {
            type: Number,
            required: true,
        },
        expireAfterDays: {
            type: Number,
            default: 10,
        },
        expiresAt: {
            type: Date,
        },
    },
    { timestamps: true },
);

const generateCouponCode = function () {
    const code = voucher_codes.generate({
        length: 6,
        count: 1,
    });

    return code[0];
};

const getExpiresAt = function (days: number = 10) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
};

CouponSchema.pre('save', function (next) {
    try {
        this.code = generateCouponCode();
        const days = this.expireAfterDays;
        this.expiresAt = getExpiresAt(days);
        return next();
    } catch (err: any) {
        return next(err);
    }
});

const CouponModel = model('Coupon', CouponSchema);

export default CouponModel;
