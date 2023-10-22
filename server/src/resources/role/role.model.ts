import Role from '@/resources/role/role.interface';
import Roles from '@/utils/enums/roles.enums';
import { Schema, model } from 'mongoose';

const RoleSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            default: 'user',
            enum: Roles,
        },
    },
    {
        timestamps: true,
    },
);

export default model<Role>('Role', RoleSchema);
