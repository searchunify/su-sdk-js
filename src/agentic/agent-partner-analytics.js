const { AGENT_PARTNER_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { agentPartner } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('../utils/base');

/**
 * Agent Partner Analytics - self-service partner reporting suite (search-clients, adoption,
 * overview, tag-trends, feedback). All 29 endpoints are POST with a `filters`-style body; see
 * agent-partner-validation.js for the shared (currently permissive) request schema.
 */
class AgentPartnerAnalytics extends Base {
  #instance;

  #timeout;

  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#instance = props.instance;
    this.#timeout = props.timeout;
    this.#authObj = authObj;
  }

  #post(params, apiPath) {
    validate(agentPartner.agentPartnerRequestValidation, params || {});

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${apiPath}`,
      data: JSON.stringify(params || {})
    }, this.#authObj);
  }

  getSearchClients(params) {
    return this.#post(params, AGENT_PARTNER_API.SEARCH_CLIENTS);
  }

  getAdoptionContentSources(params) {
    return this.#post(params, AGENT_PARTNER_API.ADOPTION_CONTENT_SOURCES);
  }

  getOverviewTileData(params) {
    return this.#post(params, AGENT_PARTNER_API.OVERVIEW_TILE_DATA);
  }

  getOverviewAgentEngagement(params) {
    return this.#post(params, AGENT_PARTNER_API.OVERVIEW_AGENT_ENGAGEMENT);
  }

  exportOverviewAgentEngagementReport(params) {
    return this.#post(params, AGENT_PARTNER_API.OVERVIEW_AGENT_ENGAGEMENT_EXPORT);
  }

  getOverviewMttrReport(params) {
    return this.#post(params, AGENT_PARTNER_API.OVERVIEW_MTTR_REPORT);
  }

  exportOverviewMttrReport(params) {
    return this.#post(params, AGENT_PARTNER_API.OVERVIEW_MTTR_REPORT_EXPORT);
  }

  getOverviewAgentWiseReport(params) {
    return this.#post(params, AGENT_PARTNER_API.OVERVIEW_AGENT_WISE_REPORT);
  }

  exportOverviewAgentWiseReport(params) {
    return this.#post(params, AGENT_PARTNER_API.OVERVIEW_AGENT_WISE_REPORT_EXPORT);
  }

  getTagTrendsSpikeWatchlist(params) {
    return this.#post(params, AGENT_PARTNER_API.TAG_TRENDS_SPIKE_WATCHLIST);
  }

  exportTagTrendsSpikeWatchlistReport(params) {
    return this.#post(params, AGENT_PARTNER_API.TAG_TRENDS_SPIKE_WATCHLIST_EXPORT);
  }

  getTagTrendsFrequency(params) {
    return this.#post(params, AGENT_PARTNER_API.TAG_TRENDS_FREQUENCY);
  }

  exportTagTrendsFrequencyReport(params) {
    return this.#post(params, AGENT_PARTNER_API.TAG_TRENDS_FREQUENCY_EXPORT);
  }

  getTagTrendsTopPairs(params) {
    return this.#post(params, AGENT_PARTNER_API.TAG_TRENDS_TOP_PAIRS);
  }

  getTagTrendsFilterAgents(params) {
    return this.#post(params, AGENT_PARTNER_API.TAG_TRENDS_FILTER_AGENTS);
  }

  getTagTrendsFilterProducts(params) {
    return this.#post(params, AGENT_PARTNER_API.TAG_TRENDS_FILTER_PRODUCTS);
  }

  getAdoptionRaAdoptionReport(params) {
    return this.#post(params, AGENT_PARTNER_API.ADOPTION_RA_ADOPTION);
  }

  exportAdoptionRaAdoptionReport(params) {
    return this.#post(params, AGENT_PARTNER_API.ADOPTION_RA_ADOPTION_EXPORT);
  }

  getAdoptionAhAdoptionReport(params) {
    return this.#post(params, AGENT_PARTNER_API.ADOPTION_AH_ADOPTION);
  }

  exportAdoptionAhAdoptionReport(params) {
    return this.#post(params, AGENT_PARTNER_API.ADOPTION_AH_ADOPTION_EXPORT);
  }

  getAdoptionCaseEscalationReport(params) {
    return this.#post(params, AGENT_PARTNER_API.ADOPTION_CASE_ESCALATION);
  }

  exportAdoptionCaseEscalationReport(params) {
    return this.#post(params, AGENT_PARTNER_API.ADOPTION_CASE_ESCALATION_EXPORT);
  }

  getAdoptionAverageTtrReport(params) {
    return this.#post(params, AGENT_PARTNER_API.ADOPTION_AVERAGE_TTR);
  }

  exportAdoptionAverageTtrReport(params) {
    return this.#post(params, AGENT_PARTNER_API.ADOPTION_AVERAGE_TTR_EXPORT);
  }

  getFeedbackReport(params) {
    return this.#post(params, AGENT_PARTNER_API.FEEDBACK_RESPONSE_FEEDBACK);
  }

  getFeedbackReportDetails(params) {
    return this.#post(params, AGENT_PARTNER_API.FEEDBACK_RESPONSE_FEEDBACK_DETAILS);
  }

  getFeedbackFeatureTypes(params) {
    return this.#post(params, AGENT_PARTNER_API.FEEDBACK_FEATURE_TYPES);
  }

  getFeedbackAgentNames(params) {
    return this.#post(params, AGENT_PARTNER_API.FEEDBACK_AGENT_NAMES);
  }

  exportFeedbackReport(params) {
    return this.#post(params, AGENT_PARTNER_API.FEEDBACK_EXPORT);
  }
}

module.exports = {
  AgentPartnerAnalytics
};
