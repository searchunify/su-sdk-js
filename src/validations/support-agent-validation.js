const Joi = require('joi');

const commonParams = {
  startDate: Joi.string().trim().optional(),
  endDate: Joi.string().trim().optional(),
  datePreset: Joi.string().valid(
    'today', 'yesterday', 'last7days', 'last30days', 'thisMonth', 'lastMonth'
  ).optional(),
  granularity: Joi.string().valid('day', 'week', 'month', 'daily', 'weekly', 'monthly').optional(),
  agentIds: Joi.alternatives().try(
    Joi.string().trim(),
    Joi.array().items(Joi.string().trim())
  ).optional()
};

const getAgentsValidation = Joi.object().keys({});

const getKpisValidation = Joi.object().keys({ ...commonParams });

const getTrendsValidation = Joi.object().keys({ ...commonParams });

const getOutcomeDistributionValidation = Joi.object().keys({ ...commonParams });

const getSankeyValidation = Joi.object().keys({ ...commonParams });

const OUTCOME_VALUES = [
  'deflected', 'non_deflected', 'live_agent', 'case_created', 'negative_feedback', 'unsuccessful'
];

const getSessionsValidation = Joi.object().keys({
  ...commonParams,
  outcome: Joi.string().valid(...OUTCOME_VALUES).optional(),
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional(),
  sortBy: Joi.string().valid('timestamp', 'duration', 'outcome').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional(),
  search: Joi.string().trim().optional()
});

const getSessionTranscriptValidation = Joi.object().keys({
  sessionId: Joi.string().trim().required()
});

module.exports = {
  getAgentsValidation,
  getKpisValidation,
  getTrendsValidation,
  getOutcomeDistributionValidation,
  getSankeyValidation,
  getSessionsValidation,
  getSessionTranscriptValidation
};
