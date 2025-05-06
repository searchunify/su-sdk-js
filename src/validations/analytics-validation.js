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
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  tenantId: Joi.string().trim().optional(),
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
  tenantId: Joi.string().trim().optional(),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
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
  tenantId: Joi.string().trim().optional(),
  ecoSystemId: Joi.string().trim().optional()
});

const searchConversionWithFilters = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().trim().optional(),
  tenantId: Joi.string().trim().optional(),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  ...userMetricsValidation,
});

const searchConversionBySessionId = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  searchClientId: Joi.string().uuid().trim(),
  sessionId: Joi.string().trim().required(),
  tenantId: Joi.string().trim().optional(),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS))
});

const discussionsReadyToBecomeArticles = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  ...userMetricsValidation,
  tenantId: Joi.string().trim().optional(),
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const caseArticlesValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  searchType: Joi.string().trim().valid('all', 'global', 'support').required(),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  ...userMetricsValidation,
  tenantId: Joi.string().trim().optional(),
  ecoSystemId: Joi.string().trim().optional(),
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const attachedArticlesValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  ecoSystemId: Joi.string().trim().optional(),
  tenantId: Joi.string().trim().optional(),
  ...userMetricsValidation,
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const attachedOnCaseValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  url: Joi.string().uri().trim().required(),
  ...userMetricsValidation,
  tenantId: Joi.string().trim().optional(),
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
  tenantId: Joi.string().trim().optional(),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
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
