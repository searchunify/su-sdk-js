const qs = require('qs');
const { LLM_USAGE_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { llmUsage } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('./base');

/** LLM token/cost consumption dashboard - Agentic Suite Analytics. */
class LlmUsage extends Base {
  #instance;

  #timeout;

  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#instance = props.instance;
    this.#timeout = props.timeout;
    this.#authObj = authObj;
  }

  getLlmUsageDashboard(params = {}) {
    validate(llmUsage.getLlmUsageDashboardValidation, params);

    const queryParams = qs.stringify(params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${LLM_USAGE_API.DASHBOARD}?${queryParams}`
    }, this.#authObj);
  }
}

module.exports = {
  LlmUsage
};
