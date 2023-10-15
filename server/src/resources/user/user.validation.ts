import Joi from 'joi';

const updateUser = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    mobile: Joi.string(),
});

export default { updateUser };
