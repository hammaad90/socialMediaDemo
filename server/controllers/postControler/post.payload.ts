const Joi = require('joi');

export const postpayload = Joi.object().keys({
    post: Joi.string().required(),
});

export const commentpayload = Joi.object().keys({
    comment: Joi.string().required(),
});

export const updatePostpayload = Joi.object().keys({
    post: Joi.string().allow('').default('')
});
// export default {userpayload, loginpayload}