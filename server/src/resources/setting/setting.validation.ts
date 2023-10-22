import Joi from 'joi';

const createSetting = Joi.object({
    darkMode: Joi.boolean().default(false),
    emailNotifications: Joi.boolean().default(true),
    pushNotifications: Joi.boolean().default(true),
});

const updateSetting = Joi.object({
    darkMode: Joi.boolean(),
    emailNotifications: Joi.boolean(),
    pushNotifications: Joi.boolean(),
});

export default { createSetting, updateSetting };
