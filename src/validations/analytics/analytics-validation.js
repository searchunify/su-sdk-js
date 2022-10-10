const Joi = require('joi');

const similarValidation = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required(),
        searchClientId: Joi.string().uuid().trim()
    });
    const result = schema.validate(options);
    return result;
}

const similarValidationWithCount = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required(),
        count: Joi.number().min(1).max(500).required(),
        searchClientId: Joi.string().uuid().trim()
    });
    const result = schema.validate(options);
    return result;
}

const searchSessionByCaseUidValidation = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required(),
        count: Joi.number().required(),
        caseUid: Joi.string().uuid().trim().required()
    });
    const result = schema.validate(options);
    return result;
}

const searchConversionWithFiltersValidation = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required()
    });
    const result = schema.validate(options);
    return result;
}

const searchConversionBySessionIdValidation = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required(),
        count: Joi.number().min(1).max(500).required(),
        searchClientId: Joi.string().uuid().trim(),
        sessionId: Joi.string().trim().required()
    });
    const result = schema.validate(options);
    return result;
}

const discussionsReadyToBecomeArticlesValidation = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required(),
        count: Joi.number().min(1).max(500).required(),
        internalUser: Joi.string().trim().valid('all', 'true', 'false')
    });
    const result = schema.validate(options);
    return result;
}

const caseArticlesValidation = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required(),
        count: Joi.number().min(1).max(500),
        internalUser: Joi.string().trim().valid('all', 'true', 'false'),
        searchType: Joi.string().trim().valid('all', 'global', 'support').required(),
        searchClientId: Joi.string().uuid().trim().required(),
        offset: Joi.number().min(1),
    });
    const result = schema.validate(options);
    return result;
}

const attachedArticlesValidation = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required(),
        count: Joi.number().min(1).max(500),
        internalUser: Joi.string().trim().valid('all', 'true', 'false'),
        searchClientId: Joi.string().uuid().trim().required(),
        offset: Joi.number().min(1),
    });
    const result = schema.validate(options);
    return result;
}

const attachedOnCaseValidation = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required(),
        count: Joi.number().min(1).max(500),
        internalUser: Joi.string().trim().valid('all', 'true', 'false').required(),
        searchClientId: Joi.string().uuid().trim().required(),
        offset: Joi.number().min(1),
        url: Joi.string().uri().trim().required()
    });
    const result = schema.validate(options);
    return result;
}

const searchSessionBySearchSessionIdValidation = (options) => {
    const schema = Joi.object().keys({
        startDate: Joi.string().trim().required(),
        endDate: Joi.string().trim().required(),
        count: Joi.number().min(1).max(500),
        sessionId: Joi.string().trim(),
        searchClientId: Joi.string().uuid().trim().required(),
        pageNumber: Joi.number().min(1)
    });
    const result = schema.validate(options);
    return result;
}

module.exports = {
    similarValidation,
    similarValidationWithCount,
    searchSessionByCaseUidValidation,
    searchConversionWithFiltersValidation,
    searchConversionBySessionIdValidation,
    discussionsReadyToBecomeArticlesValidation,
    caseArticlesValidation,
    attachedArticlesValidation,
    attachedOnCaseValidation,
    searchSessionBySearchSessionIdValidation
}