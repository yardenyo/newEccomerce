import Joi from 'joi';

const createBlogCategory = Joi.object({
    name: Joi.string().required().min(3).max(30).trim().lowercase(),
});

const updateBlogCategory = Joi.object({
    name: Joi.string().required().min(3).max(30).trim().lowercase(),
});

export default { createBlogCategory, updateBlogCategory };
