import { Schema, model } from 'mongoose';
import Setting from '@/resources/setting/setting.interface';

const SettingSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        settings: {
            darkMode: {
                type: Boolean,
                required: true,
                default: false,
            },
            emailNotifications: {
                type: Boolean,
                required: true,
                default: false,
            },
            pushNotifications: {
                type: Boolean,
                required: true,
                default: false,
            },
        },
    },
    { timestamps: true },
);

const SettingModel = model<Setting>('Setting', SettingSchema);

export default SettingModel;
