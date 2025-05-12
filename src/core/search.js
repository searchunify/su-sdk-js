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

  getGPTResults = async (params) => {
    const isValid = validate(search.gptResultValidation, params);

    const requestParams = {
      "searchString": params.searchString,
      "from": params.from || 0,
      "sortby": params.sortby || "_score",
      "orderBy": params.orderBy || "desc",
      "pageNo": params.pageNo || 1,
      "aggregations": params.aggregations || [],
      "uid": params.searchClientId,
      "resultsPerPage": params.resultsPerPage || 10,
      "apiVersion": params.apiVersion || true,
      "email": params.email || '',
      "UserId": params.userId || '',
      "ProfileId": params.profileId || '',
      "UserType": params.userType || '',
      "ContactId": params.contactId || '',
      "AccountId": params.accountId || '',
      "boardsArr": params.boardsArr || '',
      "roles": params.roles || '',
      "getScore": params.getScore || 0,
      "language": params.language || 'en',
      "Fields": params.fields || [],
      "indexEnabled": params.indexEnabled || true,
      "redisEnable": params.redisEnable || 1,
      "redisCachingTime": params.redisCachingTime || 1800,
      "encrypt": params.encrypt || false,
      "mergeSources": params.mergeSources || false,
      "searchWithoutHosted": params.searchWithoutHosted || false,
      "referer": params.referer || '',
      "RequestType": params.requestType,
      "context": params.context || '',
      "articles": params.articles || [],
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${SEARCH_API.GPT_RESULTS}`,
      data: JSON.stringify(requestParams),

    }, this.#authObj);
  };
}

module.exports = {
  Search
};
