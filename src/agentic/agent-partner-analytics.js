const { AGENT_PARTNER_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { agentPartner } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('../utils/base');

/**
 * Agent Partner Analytics - self-service partner reporting suite (search-clients, adoption,
 * overview, tag-trends, feedback). All 29 endpoints are POST; each has its own request schema
 * in agent-partner-validation.js, read directly from the real controllers.
 */
class AgentPartnerAnalytics extends Base {
  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#authObj = authObj;
  }

  #post(schema, params, apiPath) {
    const { value } = validate(schema, params || {});

    return HttpRequest({
      timeout: this.getApiTimeout(),
      method: requestMethods.post,
      url: `${this.getInstance()}${apiPath}`,
      data: JSON.stringify(value)
    }, this.#authObj);
  }

  getSearchClients(params) {
    return this.#post(agentPartner.searchClientsValidation, params, AGENT_PARTNER_API.SEARCH_CLIENTS);
  }

  getAdoptionContentSources(params) {
    return this.#post(agentPartner.adoptionContentSourcesValidation, params, AGENT_PARTNER_API.ADOPTION_CONTENT_SOURCES);
  }

  getOverviewTileData(params) {
    return this.#post(agentPartner.overviewTileDataValidation, params, AGENT_PARTNER_API.OVERVIEW_TILE_DATA);
  }

  getOverviewAgentEngagement(params) {
    return this.#post(agentPartner.overviewAgentEngagementValidation, params, AGENT_PARTNER_API.OVERVIEW_AGENT_ENGAGEMENT);
  }

  exportOverviewAgentEngagementReport(params) {
    return this.#post(agentPartner.overviewAgentEngagementExportValidation, params, AGENT_PARTNER_API.OVERVIEW_AGENT_ENGAGEMENT_EXPORT);
  }

  getOverviewMttrReport(params) {
    return this.#post(agentPartner.overviewMttrReportValidation, params, AGENT_PARTNER_API.OVERVIEW_MTTR_REPORT);
  }

  exportOverviewMttrReport(params) {
    return this.#post(agentPartner.overviewMttrReportExportValidation, params, AGENT_PARTNER_API.OVERVIEW_MTTR_REPORT_EXPORT);
  }

  getOverviewAgentWiseReport(params) {
    return this.#post(agentPartner.overviewAgentWiseReportValidation, params, AGENT_PARTNER_API.OVERVIEW_AGENT_WISE_REPORT);
  }

  exportOverviewAgentWiseReport(params) {
    return this.#post(agentPartner.overviewAgentWiseReportExportValidation, params, AGENT_PARTNER_API.OVERVIEW_AGENT_WISE_REPORT_EXPORT);
  }

  getTagTrendsSpikeWatchlist(params) {
    return this.#post(agentPartner.tagTrendsSpikeWatchlistValidation, params, AGENT_PARTNER_API.TAG_TRENDS_SPIKE_WATCHLIST);
  }

  exportTagTrendsSpikeWatchlistReport(params) {
    return this.#post(agentPartner.tagTrendsSpikeWatchlistExportValidation, params, AGENT_PARTNER_API.TAG_TRENDS_SPIKE_WATCHLIST_EXPORT);
  }

  getTagTrendsFrequency(params) {
    return this.#post(agentPartner.tagTrendsFrequencyValidation, params, AGENT_PARTNER_API.TAG_TRENDS_FREQUENCY);
  }

  exportTagTrendsFrequencyReport(params) {
    return this.#post(agentPartner.tagTrendsFrequencyExportValidation, params, AGENT_PARTNER_API.TAG_TRENDS_FREQUENCY_EXPORT);
  }

  getTagTrendsTopPairs(params) {
    return this.#post(agentPartner.tagTrendsTopPairsValidation, params, AGENT_PARTNER_API.TAG_TRENDS_TOP_PAIRS);
  }

  getTagTrendsFilterAgents(params) {
    return this.#post(agentPartner.tagTrendsFilterValidation, params, AGENT_PARTNER_API.TAG_TRENDS_FILTER_AGENTS);
  }

  getTagTrendsFilterProducts(params) {
    return this.#post(agentPartner.tagTrendsFilterValidation, params, AGENT_PARTNER_API.TAG_TRENDS_FILTER_PRODUCTS);
  }

  getAdoptionRaAdoptionReport(params) {
    return this.#post(agentPartner.adoptionReportValidation, params, AGENT_PARTNER_API.ADOPTION_RA_ADOPTION);
  }

  exportAdoptionRaAdoptionReport(params) {
    return this.#post(agentPartner.adoptionReportExportValidation, params, AGENT_PARTNER_API.ADOPTION_RA_ADOPTION_EXPORT);
  }

  getAdoptionAhAdoptionReport(params) {
    return this.#post(agentPartner.adoptionReportValidation, params, AGENT_PARTNER_API.ADOPTION_AH_ADOPTION);
  }

  exportAdoptionAhAdoptionReport(params) {
    return this.#post(agentPartner.adoptionReportExportValidation, params, AGENT_PARTNER_API.ADOPTION_AH_ADOPTION_EXPORT);
  }

  getAdoptionCaseEscalationReport(params) {
    return this.#post(agentPartner.adoptionCaseEscalationValidation, params, AGENT_PARTNER_API.ADOPTION_CASE_ESCALATION);
  }

  exportAdoptionCaseEscalationReport(params) {
    return this.#post(agentPartner.adoptionCaseEscalationExportValidation, params, AGENT_PARTNER_API.ADOPTION_CASE_ESCALATION_EXPORT);
  }

  getAdoptionAverageTtrReport(params) {
    return this.#post(agentPartner.adoptionReportValidation, params, AGENT_PARTNER_API.ADOPTION_AVERAGE_TTR);
  }

  exportAdoptionAverageTtrReport(params) {
    return this.#post(agentPartner.adoptionReportExportValidation, params, AGENT_PARTNER_API.ADOPTION_AVERAGE_TTR_EXPORT);
  }

  getFeedbackReport(params) {
    return this.#post(agentPartner.feedbackResponseFeedbackValidation, params, AGENT_PARTNER_API.FEEDBACK_RESPONSE_FEEDBACK);
  }

  getFeedbackReportDetails(params) {
    return this.#post(agentPartner.feedbackResponseFeedbackDetailsValidation, params, AGENT_PARTNER_API.FEEDBACK_RESPONSE_FEEDBACK_DETAILS);
  }

  getFeedbackFeatureTypes(params) {
    return this.#post(agentPartner.feedbackFeatureTypesValidation, params, AGENT_PARTNER_API.FEEDBACK_FEATURE_TYPES);
  }

  getFeedbackAgentNames(params) {
    return this.#post(agentPartner.feedbackAgentNamesValidation, params, AGENT_PARTNER_API.FEEDBACK_AGENT_NAMES);
  }

  exportFeedbackReport(params) {
    return this.#post(agentPartner.feedbackExportValidation, params, AGENT_PARTNER_API.FEEDBACK_EXPORT);
  }
}

module.exports = {
  AgentPartnerAnalytics
};
