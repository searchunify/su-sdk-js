const Joi = require('joi');

const similarValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().uuid().trim()
});

const similarValidationWithCount = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  searchClientId: Joi.string().uuid().trim()
});

const searchSessionByCaseUidValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().required(),
  caseUid: Joi.string().uuid().trim().required()
});

const searchConversionWithFilters = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required()
});

const searchConversionBySessionId = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  searchClientId: Joi.string().uuid().trim(),
  sessionId: Joi.string().trim().required()
});

const discussionsReadyToBecomeArticles = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  internalUser: Joi.string().trim().valid('all', 'true', 'false')
});

const caseArticlesValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  internalUser: Joi.string().trim().valid('all', 'true', 'false'),
  searchType: Joi.string().trim().valid('all', 'global', 'support').required(),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1)
});

const attachedArticlesValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  internalUser: Joi.string().trim().valid('all', 'true', 'false'),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1)
});

const attachedOnCaseValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  internalUser: Joi.string().trim().valid('all', 'true', 'false').required(),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  url: Joi.string().uri().trim().required()
});

const searchSessionBySSIdValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  sessionId: Joi.string().trim(),
  searchClientId: Joi.string().uuid().trim().required(),
  pageNumber: Joi.number().min(1)
});

module.exports = {
  similarValidation,
  similarValidationWithCount,
  searchSessionByCaseUidValidation,
  searchConversionWithFilters,
  searchConversionBySessionId,
  discussionsReadyToBecomeArticles,
  caseArticlesValidation,
  attachedArticlesValidation,
  attachedOnCaseValidation,
  searchSessionBySSIdValidation
};
