import Joi from 'joi';

const createProduct = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    quantity: Joi.number().required(),
    sold: Joi.number(),
    images: Joi.array().required(),
    color: Joi.string().required(),
    ratings: Joi.array().default([]).forbidden(),
});

const updateProduct = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    category: Joi.string(),
    brand: Joi.string(),
    quantity: Joi.number(),
    sold: Joi.number(),
    images: Joi.array(),
    color: Joi.string(),
    ratings: Joi.array(),
});

const addProductToWishlist = Joi.object({
    productId: Joi.string().required(),
});

const removeProductFromWishlist = Joi.object({
    productId: Joi.string().required(),
});

const addProductToCart = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().default(1),
});

const removeProductFromCart = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().default(1),
});

const addProductRating = Joi.object({
    productId: Joi.string().required(),
    comment: Joi.string(),
    star: Joi.number().default(5).min(1).max(5),
});

export default {
    createProduct,
    updateProduct,
    addProductToWishlist,
    removeProductFromWishlist,
    addProductToCart,
    removeProductFromCart,
    addProductRating,
};
