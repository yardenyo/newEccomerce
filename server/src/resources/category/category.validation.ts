import Joi from 'joi';

const createCategory = Joi.object({
    name: Joi.string().required().min(3).max(30).trim().lowercase(),
});

const updateCategory = Joi.object({
    name: Joi.string().required().min(3).max(30).trim().lowercase(),
});

export default { createCategory, updateCategory };
