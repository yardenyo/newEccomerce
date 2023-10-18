import Joi from 'joi';

const createProduct = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    // category: Joi.string().required(),
    // brand: Joi.string().required(),
    quantity: Joi.number().required(),
    sold: Joi.number(),
    images: Joi.array().required(),
    color: Joi.string().required(),
    // ratings: Joi.array().required(),
});

const updateProduct = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    // category: Joi.string(),
    // brand: Joi.string(),
    quantity: Joi.number(),
    sold: Joi.number(),
    images: Joi.array(),
    color: Joi.string(),
    // ratings: Joi.array(),
});

export default { createProduct, updateProduct };
