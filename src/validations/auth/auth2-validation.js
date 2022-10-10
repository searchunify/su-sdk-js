const Joi = require('joi');

exports.accessTokenValidation = (options) => {
    const schema = Joi.object().keys({
        clientId: Joi.string().trim().required(),
        clientSecret: Joi.string().trim().required(),
        username: Joi.string().trim().required(),
        password: Joi.string().trim().required()
    });
    const result = schema.validate(options);
    return result;
}

exports.refreshTokenValidation = (options) => {
    const schema = Joi.object().keys({
        clientId: Joi.string().trim().required(),
        clientSecret: Joi.string().trim().required(),
        refreshToken: Joi.string().trim().required()
    });
    const result = schema.validate(options);
    return result;
}