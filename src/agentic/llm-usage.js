const qs = require('qs');
const { LLM_USAGE_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { llmUsage } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('../utils/base');

/** LLM token/cost consumption dashboard - Agentic Suite Analytics. */
class LlmUsage extends Base {
  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#authObj = authObj;
  }

  getLlmUsageDashboard(params = {}) {
    validate(llmUsage.getLlmUsageDashboardValidation, params);

    const queryParams = qs.stringify(params);

    return HttpRequest({
      timeout: this.getApiTimeout(),
      method: requestMethods.get,
      url: `${this.getInstance()}${LLM_USAGE_API.DASHBOARD}?${queryParams}`
    }, this.#authObj);
  }
}

module.exports = {
  LlmUsage
};
