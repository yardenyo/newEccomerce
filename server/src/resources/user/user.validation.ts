import Joi from 'joi';
import Roles from '@/utils/enums/roles.enums';

const updateUser = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.string(),
});

const updateRole = Joi.object({
    role: Joi.string()
        .valid(...Object.values(Roles))
        .required(),
});

export default { updateUser, updateRole };
