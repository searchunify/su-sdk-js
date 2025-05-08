const qs = require('qs');
const { ANALYTICS } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { analytics } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('./base');

class Analytics extends Base {
  #instance;

  #timeout;

  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#instance = props.instance;
    this.#timeout = props.timeout;
    this.#authObj = authObj;
  }

  getTilesData(params) {
    validate(analytics.similarValidation, params);

    const payload = JSON.stringify({
      from: params.startDate,
      to: params.endDate,
      uid: params.searchClientId,
      ecoId: params.ecoSystemId,
      userMetricsFilters: params.userMetricsFilters,
      internalUser: params.internalUser,
      tenantId: params.tenantId,
      emailTracking: params.emailTracking,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.TILE_DATA}`,
      data: payload
    }, this.#authObj);
  }

  getSearchSummaryChart(params) {
    validate(analytics.similarValidation, params);

    const payload = JSON.stringify({
      from: params.startDate,
      to: params.endDate,
      uid: params.searchClientId,
      ecoId: params.ecoSystemId,
      userMetricsFilters: params.userMetricsFilters,
      internalUser: params.internalUser,
      tenantId: params.tenantId,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.SUMMARY_CHART_DATA}`,
      data: payload
    }, this.#authObj);
  }

  getAllSearchQuery(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      internalUser: params.internalUser,
      tenantId: params.tenantId
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.ALL_SEARCH_QUERY}?${queryParams}`
    }, this.#authObj);
  }

  searchQueryWithResult(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      tenantId: params.tenantId,
      internalUser: params.internalUser
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCHQUERY_WITH_RESULT}?${queryParams}`
    }, this.#authObj);
  }

  searchQueryWithNoClicks(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      tenantId: params.tenantId,
      internalUser: params.internalUser
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCHQUERY_WITH_NO_CLICKS}?${queryParams}`
    }, this.#authObj);
  }

  searchQueryWithoutResults(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      tenantId: params.tenantId,
      internalUser: params.internalUser
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCHQUERY_WITHOUT_RESULT}?${queryParams}`
    }, this.#authObj);
  }

  searchQueryHistogram(params) {
    validate(analytics.similarValidationWithCount, params);

    const payload = JSON.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      ecoId: params.ecoSystemId,
      userMetricsFilters: params.userMetricsFilters,
      internalUser: params.internalUser,
      tenantId: params.tenantId,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset
    });


    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.SEARCHQUERY_HISTOGRAM}`,
      data: payload
    }, this.#authObj);
  }

  missedQueryHistogram(params) {
    validate(analytics.similarValidationWithCount, params);

    const payload = JSON.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      ecoId: params.ecoSystemId,
      userMetricsFilters: params.userMetricsFilters,
      internalUser: params.internalUser,
      tenantId: params.tenantId,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.MISSED_QUERY_HISTOGRAM}`,
      data: payload
    }, this.#authObj);
  }

  searchSessionByCaseUidAuth(params) {
    validate(analytics.searchSessionByCaseUidValidation, params);

    const payload = JSON.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      caseUid: params.caseUid,
      tenantId: params.tenantId,
    });


    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.SEARCH_SESSION_BY_CASE_UID_AUTH}`,
      data: payload
    }, this.#authObj);
  }

  getAllSearchConversion(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      tenantId: params.tenantId,
      internalUser: params.internalUser
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.ALL_SEARCH_CONVERSION}?${queryParams}`
    }, this.#authObj);
  }

  searchConversionNotOnFirstPage(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      tenantId: params.tenantId,
      internalUser: params.internalUser
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCH_CONVERSION_NOT_FIRST_PAGE}?${queryParams}`
    }, this.#authObj);
  }

  searchConversionWithFilters(params) {
    validate(analytics.searchConversionWithFilters, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      searchClientId: params.searchClientId,
      tenantId: params.tenantId,
      internalUser: params.internalUser,
      userMetricsFilters: params.userMetricsFilters,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCH_CONVERSION_WITH_FILTERS}?${queryParams}`
    }, this.#authObj);
  }

  searchConversionBySessionId(params) {
    validate(analytics.searchConversionBySessionId, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      tenantId: params.tenantId,
      internalUser: params.internalUser
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCH_CONVERSION_BY_SESSION_ID}/${params.sessionId}?${queryParams}`
    }, this.#authObj);
  }

  discussionsReadyToBecomeArticles(params) {
    validate(analytics.discussionsReadyToBecomeArticles, params);

    const payload = JSON.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      internalUser: params.internalUser,
      tenantId: params.tenantId,
      userMetricsFilters: params.userMetricsFilters,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset
    });


    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.DISCUSSION_READY_TO_BECOM_ARTICLE}`,
      data: payload
    }, this.#authObj);
  }

  getCaseCreatedArticles(params) {
    validate(analytics.caseArticlesValidation, params);

    const payload = JSON.stringify({
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser,
      searchType: params.searchType,
      uid: params.searchClientId,
      offset: params.offset,
      limit: params.count,
      userMetricsFilters: params.userMetricsFilters,
      tenantId: params.tenantId,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset,
      ecoId: params.ecoSystemId,
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.ARTICLE_CREATED_CASES}`,
      data: payload
    }, this.#authObj);
  }

  getCaseDeflectedArticles(params) {
    validate(analytics.caseArticlesValidation, params);

    const payload = JSON.stringify({
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser,
      searchType: params.searchType,
      uid: params.searchClientId,
      offset: params.offset,
      limit: params.count,
      tenantId: params.tenantId,
      userMetricsFilters: params.userMetricsFilters,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset,
      ecoId: params.ecoSystemId,
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.ARTICLE_DEFLECTED_CASES}`,
      data: payload
    }, this.#authObj);
  }

  getAttachedArticles(params) {
    validate(analytics.attachedArticlesValidation, params);

    const payload = JSON.stringify({
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser,
      uid: params.searchClientId,
      offset: params.offset,
      limit: params.count,
      ecoId: params.ecoSystemId,
      tenantId: params.tenantId,
      userMetricsFilters: params.userMetricsFilters,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset,
    });


    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.ATTACHED_ARTICLE}`,
      data: payload
    }, this.#authObj);
  }

  getAttachedOnCase(params) {
    validate(analytics.attachedOnCaseValidation, params);

    const payload = JSON.stringify({
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser,
      uid: params.searchClientId,
      offset: params.offset,
      limit: params.count,
      url: params.url,
      userMetricsFilters: params.userMetricsFilters,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset,
      tenantId: params.tenantId,
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.ATTACHED_ON_CASE}`,
      data: payload
    }, this.#authObj);
  }

  getSearchQueryInSessions(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      tenantId: params.tenantId,
      internalUser: params.internalUser,
      pageNumber: params.pageNumber,
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.ALL_SEARCH_QUERY_WITH_SESSION}?${queryParams}`
    }, this.#authObj);
  }

  getKcsSupportSearchQuery(params) {
    validate(analytics.similarValidationWithCount, params);

    const payload = JSON.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      searchClientId: params.searchClientId,
      ecoId: params.ecoSystemId,
      tenantId: params.tenantId,
      userMetricsFilters: params.userMetricsFilters
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.KCS_SUPPORT}`,
      data: payload
    }, this.#authObj);
  }

  getSearchSessionByCaseUid(params) {
    validate(analytics.searchSessionByCaseUidValidation, params);

    const payload = JSON.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      caseUid: params.caseUid,
      tenantId: params.tenantId,
      ecoId: params.ecoSystemId,
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.SEARCH_SESSION_BY_CASE_UID}`,
      data: payload
    }, this.#authObj);
  }

  getSearchSessionBySearchSessionId(params) {
    validate(analytics.searchSessionBySSIdValidation, params);

    const queryParams = qs.stringify({
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      sessionId: params.sessionId,
      searchClientId: params.searchClientId,
      pageNumber: params.pageNumber,
      internalUser: params.internalUser,
      tenantId: params.tenantId,
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCH_SESSION_BY_SESSION_ID}/${params.sessionId}?${queryParams}`
    }, this.#authObj);
  }
}

module.exports = {
  Analytics
};
