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
        offset: Joi.number(),
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
    const response = encodePathUri(result, {
        documentId: true // Boolean values: if encode needed.
    })
    return response;
}


const updateDoucmentByIdValidation = (options) => {
    const schema = Joi.object().keys({
        contentSourceId: Joi.string().trim().required(),
        objectId: Joi.string().trim().required(),
        documentId: Joi.string().trim().required(),
        data: Joi.object().min(1).required()
    });
    const result = schema.validate(options);
    const response = encodePathUri(result, {
        documentId: true
    })
    return response;
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

const encodePathUri = (result, encodeParams) => {
    Object.keys(encodeParams).forEach(items => {
        if (encodeParams[items] === true) {
            result.value[items] = encodeURIComponent(encodeURIComponent(result.value[items]))
        }
    });
    return result;
}

module.exports = {
    contentSourceIdValidation,
    objectSpecificDataValidation,
    objectSpecificDataWithIdValidation,
    updateDoucmentByIdValidation,
    uploadDataValidation
}