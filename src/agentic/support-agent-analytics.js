const qs = require('qs');
const { SUPPORT_AGENT_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { supportAgent } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('../core/base');

/** Bot/chatbot conversation analytics - Agentic Suite "Support Agent" domain. */
class SupportAgentAnalytics extends Base {
  #instance;

  #timeout;

  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#instance = props.instance;
    this.#timeout = props.timeout;
    this.#authObj = authObj;
  }

  #get(schema, params, apiPath) {
    validate(schema, params || {});
    const queryParams = qs.stringify(params || {});

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${apiPath}?${queryParams}`
    }, this.#authObj);
  }

  getAgents() {
    return this.#get(supportAgent.getAgentsValidation, {}, SUPPORT_AGENT_API.AGENTS);
  }

  getKpis(params) {
    return this.#get(supportAgent.getKpisValidation, params, SUPPORT_AGENT_API.KPIS);
  }

  getTrendsVolumeOutcome(params) {
    return this.#get(supportAgent.getTrendsValidation, params, SUPPORT_AGENT_API.TRENDS_VOLUME_OUTCOME);
  }

  getTrendsDuration(params) {
    return this.#get(supportAgent.getTrendsValidation, params, SUPPORT_AGENT_API.TRENDS_DURATION);
  }

  getTrendsCsat(params) {
    return this.#get(supportAgent.getTrendsValidation, params, SUPPORT_AGENT_API.TRENDS_CSAT);
  }

  getOutcomeDistribution(params) {
    return this.#get(
      supportAgent.getOutcomeDistributionValidation,
      params,
      SUPPORT_AGENT_API.OUTCOME_DISTRIBUTION
    );
  }

  getSankey(params) {
    return this.#get(supportAgent.getSankeyValidation, params, SUPPORT_AGENT_API.SANKEY);
  }

  getSessions(params) {
    return this.#get(supportAgent.getSessionsValidation, params, SUPPORT_AGENT_API.SESSIONS);
  }

  getSessionTranscript(params) {
    validate(supportAgent.getSessionTranscriptValidation, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${SUPPORT_AGENT_API.SESSION_TRANSCRIPT.replace('<sessionId>', params.sessionId)}`
    }, this.#authObj);
  }
}

module.exports = {
  SupportAgentAnalytics
};
