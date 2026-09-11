const Joi = require('joi');

const getLlmUsageDashboardValidation = Joi.object().keys({
  range: Joi.string().trim().optional(),
  startDate: Joi.string().trim().optional(),
  endDate: Joi.string().trim().optional(),
  days: Joi.number().integer().min(1).max(365).optional(),
  model: Joi.string().trim().optional(),
  provider: Joi.string().trim().optional(),
  agentName: Joi.string().trim().optional(),
  metric: Joi.string().trim().optional()
});

module.exports = {
  getLlmUsageDashboardValidation
};
