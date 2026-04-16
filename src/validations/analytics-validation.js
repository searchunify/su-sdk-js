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
  tenantId: Joi.string().uuid().trim().optional(),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  /** Ignored by overview POST bodies; allowed for callers (e.g. MCP) that share the same schema. */
  count: Joi.number().min(1).max(500).optional(),
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
  pageNumber: Joi.number().min(1).optional(),
  sortByField: Joi.string().valid('count').optional(),
  sortType: Joi.string().valid('asc', 'desc').optional(),
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

/** Same as overview POST validation (getAverageClickPosition uses similarValidation). Kept for backward compatibility. */
const averageClickPositionValidation = similarValidation;

const sessionDetailsValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().uuid().trim().required(),
  count: Joi.number().min(1).optional(),
  sessionId: Joi.string().trim().optional(),
  startIndex: Joi.number().min(1).optional(),
  sortByField: Joi.string()
    .valid('search', 'click', 'support', 'case', 'page_view', 'end_date', 'start_date')
    .optional(),
  sortType: Joi.string().valid('asc', 'desc').optional(),
});

const sessionListTableValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().uuid().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  sessionId: Joi.string().trim().optional(),
  startIndex: Joi.number().min(1).optional(),
  sortByField: Joi.string()
    .valid('search', 'click', 'support', 'case', 'page_view', 'end_date', 'start_date')
    .optional(),
  sortType: Joi.string().valid('asc', 'desc').optional(),
});

const searchSessionBySSIdValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  sessionId: Joi.string().trim(),
  searchClientId: Joi.string().uuid().trim().required(),
  pageNumber: Joi.number().min(1),
});

/** POST /conversion/caseDeflectionStage1 — same core fields as analytics session validators (from/to). */
const conversionCaseDeflectionStage1 = Joi.object({
  from: Joi.string().trim().required(),
  to: Joi.string().trim().required(),
  tenantId: Joi.string().uuid().trim().required(),
  uid: Joi.alternatives().try(Joi.string().valid('all'), Joi.string().uuid().trim()).optional(),
  ecoId: Joi.string().uuid().trim().optional().allow(null, ''),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  emailTracking: Joi.boolean().optional(),
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsFilters: Joi.alternatives().try(Joi.string().trim(), Joi.array().items(Joi.string().trim())).optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional()
}).custom((value, helpers) => {
  const hasUid =
    value.uid !== undefined && value.uid !== null && value.uid !== '';
  const hasEco =
    value.ecoId !== undefined &&
    value.ecoId !== null &&
    String(value.ecoId).trim() !== '';
  if (hasUid && hasEco) {
    return helpers.error('any.invalid');
  }
  return value;
});

/** POST /conversion/current-relevance-index and relevance-index drill-down. */
const conversionRelevanceIndex = Joi.object({
  tenantId: Joi.string().uuid().trim().required(),
  uid: Joi.string().uuid().trim().required(),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  from: Joi.string().trim().optional().allow(null, ''),
  to: Joi.string().trim().optional().allow(null, '')
});

/** POST /leadership/unassisted-self-solve-volume and assisted-self-solve-volume. */
const leadershipSelfSolveVolume = Joi.object({
  tenantId: Joi.string().uuid().trim().required(),
  uid: Joi.string().uuid().trim().optional(),
  ecoId: Joi.string().uuid().trim().optional(),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  from: Joi.string().trim().optional().allow(null, ''),
  to: Joi.string().trim().optional().allow(null, ''),
  directlyViewSetting: Joi.boolean().optional()
}).custom((value, helpers) => {
  const hasUid = value.uid && typeof value.uid === 'string' && value.uid.length > 0;
  const hasEco =
    value.ecoId && typeof value.ecoId === 'string' && value.ecoId.length > 0;
  if (hasUid && hasEco) {
    return helpers.error('any.invalid');
  }
  if (!hasUid && !hasEco) {
    return helpers.error('any.invalid');
  }
  return value;
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
  searchSessionBySSIdValidation,
  averageClickPositionValidation,
  sessionDetailsValidation,
  sessionListTableValidation,
  conversionCaseDeflectionStage1,
  conversionRelevanceIndex,
  leadershipSelfSolveVolume
};
