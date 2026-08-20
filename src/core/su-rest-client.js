const { Authentication } = require('../utils/authentication');
const validations = require('../validations');
const joiValidator = require('../validations/joi-validator');
const { DEFAULT_TIMEOUT } = require('../utils/constants');
const { initSuCoreClasses } = require('./su-core-classes');
const { initAgenticClasses } = require('../agentic');

/**
 * @class Searchunify Rest Client
 * @summary Initilize SearchUnify Rest Client.
 * @param {Object} instance SearchUnify Instance URL.
 * @param {Object} timeout APIs Request Timeout (Default 60000ms).
 * @author Ashish Prasher
 */

class SearchUnifyRestClient {
  #authentication;

  #core;

  #agentic;

  constructor(props) {
    joiValidator.validate(validations.client.initialize, props);

    props.timeout = props.timeout || DEFAULT_TIMEOUT;
    props.instance = props.instance.replace(/\/$/, ''); // Removing trailing slash

    this.#authentication = new Authentication(props);
    this.#core = initSuCoreClasses(props, this.#authentication);
    this.#agentic = initAgenticClasses(props, this.#authentication);
  }

  Analytics() {
    return this.#core.analytics;
  }

  Content() {
    return this.#core.content;
  }

  Search() {
    return this.#core.search;
  }

  SearchClients() {
    return this.#core.searchClients;
  }

  CaseQa() {
    return this.#agentic.caseQa;
  }

  SupportAgentAnalytics() {
    return this.#agentic.supportAgentAnalytics;
  }

  AgentPartnerAnalytics() {
    return this.#agentic.agentPartnerAnalytics;
  }

  LlmUsage() {
    return this.#agentic.llmUsage;
  }
}

module.exports = {
  SearchUnifyRestClient
};
