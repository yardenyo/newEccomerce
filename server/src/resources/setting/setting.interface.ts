import { Document } from 'mongoose';

export default interface UserSettings extends Document {
    userId: string;
    settings: {
        darkMode: boolean;
        emailNotifications: boolean;
        pushNotifications: boolean;
    };
}
