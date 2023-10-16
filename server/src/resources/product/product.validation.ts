import Joi from 'joi';

const createProduct = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    quantity: Joi.number().required(),
    sold: Joi.number().required(),
    images: Joi.array().required(),
    color: Joi.string().required(),
    ratings: Joi.array().required(),
});

const updateProduct = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    quantity: Joi.number().required(),
    sold: Joi.number().required(),
    images: Joi.array().required(),
    color: Joi.string().required(),
    ratings: Joi.array().required(),
});

export default { createProduct, updateProduct };
