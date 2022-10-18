const Joi = require('joi');
const { AUTHENTICATION } = require("../../utils/constants")

exports.initilize = (options) => {
    const schema = Joi.object().keys({
        instance: Joi.string().uri().trim().required(),
        timeout: Joi.number().min(30000).max(180000)
    });
    
    // Removing trailing slash.
    options.instance = options.instance.replace(/\/$/, "");
    const result = schema.validate(options);
    return result;
}

exports.validateClient = () => {
    // Validate client for an instance.
    const schema = Joi.object().keys({
        INSTANCE_URL: Joi.string().uri().trim().required().error(new Error(`Client not initilized. Verify the instance url.`)),
        AUTH_TYPE: Joi.string().trim().valid('oauth2', 'apiKey', 'jwt').required().error(new Error(`Invalid authentication token.`)),
    }).unknown(true);

    const isValid = schema.validate(AUTHENTICATION);
    if (isValid.error) throw new Error(isValid.error.message);

    if (AUTHENTICATION.AUTH_TYPE === 'oauth2') {
        const oauth2 = AUTHENTICATION.OAUTH2;
        const schema = Joi.object().keys({
            ACCESS_TOKEN: Joi.string().trim().required().error(new Error(`Invalid access token.`)),
            REFRESH_TOKEN: Joi.string().trim().required().error(new Error(`Invalid refresh token.`)),
        }).unknown(true);
        const isValid = schema.validate(oauth2);
        if (isValid.error) throw new Error(isValid.error.message);
    }

    if (AUTHENTICATION.AUTH_TYPE === 'apiKey') {
        const apiKey = AUTHENTICATION.API_KEY;
        const schema = Joi.object().keys({
            API_KEY_TOKEN: Joi.string().trim().required().error(new Error(`Invalid api key token.`)),
        })
        const isValid = schema.validate(apiKey);
        if (isValid.error) throw new Error(isValid.error.message);
    }

    if (AUTHENTICATION.AUTH_TYPE === 'jwt') {
        const jwt = AUTHENTICATION.JWT;
        const schema = Joi.object().keys({
            JWT_TOKEN: Joi.string().trim().required().error(new Error(`Invalid jwt token.`))
        })
        const isValid = schema.validate(jwt);
        if (isValid.error) throw new Error(isValid.error.message);
    }

}

exports.validateOauthClient = () => {
    const schema = Joi.object().keys({
        INSTANCE_URL: Joi.string().uri().trim().required().error(new Error(`Client not initilized. Verify the instance url.`)),
    }).unknown(true);

    const isValid = schema.validate(AUTHENTICATION);
    if (isValid.error) throw new Error(isValid.error.message);
}