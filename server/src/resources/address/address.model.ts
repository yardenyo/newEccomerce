import Address from '@/resources/address/address.interface';
import { Schema, model } from 'mongoose';

const AddressSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
            required: true,
        },
        isDefault: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const AddressModel = model<Address>('Address', AddressSchema);

export default AddressModel;
