const Joi = require('joi');

const searchValidation = (options) => {
    const schema = Joi.object().keys({
        uid: Joi.string().uuid().trim().required(),
        searchString: Joi.string().trim().allow(null, '').required()
    }).unknown(true);
    const result = schema.validate(options);
    return result;
}

module.exports = {
    searchValidation
}