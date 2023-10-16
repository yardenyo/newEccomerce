import Joi from 'joi';

const updateUser = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.string(),
});

const updateRole = Joi.object({
    role: Joi.string().valid('user', 'admin').required(),
});

export default { updateUser, updateRole };
