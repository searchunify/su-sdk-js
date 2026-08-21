const Joi = require('joi');

/**
 * Agent Partner Analytics has 29 endpoints across 5 sub-areas (search-clients, adoption,
 * overview, tag-trends, feedback). Field sets below are read directly from each endpoint's
 * real controller in agentic-suite-analytics (src/controllers/agent-partner/agent-partner.js)
 * and its route wiring (src/routes/agent-partner/index.js), not guessed - `uid` is optional
 * everywhere the service layer branches on `Boolean(uid)` rather than requiring it. Each schema
 * uses `.unknown(false)` (the Joi default) so a typo'd field name is now rejected client-side
 * instead of silently passing through to the backend.
 */

const uid = Joi.string().trim().optional();
const indexName = Joi.string().trim().optional();
const from = Joi.string().trim().optional();
const to = Joi.string().trim().optional();
const filter = Joi.string().valid('monthly', 'quarterly').optional();
const scName = Joi.string().trim().optional();

const emailRecipients = Joi.array().items(Joi.string().email()).min(1).max(5);

/** makeExportHandler in the controller requires delivery to be 'email'/'download' and, for 'email', 1-5 valid recipient addresses. */
const strictExportFields = {
  delivery: Joi.string().valid('email', 'download').required(),
  recipients: Joi.when('delivery', {
    is: 'email',
    then: emailRecipients.required(),
    otherwise: Joi.array().items(Joi.string().email()).optional()
  }),
  scName,
  filter
};

/** exportAgentEngagementReport/exportFeedbackReport don't validate `delivery` itself, only recipients when delivery === 'email'. */
const looseExportFields = {
  delivery: Joi.string().trim().optional(),
  recipients: Joi.when('delivery', {
    is: 'email',
    then: emailRecipients.required(),
    otherwise: Joi.array().items(Joi.string().email()).optional()
  }),
  scName
};

const paginationSchema = Joi.object({
  enabled: Joi.boolean().optional(),
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional()
}).optional();

const searchClientsValidation = Joi.object({});

const adoptionContentSourcesValidation = Joi.object({ uid });

const overviewTileDataValidation = Joi.object({ uid, indexName, from, to });

const overviewAgentEngagementValidation = Joi.object({ uid, indexName, from, to });

const overviewAgentEngagementExportValidation = Joi.object({
  uid,
  indexName,
  from,
  to,
  publicBaseUrl: Joi.string().trim().optional(),
  ...looseExportFields
});

const overviewMttrReportValidation = Joi.object({
  uid,
  indexName,
  from,
  to,
  granularity: Joi.string().trim().optional()
});

const overviewMttrReportExportValidation = Joi.object({ uid, indexName, from, to, ...strictExportFields });

const overviewAgentWiseReportValidation = Joi.object({
  uid,
  indexName,
  from,
  to,
  featureCategory: Joi.string().trim().optional(),
  pageNumber: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).optional()
});

const overviewAgentWiseReportExportValidation = Joi.object({
  uid,
  indexName,
  from,
  to,
  featureCategory: Joi.string().trim().optional(),
  ...strictExportFields
});

const tagTrendsSpikeWatchlistValidation = Joi.object({
  uid,
  agents: Joi.array().items(Joi.string().trim()).optional(),
  products: Joi.array().items(Joi.string().trim()).optional(),
  from,
  to,
  spikeThreshold: Joi.number().optional(),
  pagination: paginationSchema
});

const tagTrendsSpikeWatchlistExportValidation = Joi.object({
  uid,
  agents: Joi.array().items(Joi.string().trim()).optional(),
  products: Joi.array().items(Joi.string().trim()).optional(),
  from,
  to,
  spikeThreshold: Joi.number().optional(),
  ...strictExportFields
});

const tagTrendsFrequencyValidation = Joi.object({
  uid,
  ahId: Joi.string().trim().optional(),
  agents: Joi.array().items(Joi.string().trim()).optional(),
  products: Joi.array().items(Joi.string().trim()).optional(),
  from,
  to,
  pagination: paginationSchema
});

const tagTrendsFrequencyExportValidation = Joi.object({
  uid,
  ahId: Joi.string().trim().optional(),
  agents: Joi.array().items(Joi.string().trim()).optional(),
  products: Joi.array().items(Joi.string().trim()).optional(),
  from,
  to,
  ...strictExportFields
});

const tagTrendsTopPairsValidation = Joi.object({
  uid,
  agents: Joi.array().items(Joi.string().trim()).optional(),
  products: Joi.array().items(Joi.string().trim()).optional(),
  from,
  to,
  topLimit: Joi.number().integer().min(1).optional()
});

const tagTrendsFilterValidation = Joi.object({ uid, from, to });

const adoptionReportValidation = Joi.object({ uid, indexName, filter });

const adoptionReportExportValidation = Joi.object({ uid, indexName, filter, ...strictExportFields });

const adoptionCaseEscalationValidation = Joi.object({ indexName, filter });

const adoptionCaseEscalationExportValidation = Joi.object({ indexName, filter, ...strictExportFields });

const feedbackResponseFeedbackValidation = Joi.object({
  uid,
  indexName,
  from,
  to,
  caseId: Joi.string().trim().optional(),
  featureTypes: Joi.array().items(Joi.string().trim()).optional(),
  limit: Joi.number().integer().min(1).optional(),
  offset: Joi.number().integer().min(0).optional(),
  sortingField: Joi.string().trim().optional(),
  sortType: Joi.string().valid('asc', 'desc').optional()
});

const feedbackResponseFeedbackDetailsValidation = Joi.object({
  uid,
  indexName,
  from,
  to,
  caseId: Joi.string().trim().optional(),
  featureTypes: Joi.array().items(Joi.string().trim()).optional()
});

const feedbackFeatureTypesValidation = Joi.object({});

const feedbackAgentNamesValidation = Joi.object({ caseId: Joi.string().trim().optional() });

const feedbackExportValidation = Joi.object({
  uid,
  from,
  to,
  caseId: Joi.string().trim().optional(),
  featureTypes: Joi.array().items(Joi.string().trim()).optional(),
  ...looseExportFields
});

module.exports = {
  searchClientsValidation,
  adoptionContentSourcesValidation,
  overviewTileDataValidation,
  overviewAgentEngagementValidation,
  overviewAgentEngagementExportValidation,
  overviewMttrReportValidation,
  overviewMttrReportExportValidation,
  overviewAgentWiseReportValidation,
  overviewAgentWiseReportExportValidation,
  tagTrendsSpikeWatchlistValidation,
  tagTrendsSpikeWatchlistExportValidation,
  tagTrendsFrequencyValidation,
  tagTrendsFrequencyExportValidation,
  tagTrendsTopPairsValidation,
  tagTrendsFilterValidation,
  adoptionReportValidation,
  adoptionReportExportValidation,
  adoptionCaseEscalationValidation,
  adoptionCaseEscalationExportValidation,
  feedbackResponseFeedbackValidation,
  feedbackResponseFeedbackDetailsValidation,
  feedbackFeatureTypesValidation,
  feedbackAgentNamesValidation,
  feedbackExportValidation
};
