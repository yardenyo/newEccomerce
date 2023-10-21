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

export default { addToCart };
