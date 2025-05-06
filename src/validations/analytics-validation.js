const Joi = require('joi');
const { ANALYTICS_INTERNAL_USERS } = require('../utils/constants');

const similarValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().uuid().trim(),
  ecoSystemId: Joi.string().trim().optional(),
  userMetricsFilters: Joi.string().trim().optional(),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  tenantId: Joi.string().trim().optional(),
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsLimit: Joi.number().optional()
    .when('userMetricsFlag', {
      is: Joi.exist(),
      then: Joi.required(),
    }),
  userMetricsOffset: Joi.number().optional(),
  emailTracking: Joi.boolean().optional(),
  conversionType: Joi.string().optional(),
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.xor': 'searchClientId and ecoSystemId cannot be used together',
});

const similarValidationWithCount = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  searchClientId: Joi.string().uuid().trim(),
  tenantId: Joi.string().trim().optional(),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  ecoSystemId: Joi.string().trim().optional(),
  userMetricsFilters: Joi.string().trim().optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional(),
  userMetricsFlag: Joi.boolean().optional(),
  pageNumber: Joi.number().optional(),
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
  userMetricsFilters: Joi.string().trim().optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional(),
  userMetricsFlag: Joi.boolean().optional(),
});

const searchConversionBySessionId = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  searchClientId: Joi.string().uuid().trim(),
  sessionId: Joi.string().trim().required(),
  tenantId: Joi.string().trim().optional(),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  userMetricsFilters: Joi.string().trim().optional(),
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional(),
});

const discussionsReadyToBecomeArticles = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  userMetricsFilters: Joi.string().trim().optional(),
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional(),
  tenantId: Joi.string().trim().optional(),
});

const caseArticlesValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  searchType: Joi.string().trim().valid('all', 'global', 'support').required(),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  userMetricsFilters: Joi.string().trim().optional(),
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional(),
  tenantId: Joi.string().trim().optional(),
  ecoSystemId: Joi.string().trim().optional(),
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
  userMetricsFilters: Joi.string().trim().optional(),
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional(),
});

const attachedOnCaseValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  internalUser: Joi.string().trim().optional().valid(...Object.values(ANALYTICS_INTERNAL_USERS)),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  url: Joi.string().uri().trim().required(),
  userMetricsFilters: Joi.string().trim().optional(),
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional()
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
