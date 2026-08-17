const Joi = require('joi');

/**
 * Agent Partner Analytics has ~29 endpoints across 5 sub-areas (search-clients, adoption,
 * overview, tag-trends, feedback), each backed by its own controller-level Joi validator in
 * agentic-suite-analytics that wasn't individually read field-by-field during this pass (see
 * plan open question #2/#4). Rather than guess at 29 bespoke schemas, this is one shared,
 * deliberately permissive schema (common filter/pagination shape, unknown keys allowed) so the
 * SDK doesn't reject fields the real backend accepts. Tighten per-method once each endpoint's
 * exact body shape is confirmed against the real controllers.
 */
const agentPartnerRequestValidation = Joi.object().keys({
  filters: Joi.object().unknown(true).optional(),
  startDate: Joi.string().trim().optional(),
  endDate: Joi.string().trim().optional(),
  searchClientIds: Joi.array().items(Joi.string().trim()).optional(),
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  sortBy: Joi.string().trim().optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional()
}).unknown(true);

module.exports = {
  agentPartnerRequestValidation
};
