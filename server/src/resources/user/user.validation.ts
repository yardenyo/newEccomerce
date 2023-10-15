import Joi from 'joi';

const create = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('user', 'admin').default('user'),
});

export default { create };
