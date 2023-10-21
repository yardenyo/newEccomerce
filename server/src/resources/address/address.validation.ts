import Joi from 'joi';

const createAddress = Joi.object({
    user: Joi.string(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    pincode: Joi.string().required(),
    isDefault: Joi.boolean().required(),
});

const updateAddress = Joi.object({
    user: Joi.string().forbidden(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    country: Joi.string(),
    pincode: Joi.string(),
    isDefault: Joi.boolean(),
});

export default { createAddress, updateAddress };
