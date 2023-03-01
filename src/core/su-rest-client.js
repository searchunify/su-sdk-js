const { Authentication } = require('../utils/authentication');
const validations = require('../validations');
const joiValidator = require('../validations/joi-validator');
const { DEFAULT_TIMEOUT } = require('../utils/constants');
const { Analytics } = require('./analytics');
const { Content } = require('./content');
const { Search } = require('./search');

/**
 * @class Searchunify Rest Client
 * @summary Initilize SearchUnify Rest Client.
 * @param {Object} instance SearchUnify Instance URL.
 * @param {Object} timeout APIs Request Timeout (Default 60000ms).
 * @author Ashish Prasher
 */

class SearchUnifyRestClient {
  #authentication;

  #analytics;

  #content;

  #search;

  constructor(props) {
    joiValidator.validate(validations.client.initialize, props);

    props.timeout = props.timeout || DEFAULT_TIMEOUT;
    props.instance = props.instance.replace(/\/$/, ''); // Removing trailing slash

    this.#authentication = new Authentication(props);
    this.#analytics = new Analytics(props, this.#authentication);
    this.#content = new Content(props, this.#authentication);
    this.#search = new Search(props, this.#authentication);
  }

  Analytics() {
    return this.#analytics;
  }

  Content() {
    return this.#content;
  }

  Search() {
    return this.#search;
  }
}

module.exports = {
  SearchUnifyRestClient
};
