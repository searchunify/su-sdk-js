exports.ANALYTICS = {
  TILE_DATA: '/api/v2/searchOverview/getTileData',
  SUMMARY_CHART_DATA: '/api/v2/searchOverview/getSearchSummaryChart',
  ALL_SEARCH_QUERY: '/api/v2/searchQuery/all',
  SEARCHQUERY_WITH_RESULT: '/api/v2/searchQuery/withResults',
  SEARCHQUERY_WITH_NO_CLICKS: '/api/v2/searchQuery/withNoClicks',
  SEARCHQUERY_WITHOUT_RESULT: '/api/v2/searchQuery/withoutResults',
  SEARCHQUERY_HISTOGRAM: '/api/v2/searchQuery/histogram',
  MISSED_QUERY_HISTOGRAM: '/api/v2/searchQuery/missedQueryHistogram',
  SEARCH_SESSION_BY_CASE_UID_AUTH: '/api/v2/searchSession/byCaseUidAuth',
  ALL_SEARCH_CONVERSION: '/api/v2/searchConversion/all',
  SEARCH_CONVERSION_NOT_FIRST_PAGE: '/api/v2/searchConversion/notOnFirstPage',
  SEARCH_CONVERSION_WITH_FILTERS: '/api/v2/searchConversion/withFilters',
  SEARCH_CONVERSION_BY_SESSION_ID: '/api/v2/searchConversion/bySessionsId',
  DISCUSSION_READY_TO_BECOM_ARTICLE: '/api/v2/searchConversion/DiscussionsReadyToBecomeArticles',
  SEARCH_SESSION_BY_SESSION_ID: '/api/v2/searchSession/bySearchSessionId',
  ALL_SEARCH_QUERY_WITH_SESSION: '/api/v2/searchSession/all/searchQuery',
  KCS_SUPPORT: '/api/v2/searchQuery/kcsSupport',
  SEARCH_SESSION_BY_CASE_UID: '/api/v2/searchSession/byCaseUid',
  ARTICLE_CREATED_CASES: '/api/v2/conversion/articlesCreatedCases',
  ARTICLE_DEFLECTED_CASES: '/api/v2/conversion/articlesDeflectedCase',
  ATTACHED_ARTICLE: '/api/v2/conversion/attachedArticles',
  ATTACHED_ON_CASE: '/api/v2/conversion/attachedOnCase'
};

exports.AUTH_API = {
  TOKEN: '/oauth/token'
};

exports.SEARCH_API = {
  SEARCH: '/api/v2_search/searchResults'
};

exports.CONTENT_API = {
  CONTENT_SOURCES: '/api/v2_cs/contentSource/all',
  CONTENT_SOURCES_BY_ID: '/api/v2_cs/contentSource',
  OBJECT_AND_FIELDS: '/api/v2_cs/contentSource/<contentSourceId>/objectAndFields',
  OBJECT_DATA: '/api/v2_cs/apiData/contentSource/<contentSourceId>/object/<objectId>/get',
  OBJECT_DATA_WITH_ID: '/api/v2_cs/apiData/contentSource/<contentSourceId>/object/<objectId>/document/<documentId>/get',
  UPDATE_DOC_BY_ID: '/api/v2_cs/apiData/contentSource/<contentSourceId>/object/<objectId>/document/<documentId>/update',
  BATCH_UPLOAD: '/api/v2_cs/apiData/contentSource/<contentSourceId>/object/<objectId>/bulkUpload'
};
