const { CONTENT_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { Base } = require('../utils/base');

class SearchClients extends Base {
  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#authObj = authObj;
  }

  getSearchClients = async () => HttpRequest({
    timeout: this.getApiTimeout(),
    method: requestMethods.get,
    url: `${this.getInstance()}${CONTENT_API.SEARCH_CLIENTS}`
  }, this.#authObj);
}

module.exports = {
  SearchClients
};
