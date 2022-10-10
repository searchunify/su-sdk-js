const Joi = require('joi');

const contentSourceIdValidation = (options) => {
    const schema = Joi.object().keys({
        contentSourceId: Joi.string().trim().required()
    });
    const result = schema.validate(options);
    return result;
}

const objectSpecificDataValidation = (options) => {
    const schema = Joi.object().keys({
        contentSourceId: Joi.string().trim().required(),
        objectId: Joi.string().trim().required(),
        startFrom: Joi.number(),
        size: Joi.number().min(1).max(50)
    });
    const result = schema.validate(options);
    return result;
}

const objectSpecificDataWithIdValidation = (options) => {
    const schema = Joi.object().keys({
        contentSourceId: Joi.string().trim().required(),
        objectId: Joi.string().trim().required(),
        documentId: Joi.string().trim().required()
    });
    const result = schema.validate(options);
    return result;
}


const updateDoucmentByIdValidation = (options) => {
    const schema = Joi.object().keys({
        contentSourceId: Joi.string().trim().required(),
        objectId: Joi.string().trim().required(),
        documentId: Joi.string().trim().required(),
        data: Joi.object().min(1).required()
    });
    const result = schema.validate(options);
    return result;
}

const uploadDataValidation = (options) => {
    const schema = Joi.object().keys({
        contentSourceId: Joi.string().trim().required(),
        objectId: Joi.string().trim().required(),
        data: Joi.array().min(1).required()
    });
    const result = schema.validate(options);
    return result;
}

module.exports = {
    contentSourceIdValidation,
    objectSpecificDataValidation,
    objectSpecificDataWithIdValidation,
    updateDoucmentByIdValidation,
    uploadDataValidation
}