const Joi = require('joi');

const REQUIRED_DATA_VALUES = ['tiles', 'caseQaTrends', 'slaTrends', 'agentScoreTrends'];

const filtersSchema = Joi.object().keys({
  from: Joi.string().trim().required(),
  to: Joi.string().trim().required(),
  teamIds: Joi.array().items(Joi.string().trim()).optional(),
  agentIds: Joi.array().items(Joi.string().trim()).optional(),
  accountIds: Joi.array().items(Joi.string().trim()).optional(),
  aiAgentIds: Joi.array().items(Joi.string().trim()).optional(),
  managerEmails: Joi.array().items(Joi.string().trim().max(255)).optional()
});

const getCaseQaFiltersValidation = Joi.object().keys({
  aiAgentUid: Joi.string().trim().optional(),
  teamId: Joi.string().trim().optional(),
  managerEmail: Joi.string().trim().max(255).optional()
});

const getCaseQaMetricsValidation = Joi.object().keys({
  filters: filtersSchema.required(),
  requiredData: Joi.array().items(Joi.string().valid(...REQUIRED_DATA_VALUES)).min(1).unique().optional()
});

const getCaseQaCaseDetailsValidation = Joi.object().keys({
  filters: filtersSchema.required(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  search: Joi.string().trim().min(1).max(255).optional(),
  searchColumns: Joi.array().items(
    Joi.string().valid('case_number', 'subject', 'account_name', 'agent_name')
  ).min(1).optional(),
  sortBy: Joi.string().valid('createdDate', 'closedDate', 'caseQualityScore').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional()
});

const getCaseQaDetailValidation = Joi.object().keys({
  caseId: Joi.string().trim().required(),
  uid: Joi.string().uuid().required(),
  analyticsId: Joi.string().uuid().required()
});

const getCqaInsightsValidation = Joi.object().keys({});

const getAgentScoreCardMetricsValidation = getCaseQaMetricsValidation;

const getMyScoreCardValidation = Joi.object().keys({
  userEmail: Joi.string().trim().required(),
  tenantId: Joi.string().trim().required(),
  uid: Joi.string().trim().required()
});

const getMyScoreCardDetailsValidation = Joi.object().keys({
  userEmail: Joi.string().trim().required(),
  tenantId: Joi.string().trim().required(),
  uid: Joi.string().trim().required(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).max(100).optional(),
  caseId: Joi.string().trim().optional()
});

module.exports = {
  getCaseQaFiltersValidation,
  getCaseQaMetricsValidation,
  getCaseQaCaseDetailsValidation,
  getCaseQaDetailValidation,
  getCqaInsightsValidation,
  getAgentScoreCardMetricsValidation,
  getMyScoreCardValidation,
  getMyScoreCardDetailsValidation
};
