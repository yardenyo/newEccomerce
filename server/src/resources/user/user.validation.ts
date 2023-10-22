import Roles from '@/utils/enums/roles.enums';
import Joi from 'joi';

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
