const qs = require('qs');
const { CASE_QA_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { caseQa } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('../utils/base');

/** Case QA scores & agent scorecards - Agentic Suite Analytics ("L1"/AI agent quality surface). */
class CaseQa extends Base {
  #instance;

  #timeout;

  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#instance = props.instance;
    this.#timeout = props.timeout;
    this.#authObj = authObj;
  }

  getCaseQaFilters(params = {}) {
    validate(caseQa.getCaseQaFiltersValidation, params);

    const queryParams = qs.stringify(params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${CASE_QA_API.FILTERS}?${queryParams}`
    }, this.#authObj);
  }

  getCaseQaMetrics(params) {
    validate(caseQa.getCaseQaMetricsValidation, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${CASE_QA_API.METRICS}`,
      data: JSON.stringify(params)
    }, this.#authObj);
  }

  getCaseQaCaseDetails(params) {
    validate(caseQa.getCaseQaCaseDetailsValidation, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${CASE_QA_API.CASE_DETAILS}`,
      data: JSON.stringify(params)
    }, this.#authObj);
  }

  getCaseQaDetail(params) {
    validate(caseQa.getCaseQaDetailValidation, params);

    const queryParams = qs.stringify({ uid: params.uid, analyticsId: params.analyticsId });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${CASE_QA_API.CASE_DETAIL.replace('<caseId>', params.caseId)}?${queryParams}`
    }, this.#authObj);
  }

  getCqaInsights() {
    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${CASE_QA_API.INSIGHTS}`
    }, this.#authObj);
  }

  getAgentScoreCardMetrics(params) {
    validate(caseQa.getAgentScoreCardMetricsValidation, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${CASE_QA_API.AGENT_SCORE_CARD_METRICS}`,
      data: JSON.stringify(params)
    }, this.#authObj);
  }

  getMyScoreCard(params) {
    validate(caseQa.getMyScoreCardValidation, params);

    const queryParams = qs.stringify(params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${CASE_QA_API.MY_SCORE_CARD}?${queryParams}`
    }, this.#authObj);
  }

  getMyScoreCardDetails(params) {
    validate(caseQa.getMyScoreCardDetailsValidation, params);

    const queryParams = qs.stringify(params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${CASE_QA_API.MY_SCORE_CARD_DETAILS}?${queryParams}`
    }, this.#authObj);
  }
}

module.exports = {
  CaseQa
};
