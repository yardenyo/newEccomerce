import Joi from 'joi';

const createCoupon = Joi.object({
    discount: Joi.number().required(),
    expireAfterDays: Joi.number(),
});

const updateCoupon = Joi.object({
    discount: Joi.number().required(),
    expireAfterDays: Joi.number().forbidden(),
});

export default { createCoupon, updateCoupon };
