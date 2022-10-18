const qs = require('qs');
const { ANALYTICS } = require("../../utils/su-apis");
const { AUTHENTICATION } = require("../../utils/constants");
const { HttpRequest } = require("../../utils/request-handler");
const validation = require("../../validations");
const { getAuthHeader } = require("../../utils/auth-type");
const { validateClient } = require("../../validations/client/start-client-validation");

const getTilesData = async (params) => {
    const isValid = validation.analytics.similarValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        from: isValid.value.startDate,
        to: isValid.value.endDate,
        uid: isValid.value.searchClientId
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.TILE_DATA}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getSearchSummaryChart = async (params) => {
    const isValid = validation.analytics.similarValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        from: isValid.value.startDate,
        to: isValid.value.endDate,
        uid: isValid.value.searchClientId
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SUMMARY_CHART_DATA}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getAllSearchQuery = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    });

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.ALL_SEARCH_QUERY}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const searchQueryWithResult = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCHQUERY_WITH_RESULT}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const searchQueryWithNoClicks = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCHQUERY_WITH_NO_CLICKS}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const searchQueryWithoutResults = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCHQUERY_WITHOUT_RESULT}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const searchQueryHistogram = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCHQUERY_HISTOGRAM}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const missedQueryHistogram = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.MISSED_QUERY_HISTOGRAM}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const searchSessionByCaseUidAuth = async (params) => {
    const isValid = validation.analytics.searchSessionByCaseUidValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        caseUid: isValid.value.caseUid
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCH_SESSION_BY_CASE_UID_AUTH}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getAllSearchConversion = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.ALL_SEARCH_CONVERSION}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const searchConversionNotOnFirstPage = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCH_CONVERSION_NOT_FIRST_PAGE}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const searchConversionWithFilters = async (params) => {
    const isValid = validation.analytics.searchConversionWithFiltersValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate
    })

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCH_CONVERSION_WITH_FILTERS}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const searchConversionBySessionId = async (params) => {
    const isValid = validation.analytics.searchConversionBySessionIdValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCH_CONVERSION_BY_SESSION_ID}/${isValid.value.sessionId}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const discussionsReadyToBecomeArticles = async (params) => {
    const isValid = validation.analytics.discussionsReadyToBecomeArticlesValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        internalUser: isValid.value.internalUser
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.DISCUSSION_READY_TO_BECOM_ARTICLE}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getCaseCreatedArticles = async (params) => {
    const isValid = validation.analytics.caseArticlesValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        from: isValid.value.startDate,
        to: isValid.value.endDate,
        internalUser: isValid.value.internalUser,
        searchType: isValid.value.searchType,
        uid: isValid.value.searchClientId,
        offset: isValid.value.offset,
        limit: isValid.value.count,
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.ARTICLE_CREATED_CASES}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getCaseDeflectedArticles = async (params) => {
    const isValid = validation.analytics.caseArticlesValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        from: isValid.value.startDate,
        to: isValid.value.endDate,
        internalUser: isValid.value.internalUser,
        searchType: isValid.value.searchType,
        uid: isValid.value.searchClientId,
        offset: isValid.value.offset,
        limit: isValid.value.count,
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.ARTICLE_DEFLECTED_CASES}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getAttachedArticles = async (params) => {
    const isValid = validation.analytics.attachedArticlesValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        from: isValid.value.startDate,
        to: isValid.value.endDate,
        internalUser: isValid.value.internalUser,
        uid: isValid.value.searchClientId,
        offset: isValid.value.offset,
        limit: isValid.value.count,
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.ATTACHED_ARTICLE}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getAttachedOnCase = async (params) => {
    const isValid = validation.analytics.attachedOnCaseValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        from: isValid.value.startDate,
        to: isValid.value.endDate,
        internalUser: isValid.value.internalUser,
        uid: isValid.value.searchClientId,
        offset: isValid.value.offset,
        limit: isValid.value.count,
        url: isValid.value.url
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.ATTACHED_ON_CASE}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getSearchQueryInSessions = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.ALL_SEARCH_QUERY_WITH_SESSION}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getKcsSupportSearchQuery = async (params) => {
    const isValid = validation.analytics.similarValidationWithCount(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        searchClientId: isValid.value.searchClientId
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.KCS_SUPPORT}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getSearchSessionByCaseUid = async (params) => {
    const isValid = validation.analytics.searchSessionByCaseUidValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        caseUid: isValid.value.caseUid
    })

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCH_SESSION_BY_CASE_UID}`,
        data: payload,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

const getSearchSessionBySearchSessionId = async (params) => {
    const isValid = validation.analytics.searchSessionBySearchSessionIdValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        startDate: isValid.value.startDate,
        endDate: isValid.value.endDate,
        count: isValid.value.count,
        sessionId: isValid.value.sessionId,
        searchClientId: isValid.value.searchClientId,
        pageNumber: isValid.value.pageNumber,
    })

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${ANALYTICS.SEARCH_SESSION_BY_SESSION_ID}/${isValid.value.sessionId}?${queryParams}`,
        headers: { 
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
          }
    }

    let response = await HttpRequest(options);
    return response;
}

module.exports = {
    getTilesData,
    getSearchSummaryChart,
    getAllSearchQuery,
    searchQueryWithResult,
    searchQueryWithNoClicks,
    searchQueryWithoutResults,
    searchQueryHistogram,
    missedQueryHistogram,
    searchSessionByCaseUidAuth,
    getAllSearchConversion,
    searchConversionNotOnFirstPage,
    searchConversionWithFilters,
    searchConversionBySessionId,
    discussionsReadyToBecomeArticles,
    getCaseCreatedArticles,
    getCaseDeflectedArticles,
    getAttachedArticles,
    getAttachedOnCase,
    getSearchQueryInSessions,
    getKcsSupportSearchQuery,
    getSearchSessionByCaseUid,
    getSearchSessionBySearchSessionId
}