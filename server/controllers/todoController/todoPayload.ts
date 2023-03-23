const Joi = require('joi');

export const todopayload = Joi.object().keys({
    todo: Joi.string().required(),
});

export const updateTodopayload = Joi.object().keys({
    todo: Joi.string().allow('').default(''),
    status: Joi.string(),
});
// export default {userpayload, loginpayload}