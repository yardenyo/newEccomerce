import Joi from 'joi';

const createBrand = Joi.object({
    name: Joi.string().required().min(3).max(30).trim().lowercase(),
});

const updateBrand = Joi.object({
    name: Joi.string().required().min(3).max(30).trim().lowercase(),
});

export default { createBrand, updateBrand };
