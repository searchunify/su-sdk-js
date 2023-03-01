const { SEARCH_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { search } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('./base');

class Search extends Base {
  #instance;

  #timeout;

  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#instance = props.instance;
    this.#timeout = props.timeout;
    this.#authObj = authObj;
  }

  getSearchResults = async (params) => {
    const isValid = validate(search.searchValidation, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${SEARCH_API.SEARCH}`,
      data: JSON.stringify(isValid.value)
    }, this.#authObj);
  };
}

module.exports = {
  Search
};
