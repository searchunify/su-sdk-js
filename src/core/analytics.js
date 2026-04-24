const qs = require('qs');
const { ANALYTICS } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { analytics } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('./base');

const buildSearchClassificationQueryParams = (params) => qs.stringify({
  startDate: params.startDate,
  endDate: params.endDate,
  count: params.count,
  searchClientId: params.searchClientId,
  pageNumber: params.pageNumber,
  sortByField: params.sortByField,
  sortType: params.sortType
});

/** Session list rows from API have either uid (sessions) or eco_id (eco_sessions); expose both keys for consumers. */
const normalizeSessionListTableData = (data) => {
  if (!data || typeof data !== 'object' || !Array.isArray(data.sessions)) {
    return data;
  }
  return {
    ...data,
    sessions: data.sessions.map((row) => {
      if (row == null || typeof row !== 'object') {
        return row;
      }
      const hasUid = Object.prototype.hasOwnProperty.call(row, 'uid');
      const hasEco = Object.prototype.hasOwnProperty.call(row, 'eco_id');
      if (hasUid && !hasEco) {
        return { ...row, eco_id: null };
      }
      if (hasEco && !hasUid) {
        return { ...row, uid: null };
      }
      return row;
    })
  };
};

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

    const queryParams = buildSearchClassificationQueryParams(params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.ALL_SEARCH_QUERY}?${queryParams}`
    }, this.#authObj);
  }

  searchQueryWithResult(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = buildSearchClassificationQueryParams(params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCHQUERY_WITH_RESULT}?${queryParams}`
    }, this.#authObj);
  }

  searchQueryWithNoClicks(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = buildSearchClassificationQueryParams(params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCHQUERY_WITH_NO_CLICKS}?${queryParams}`
    }, this.#authObj);
  }

  searchQueryWithoutResults(params) {
    validate(analytics.similarValidationWithCount, params);

    const queryParams = buildSearchClassificationQueryParams(params);

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
      searchType: params.searchType,
      uid: params.searchClientId,
      offset: params.offset,
      limit: params.count,
      userMetricsFilters: params.userMetricsFilters,
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
      searchType: params.searchType,
      uid: params.searchClientId,
      offset: params.offset,
      limit: params.count,
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
      uid: params.searchClientId,
      offset: params.offset,
      limit: params.count,
      ecoId: params.ecoSystemId,
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
      uid: params.searchClientId,
      offset: params.offset,
      limit: params.count,
      url: params.url,
      userMetricsFilters: params.userMetricsFilters,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset,
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
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SEARCH_SESSION_BY_SESSION_ID}/${params.sessionId}?${queryParams}`
    }, this.#authObj);
  }

  getAverageClickPosition(params) {
    validate(analytics.similarValidation, params);

    const payload = {
      from: params.startDate,
      to: params.endDate,
      uid: params.searchClientId,
      ecoId: params.ecoSystemId,
      internalUser: params.internalUser,
      userMetricsFilters: params.userMetricsFilters,
      emailTracking: params.emailTracking,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset,
    };
    if (params.tenantId !== undefined && params.tenantId !== null && String(params.tenantId).trim() !== '') {
      payload.tenantId = params.tenantId;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.AVERAGE_CLICK_POSITION}`,
      data: JSON.stringify(payload)
    }, this.#authObj);
  }

  getSessionDetails(params) {
    validate(analytics.sessionDetailsValidation, params);

    const query = {
      startDate: params.startDate,
      endDate: params.endDate,
      uid: params.searchClientId,
      count: params.count,
      sessionId: params.sessionId,
      startIndex: params.startIndex,
    };
    if (params.sortByField !== undefined && params.sortByField !== null) {
      query.sortByField = params.sortByField;
    }
    if (params.sortType !== undefined && params.sortType !== null) {
      query.sortType = params.sortType;
    }
    const queryParams = qs.stringify(query);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SESSION_LOG}?${queryParams}`
    }, this.#authObj);
  }

  getSessionListTable(params) {
    validate(analytics.sessionListTableValidation, params);

    const query = {
      startDate: params.startDate,
      endDate: params.endDate,
      count: params.count,
      sessionId: params.sessionId,
      startIndex: params.startIndex,
    };
    if (params.ecoSystemId) {
      query.ecoId = params.ecoSystemId;
    } else {
      query.uid = params.searchClientId;
    }
    if (params.tenantId !== undefined && params.tenantId !== null) {
      query.tenantId = params.tenantId;
    }
    if (params.internalUser !== undefined && params.internalUser !== null) {
      query.internalUser = params.internalUser;
    }
    if (params.searchFilter !== undefined && params.searchFilter !== null) {
      query.searchFilter = params.searchFilter;
    }
    if (params.clickFilter !== undefined && params.clickFilter !== null) {
      query.clickFilter = params.clickFilter;
    }
    if (params.caseFilter !== undefined && params.caseFilter !== null) {
      query.caseFilter = params.caseFilter;
    }
    if (params.articleFilter !== undefined && params.articleFilter !== null) {
      query.articleFilter = params.articleFilter;
    }
    if (params.sortByField !== undefined && params.sortByField !== null) {
      query.sortByField = params.sortByField;
    }
    if (params.sortType !== undefined && params.sortType !== null) {
      query.sortType = params.sortType;
    }
    const queryParams = qs.stringify(query);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${ANALYTICS.SESSION_LIST_TABLE}?${queryParams}`
    }, this.#authObj).then((result) => {
      if (result && result.status && result.data) {
        return { ...result, data: normalizeSessionListTableData(result.data) };
      }
      return result;
    });
  }

  getTileDataContent(params) {
    validate(analytics.similarValidation, params);

    const payload = JSON.stringify({
      from: params.startDate,
      to: params.endDate,
      uid: params.searchClientId,
      ecoId: params.ecoSystemId,
      userMetricsFilters: params.userMetricsFilters,
      emailTracking: params.emailTracking,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.TILE_DATA_CONTENT}`,
      data: payload
    }, this.#authObj);
  }

  getTileDataMetrics1(params) {
    validate(analytics.similarValidation, params);

    const payload = JSON.stringify({
      from: params.startDate,
      to: params.endDate,
      uid: params.searchClientId,
      ecoId: params.ecoSystemId,
      userMetricsFilters: params.userMetricsFilters,
      emailTracking: params.emailTracking,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.TILE_DATA_METRICS_1}`,
      data: payload
    }, this.#authObj);
  }

  getTileDataMetrics2(params) {
    validate(analytics.similarValidation, params);

    const payload = JSON.stringify({
      from: params.startDate,
      to: params.endDate,
      uid: params.searchClientId,
      ecoId: params.ecoSystemId,
      userMetricsFilters: params.userMetricsFilters,
      emailTracking: params.emailTracking,
      userMetricsFlag: params.userMetricsFlag,
      userMetricsLimit: params.userMetricsLimit,
      userMetricsOffset: params.userMetricsOffset
    });

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.TILE_DATA_METRICS_2}`,
      data: payload
    }, this.#authObj);
  }

  getOverviewSearchClickPosition(params) {
    validate(analytics.overviewSearchClickPosition, params);

    const page = params.pageNumber ?? 1;
    const body = {
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser ?? 'all',
      searchQuery: params.searchQuery ?? '',
      sortingField: params.sortingField ?? 'click',
      sortType: params.sortType ?? 'desc',
      currentPage: page,
      offset: page,
    };
    if (params.ecoSystemId) {
      body.ecoId = params.ecoSystemId;
      body.uid = null;
    } else {
      body.uid = params.searchClientId;
      body.ecoId = null;
    }
    if (params.userMetricsFilters !== undefined) {
      body.userMetricsFilters = params.userMetricsFilters;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.OVERVIEW_SEARCH_CLICK_POSITION}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  getOverviewCreatedCases(params) {
    validate(analytics.overviewCreatedCases, params);

    const page = params.pageNumber ?? 1;
    const body = {
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser ?? 'all',
      caseUid: params.caseUid ?? '',
      caseSubject: params.caseSubject ?? '',
      cookie: params.sessionCookie ?? '',
      emailId: params.emailId ?? '',
      currentPage: page,
      offset: page,
      isAscending: params.isAscending ?? true,
    };
    if (params.ecoSystemId) {
      body.ecoId = params.ecoSystemId;
      body.uid = null;
    } else {
      body.uid = params.searchClientId ?? '';
      body.ecoId = null;
    }
    if (params.userMetricsFilters !== undefined) {
      body.userMetricsFilters = params.userMetricsFilters;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.OVERVIEW_CREATED_CASES}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  getOverviewFeaturedSnippet(params) {
    validate(analytics.similarValidation, params);

    const body = {
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser ?? 'all',
    };
    if (params.ecoSystemId) {
      body.ecoId = params.ecoSystemId;
    } else if (params.searchClientId) {
      body.uid = params.searchClientId;
    }
    if (params.userMetricsFilters !== undefined) {
      body.userMetricsFilters = params.userMetricsFilters;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.OVERVIEW_FEATURED_SNIPPET}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  getOverviewKnowledgeTitle(params) {
    validate(analytics.similarValidation, params);

    const body = {
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser ?? 'all',
    };
    if (params.ecoSystemId) {
      body.ecoId = params.ecoSystemId;
    } else if (params.searchClientId) {
      body.uid = params.searchClientId;
    }
    if (params.userMetricsFilters !== undefined) {
      body.userMetricsFilters = params.userMetricsFilters;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.OVERVIEW_KNOWLEDGE_TITLE}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  getOverviewPageRating(params) {
    validate(analytics.similarValidation, params);

    const body = {
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser ?? 'all',
      filterType: 'all',
      sortby: 'most_recent',
    };
    if (params.ecoSystemId) {
      body.ecoId = params.ecoSystemId;
    } else if (params.searchClientId) {
      body.uid = params.searchClientId;
    }
    if (params.userMetricsFilters !== undefined) {
      body.userMetricsFilters = params.userMetricsFilters;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.OVERVIEW_PAGE_RATING}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  getOverviewSearchFeedback(params) {
    validate(analytics.overviewSearchFeedback, params);

    const body = {
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser ?? 'all',
      offset: params.pageNumber ?? 1,
    };
    if (params.ecoSystemId) {
      body.ecoId = params.ecoSystemId;
    } else if (params.searchClientId) {
      body.uid = params.searchClientId;
    }
    if (params.userMetricsFilters !== undefined) {
      body.userMetricsFilters = params.userMetricsFilters;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.OVERVIEW_SEARCH_FEEDBACK}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  getOverviewAdvertisements(params) {
    validate(analytics.overviewAdvertisements, params);

    const body = {
      from: params.startDate,
      to: params.endDate,
      internalUser: params.internalUser ?? 'all',
      page_no: params.pageNumber ?? 1,
    };
    if (params.ecoSystemId) {
      body.ecoId = params.ecoSystemId;
    } else if (params.searchClientId) {
      body.uid = params.searchClientId;
    }
    if (params.searchKey !== undefined && params.searchKey !== '') {
      body.search_key = params.searchKey;
    }
    if (params.advertisementSortType !== undefined && params.advertisementSortType !== '') {
      body.sort_type = params.advertisementSortType;
    }
    if (params.userMetricsFilters !== undefined) {
      body.userMetricsFilters = params.userMetricsFilters;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.OVERVIEW_ADVERTISEMENTS}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  getLlmResponseFeedback(params) {
    validate(analytics.llmResponseFeedbackOverview, params);

    const body = {
      uid: params.searchClientId,
      from: params.startDate,
      to: params.endDate,
      limit: params.count ?? 10,
      offset: params.pageNumber ?? 1,
      reactionFilterType: params.reactionFilterType ?? 'all',
      searchQuery: params.searchQuery ?? '',
      internalUser: params.internalUser ?? 'all',
    };

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.LLM_RESPONSE_FEEDBACK}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  postCaseDeflectionStage1(params) {
    validate(analytics.conversionCaseDeflectionStage1, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.CASE_DEFLECTION_STAGE_1}`,
      data: JSON.stringify(params)
    }, this.#authObj);
  }

  postCaseDeflectionStage2(params) {
    validate(analytics.conversionCaseDeflectionStage2, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.CASE_DEFLECTION_STAGE_2}`,
      data: JSON.stringify(params)
    }, this.#authObj);
  }

  postCaseDeflectionTrends(params) {
    validate(analytics.conversionCaseDeflectionTrends, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.CASE_DEFLECTION_TRENDS}`,
      data: JSON.stringify(params)
    }, this.#authObj);
  }

  postConversionSummary(params) {
    validate(analytics.conversionConversionSummary, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.CONVERSION_SUMMARY}`,
      data: JSON.stringify(params)
    }, this.#authObj);
  }

  postCurrentRelevanceIndex(params) {
    validate(analytics.conversionRelevanceIndex, params);

    const body = {
      uid: params.uid,
      internalUser: params.internalUser
    };

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.CURRENT_RELEVANCE_INDEX}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  postRelevanceIndex(params) {
    validate(analytics.conversionRelevanceIndex, params);

    const body = {
      uid: params.uid,
      internalUser: params.internalUser,
      from: params.from,
      to: params.to
    };

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.RELEVANCE_INDEX}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  postLeadershipUnassistedSelfSolveVolume(params) {
    validate(analytics.leadershipSelfSolveVolume, params);

    const body = {
      internalUser: params.internalUser,
      from: params.from,
      to: params.to,
      directlyViewSetting: params.directlyViewSetting
    };
    if (params.ecoId) {
      body.ecoId = params.ecoId;
    } else {
      body.uid = params.uid;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.LEADERSHIP_UNASSISTED_SELF_SOLVE_VOLUME}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  postLeadershipAssistedSelfSolveVolume(params) {
    validate(analytics.leadershipSelfSolveVolume, params);

    const body = {
      internalUser: params.internalUser,
      from: params.from,
      to: params.to
    };
    if (params.ecoId) {
      body.ecoId = params.ecoId;
    } else {
      body.uid = params.uid;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.LEADERSHIP_ASSISTED_SELF_SOLVE_VOLUME}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  postLeadershipDeflectionCount(params) {
    validate(analytics.leadershipDeflectionCount, params);

    const body = {
      internalUser: params.internalUser ?? 'all',
      from: params.from,
      to: params.to
    };
    if (params.tenantId !== undefined && params.tenantId !== null && String(params.tenantId).trim() !== '') {
      body.tenantId = params.tenantId;
    }
    if (params.ecoId) {
      body.ecoId = params.ecoId;
      body.uid = null;
    } else {
      body.uid = params.uid;
      body.ecoId = null;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.LEADERSHIP_DEFLECTION_COUNT}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  postLeadershipDeflectionCostSavingsDownload(params) {
    validate(analytics.leadershipDeflectionCostSavingsDownload, params);

    const body = {
      internalUser: params.internalUser ?? 'all',
      from: params.from,
      to: params.to,
      costPerCase: params.costPerCase,
      csv: params.csv,
      sendToEmail: params.sendToEmail ?? 0
    };
    if (params.tenantId !== undefined && params.tenantId !== null && String(params.tenantId).trim() !== '') {
      body.tenantId = params.tenantId;
    }
    if (params.email !== undefined) {
      body.email = params.email;
    }
    if (params.ecoId) {
      body.ecoId = params.ecoId;
      body.uid = null;
    } else {
      body.uid = params.uid;
      body.ecoId = null;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.LEADERSHIP_DEFLECTION_COST_SAVINGS_DOWNLOAD}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  postLeadershipGetContentSources(params) {
    validate(analytics.leadershipGetContentSources, params);

    const body = {};
    if (params.tenantId !== undefined && params.tenantId !== null && String(params.tenantId).trim() !== '') {
      body.tenantId = params.tenantId;
    }
    if (params.csTypes !== undefined && params.csTypes !== null) {
      body.csTypes = params.csTypes;
    }

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.LEADERSHIP_GET_CONTENT_SOURCES}`,
      data: JSON.stringify(body)
    }, this.#authObj);
  }

  postClicksCountContentSource(params) {
    validate(analytics.conversionClicksCountContentSource, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${ANALYTICS.CLICKS_COUNT_CONTENT_SOURCE}`,
      data: JSON.stringify(params)
    }, this.#authObj);
  }
}

module.exports = {
  Analytics
};
