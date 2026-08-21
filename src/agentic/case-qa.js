const qs = require('qs');
const { CASE_QA_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { caseQa } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('../utils/base');

/** Case QA scores & agent scorecards - Agentic Suite Analytics ("L1"/AI agent quality surface). */
class CaseQa extends Base {
  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#authObj = authObj;
  }

  #get(schema, params, apiPath) {
    const { value } = validate(schema, params || {});
    const queryParams = qs.stringify(value);

    return HttpRequest({
      timeout: this.getApiTimeout(),
      method: requestMethods.get,
      url: `${this.getInstance()}${apiPath}?${queryParams}`
    }, this.#authObj);
  }

  #post(schema, params, apiPath) {
    const { value } = validate(schema, params);

    return HttpRequest({
      timeout: this.getApiTimeout(),
      method: requestMethods.post,
      url: `${this.getInstance()}${apiPath}`,
      data: JSON.stringify(value)
    }, this.#authObj);
  }

  getCaseQaFilters(params = {}) {
    return this.#get(caseQa.getCaseQaFiltersValidation, params, CASE_QA_API.FILTERS);
  }

  getCaseQaMetrics(params) {
    return this.#post(caseQa.getCaseQaMetricsValidation, params, CASE_QA_API.METRICS);
  }

  getCaseQaCaseDetails(params) {
    return this.#post(caseQa.getCaseQaCaseDetailsValidation, params, CASE_QA_API.CASE_DETAILS);
  }

  getCaseQaDetail(params) {
    const { value } = validate(caseQa.getCaseQaDetailValidation, params);

    const queryParams = qs.stringify({ uid: value.uid, analyticsId: value.analyticsId });

    return HttpRequest({
      timeout: this.getApiTimeout(),
      method: requestMethods.get,
      url: `${this.getInstance()}${CASE_QA_API.CASE_DETAIL.replace('<caseId>', value.caseId)}?${queryParams}`
    }, this.#authObj);
  }

  getCqaInsights(params = {}) {
    validate(caseQa.getCqaInsightsValidation, params);

    return HttpRequest({
      timeout: this.getApiTimeout(),
      method: requestMethods.get,
      url: `${this.getInstance()}${CASE_QA_API.INSIGHTS}`
    }, this.#authObj);
  }

  getAgentScoreCardMetrics(params) {
    return this.#post(caseQa.getAgentScoreCardMetricsValidation, params, CASE_QA_API.AGENT_SCORE_CARD_METRICS);
  }

  getMyScoreCard(params) {
    return this.#get(caseQa.getMyScoreCardValidation, params, CASE_QA_API.MY_SCORE_CARD);
  }

  getMyScoreCardDetails(params) {
    return this.#get(caseQa.getMyScoreCardDetailsValidation, params, CASE_QA_API.MY_SCORE_CARD_DETAILS);
  }
}

module.exports = {
  CaseQa
};
