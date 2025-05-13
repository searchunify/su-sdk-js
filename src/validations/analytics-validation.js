const Joi = require('joi');
const { ANALYTICS_INTERNAL_USERS } = require('../utils/constants');

const userMetricsValidation = {
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsFilters: Joi.alternatives().try(
    Joi.string().trim(),
    Joi.array().items(Joi.string().trim())
  ).optional(),
  userMetricsLimit: Joi.when('userMetricsFlag', {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  userMetricsOffset: Joi.when('userMetricsFlag', {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
};

const similarValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().uuid().trim(),
  ecoSystemId: Joi.string().trim().optional(),
  emailTracking: Joi.boolean().optional(),
  conversionType: Joi.string().optional(),
  ...userMetricsValidation
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const similarValidationWithCount = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  searchClientId: Joi.string().uuid().trim(),
  ecoSystemId: Joi.string().trim().optional(),
  ...userMetricsValidation,
  pageNumber: Joi.number().optional(),
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const searchSessionByCaseUidValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().required(),
  caseUid: Joi.string().uuid().trim().required(),
  ecoSystemId: Joi.string().trim().optional()
});

const searchConversionWithFilters = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().trim().optional(),
  ...userMetricsValidation,
});

const searchConversionBySessionId = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  searchClientId: Joi.string().uuid().trim(),
  sessionId: Joi.string().trim().required(),
});

const discussionsReadyToBecomeArticles = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  ...userMetricsValidation,
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const caseArticlesValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  searchType: Joi.string().trim().valid('all', 'global', 'support').required(),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  ...userMetricsValidation,
  ecoSystemId: Joi.string().trim().optional(),
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const attachedArticlesValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  ecoSystemId: Joi.string().trim().optional(),
  ...userMetricsValidation,
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const attachedOnCaseValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  url: Joi.string().uri().trim().required(),
  ...userMetricsValidation,
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const searchSessionBySSIdValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  sessionId: Joi.string().trim(),
  searchClientId: Joi.string().uuid().trim().required(),
  pageNumber: Joi.number().min(1),
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
