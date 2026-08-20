const { CONTENT_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { Base } = require('../utils/base');

class SearchClients extends Base {
  #instance;

  #timeout;

  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#instance = props.instance;
    this.#timeout = props.timeout;
    this.#authObj = authObj;
  }

  getSearchClients = async () => HttpRequest({
    timeout: this.#timeout,
    method: requestMethods.get,
    url: `${this.#instance}${CONTENT_API.SEARCH_CLIENTS}`
  }, this.#authObj);
}

module.exports = {
  SearchClients
};
