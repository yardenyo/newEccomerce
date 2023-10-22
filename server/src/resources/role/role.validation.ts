import Roles from '@/utils/enums/roles.enums';
import Joi from 'joi';

const createRole = Joi.object({
    name: Joi.string()
        .required()
        .default('user')
        .valid(...Object.values(Roles)),
});

const updateRole = Joi.object({
    name: Joi.string()
        .required()
        .valid(...Object.values(Roles)),
});

export default { createRole, updateRole };
