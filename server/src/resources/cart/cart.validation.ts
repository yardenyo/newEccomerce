import Joi from 'joi';

const addToCart = Joi.object({
    products: Joi.array()
        .items(
            Joi.object({
                productId: Joi.string().required(),
                quantity: Joi.number().required(),
                color: Joi.string().required(),
            }),
        )
        .required(),
});

const removeFromCart = Joi.object({
    products: Joi.array()
        .items(
            Joi.object({
                productId: Joi.string().required(),
                quantity: Joi.number().required(),
                color: Joi.string().required(),
            }),
        )
        .required(),
});

const applyCoupon = Joi.object({
    coupon: Joi.string().required(),
});

const removeCoupon = Joi.object({
    coupon: Joi.string().required(),
});

export default { addToCart, removeFromCart, applyCoupon, removeCoupon };
