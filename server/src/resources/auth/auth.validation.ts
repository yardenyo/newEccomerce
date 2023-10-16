import Joi from 'joi';

const signup = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
    password: Joi.string()
        .required()
        .min(8)
        .max(32)
        .pattern(
            new RegExp(
                '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,32}$',
            ),
        ),
});

const signin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export default { signup, signin };
