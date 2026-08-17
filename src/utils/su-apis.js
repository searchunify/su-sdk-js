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
  ARTICLE_CREATED_CASES_SESSIONS: '/api/v2/conversion/articlesCreatedCasesSessions',
  SEARCHES_CREATED_CASE: '/api/v2/conversion/searchesCreatedCase',
  ARTICLE_DEFLECTED_CASES: '/api/v2/conversion/articlesDeflectedCase',
  SEARCHES_ON_DEFLECTION: '/api/v2/conversion/searchesOnDeflection',
  ATTACHED_ARTICLE: '/api/v2/conversion/attachedArticles',
  ATTACHED_ON_CASE: '/api/v2/conversion/attachedOnCase',
  AVERAGE_CLICK_POSITION: '/api/v2/overview/averageClickPositionChart',
  OVERVIEW_SEARCH_CLICK_POSITION: '/api/v2/overview/searchClickPosition',
  OVERVIEW_CREATED_CASES: '/api/v2/overview/createdCases',
  OVERVIEW_FEATURED_SNIPPET: '/api/v2/overview/featuredSnippet',
  OVERVIEW_KNOWLEDGE_TITLE: '/api/v2/overview/knowledgeTitle',
  OVERVIEW_PAGE_RATING: '/api/v2/overview/pageRating',
  OVERVIEW_SEARCH_FEEDBACK: '/api/v2/overview/searchFeedback',
  OVERVIEW_ADVERTISEMENTS: '/api/v2/overview/advertisements',
  /** SearchUnifyGPT User Engagement report (read / citation / copied tabs; not CSV download). */
  OVERVIEW_READ_ANSWERS: '/api/v2/overview/readAnswers',
  OVERVIEW_CITATION_CLICKS: '/api/v2/overview/citationClicks',
  OVERVIEW_COPIED_ANSWERS: '/api/v2/overview/copiedAnswers',
  OVERVIEW_USER_ENGAGEMENT_TRENDS: '/api/v2/overview/user-engagement-trends',
  LLM_RESPONSE_FEEDBACK: '/api/v2/llm/llm-response-feedback',
  TILE_DATA_CONTENT: '/api/v2/content/tileDataContent',
  SPLIT_TILE_DATA_CONTENT: '/api/v2/content/splitTileDataContent',
  UNSUCCESSFUL_SUMMARY_CHART: '/api/v2/content/unSuccessfulSummaryChart',
  SEARCHS_WITH_NO_CLICKS: '/api/v2/overview/searchsWithNoClicks',
  SUCCESSIVE_NO_CLICKS: '/api/v2/content/succesiveNoClicks',
  SEARCHES_WITH_NO_RESULT: '/api/v2/overview/searchesWithNoResult',
  SUCCESSIVE_NO_RESULTS: '/api/v2/content/succesiveNoResults',
  UNSUCCESSFUL_SEARCH_SESSION_CHART: '/api/v2/content/unSuccessfulSearchSessionChart',
  HIGH_CONVERSION: '/api/v2/content/highConversion',
  HIGH_CONVERSION_CLICKS: '/api/v2/content/highConversionClicks',
  HIGH_CONVERSION_SESSIONS: '/api/v2/content/highConversionSessions',
  ARTICLE_USAGE_BY_AGENTS: '/api/v2/content/articleUsageByAgents',
  SUCCESSIVE_ARTICLES_USAGE: '/api/v2/content/successiveArticlesUsage',
  TILE_DATA_METRICS_1: '/api/v2/overview/tileDataMetrics1',
  TILE_DATA_METRICS_2: '/api/v2/overview/tileDataMetrics2',
  // Overview Search Report: "all searches" / "top searches" vs "successful searches" (not Conversions Top Clicked Searches).
  OVERVIEW_TOP_SEARCHES: '/api/v2/overview/topSearches',
  OVERVIEW_SEARCH_SESSIONS: '/api/v2/overview/searchSessions',
  SESSION_LOG: '/api/v2/session/log/all',
  SESSION_LIST_TABLE: '/api/v2/session/list/table',
  CASE_DEFLECTION_STAGE_1: '/api/v2/conversion/caseDeflectionStage1',
  CASE_DEFLECTION_STAGE_2: '/api/v2/conversion/caseDeflectionStage2',
  CASE_DEFLECTION_TRENDS: '/api/v2/conversion/caseDeflectionTrends',
  CONVERSION_SUMMARY: '/api/v2/conversion/conversionSummary',
  CURRENT_RELEVANCE_INDEX: '/api/v2/conversion/current-relevance-index',
  RELEVANCE_INDEX: '/api/v2/conversion/relevance-index',
  LEADERSHIP_UNASSISTED_SELF_SOLVE_VOLUME: '/api/v2/leadership/unassisted-self-solve-volume',
  LEADERSHIP_ASSISTED_SELF_SOLVE_VOLUME: '/api/v2/leadership/assisted-self-solve-volume',
  LEADERSHIP_ASSISTED_CASE_VOLUME: '/api/v2/leadership/assisted-case-volume',
  LEADERSHIP_DEFLECTION_COUNT: '/api/v2/leadership/deflection-count',
  LEADERSHIP_DEFLECTION_COST_SAVINGS_DOWNLOAD: '/api/v2/leadership/deflection-cost-savings-download',
  LEADERSHIP_GET_CONTENT_SOURCES: '/api/v2/leadership/get-content-sources',
  CLICKS_COUNT_CONTENT_SOURCE: '/api/v2/conversion/clicksCountContentSource',
  CONVERSION_SESSION_DETAILS: '/api/v2/conversion/sessionDetails',
  CONVERSION_TOP_CLICKED_DOCS: '/api/v2/conversion/topClickedDocs',
  CONVERSION_SEARCHES_ON_CLICK: '/api/v2/conversion/searchesOnClick',
  CONVERSION_TOP_SEARCHES_WITH_CLICKS: '/api/v2/conversion/topSearchesWithClicks',
  CONVERSION_CLICKED_RESULTS: '/api/v2/conversion/clickedResults',
  CONVERSION_LINK_SHARING: '/api/v2/conversion/linkSharing',
  CONVERSION_DISCUSSIONS: '/api/v2/conversion/discussions',
  SESSION_TRACKING_FORMATTED: '/api/v2/getSessionTrackingFormattedResult'
};

exports.AUTH_API = {
  TOKEN: '/oauth/token'
};

exports.SEARCH_API = {
  SEARCH: '/api/v2_search/searchResults',
  GPT_RESULTS: '/api/v2_gpt/gptResults'
};

exports.CONTENT_API = {
  CONTENT_SOURCES: '/api/v2_cs/contentSource/all',
  CONTENT_SOURCES_BY_ID: '/api/v2_cs/contentSource',
  OBJECT_AND_FIELDS: '/api/v2_cs/contentSource/<contentSourceId>/objectAndFields',
  OBJECT_DATA: '/api/v2_cs/apiData/contentSource/<contentSourceId>/object/<objectId>/get',
  OBJECT_DATA_WITH_ID: '/api/v2_cs/apiData/contentSource/<contentSourceId>/object/<objectId>/document/<documentId>/get',
  UPDATE_DOC_BY_ID: '/api/v2_cs/apiData/contentSource/<contentSourceId>/object/<objectId>/document/<documentId>/update',
  BATCH_UPLOAD: '/api/v2_cs/apiData/contentSource/<contentSourceId>/object/<objectId>/bulkUpload',
  SEARCH_CLIENTS: '/api/v2/search-clients'
};

/**
 * Agentic Suite Analytics - Case QA & Agent Scorecards.
 * Gateway (agentic-suite-admin-server) forwards these 1:1 to agentic-suite-analytics's own
 * /api/v1/case-qa/... and /api/v1/human-managers-teams-agents/... paths.
 */
exports.CASE_QA_API = {
  FILTERS: '/api/v1/agentic-analytics/api/v1/case-qa/overview/filters',
  METRICS: '/api/v1/agentic-analytics/api/v1/case-qa/overview/metrics',
  CASE_DETAILS: '/api/v1/agentic-analytics/api/v1/case-qa/overview/case-details',
  CASE_DETAIL: '/api/v1/agentic-analytics/api/v1/case-qa/overview/<caseId>/detail',
  INSIGHTS: '/api/v1/agentic-analytics/api/v1/case-qa/overview/cqa-insights',
  AGENT_SCORE_CARD_METRICS: '/api/v1/agentic-analytics/api/v1/case-qa/agent-score-card/metrics',
  MY_SCORE_CARD: '/api/v1/agentic-analytics/api/v1/human-managers-teams-agents/my-score-card',
  MY_SCORE_CARD_DETAILS: '/api/v1/agentic-analytics/api/v1/human-managers-teams-agents/my-score-card/details'
};

/**
 * Agentic Suite Analytics - Support Agent (bot/conversation) Analytics.
 * Gateway forwards these 1:1 to agentic-suite-analytics's /api/v1/analytics/support-agent/...
 */
exports.SUPPORT_AGENT_API = {
  AGENTS: '/api/v1/agentic-analytics/api/v1/analytics/support-agent/agents',
  KPIS: '/api/v1/agentic-analytics/api/v1/analytics/support-agent/kpis',
  TRENDS_VOLUME_OUTCOME: '/api/v1/agentic-analytics/api/v1/analytics/support-agent/trends/volume-outcome',
  TRENDS_DURATION: '/api/v1/agentic-analytics/api/v1/analytics/support-agent/trends/duration',
  TRENDS_CSAT: '/api/v1/agentic-analytics/api/v1/analytics/support-agent/trends/csat',
  OUTCOME_DISTRIBUTION: '/api/v1/agentic-analytics/api/v1/analytics/support-agent/outcome-distribution',
  SANKEY: '/api/v1/agentic-analytics/api/v1/analytics/support-agent/sankey',
  SESSIONS: '/api/v1/agentic-analytics/api/v1/analytics/support-agent/sessions',
  SESSION_TRANSCRIPT: '/api/v1/agentic-analytics/api/v1/analytics/support-agent/sessions/<sessionId>/transcript'
};

/**
 * Agentic Suite Analytics - Agent Partner Analytics (self-service partner reporting suite).
 * Gateway forwards these 1:1 to agentic-suite-analytics's /api/v1/agent-partner/...
 */
exports.AGENT_PARTNER_API = {
  SEARCH_CLIENTS: '/api/v1/agentic-analytics/api/v1/agent-partner/search-clients',
  ADOPTION_CONTENT_SOURCES: '/api/v1/agentic-analytics/api/v1/agent-partner/adoption/content-sources',
  OVERVIEW_TILE_DATA: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/tile-data',
  OVERVIEW_AGENT_ENGAGEMENT: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/agent-engagement',
  OVERVIEW_AGENT_ENGAGEMENT_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/agent-engagement/export',
  OVERVIEW_MTTR_REPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/mttr-report',
  OVERVIEW_MTTR_REPORT_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/mttr-report/export',
  OVERVIEW_AGENT_WISE_REPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/agent-wise-report',
  OVERVIEW_AGENT_WISE_REPORT_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/agent-wise-report/export',
  TAG_TRENDS_SPIKE_WATCHLIST: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/tag-trends/spike-watchlist',
  TAG_TRENDS_SPIKE_WATCHLIST_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/tag-trends/spike-watchlist/export',
  TAG_TRENDS_FREQUENCY: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/tag-trends/frequency',
  TAG_TRENDS_FREQUENCY_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/tag-trends/frequency/export',
  TAG_TRENDS_TOP_PAIRS: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/tag-trends/top-pairs',
  TAG_TRENDS_FILTER_AGENTS: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/tag-trends/filters/agents',
  TAG_TRENDS_FILTER_PRODUCTS: '/api/v1/agentic-analytics/api/v1/agent-partner/overview/tag-trends/filters/products',
  ADOPTION_RA_ADOPTION: '/api/v1/agentic-analytics/api/v1/agent-partner/adoption/ra-adoption',
  ADOPTION_RA_ADOPTION_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/adoption/ra-adoption/export',
  ADOPTION_AH_ADOPTION: '/api/v1/agentic-analytics/api/v1/agent-partner/adoption/ah-adoption',
  ADOPTION_AH_ADOPTION_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/adoption/ah-adoption/export',
  ADOPTION_CASE_ESCALATION: '/api/v1/agentic-analytics/api/v1/agent-partner/adoption/case-escalation',
  ADOPTION_CASE_ESCALATION_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/adoption/case-escalation/export',
  ADOPTION_AVERAGE_TTR: '/api/v1/agentic-analytics/api/v1/agent-partner/adoption/average-ttr',
  ADOPTION_AVERAGE_TTR_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/adoption/average-ttr/export',
  FEEDBACK_RESPONSE_FEEDBACK: '/api/v1/agentic-analytics/api/v1/agent-partner/feedback/response-feedback',
  FEEDBACK_RESPONSE_FEEDBACK_DETAILS: '/api/v1/agentic-analytics/api/v1/agent-partner/feedback/response-feedback-details',
  FEEDBACK_FEATURE_TYPES: '/api/v1/agentic-analytics/api/v1/agent-partner/feedback/feature-types',
  FEEDBACK_AGENT_NAMES: '/api/v1/agentic-analytics/api/v1/agent-partner/feedback/agent-names',
  FEEDBACK_EXPORT: '/api/v1/agentic-analytics/api/v1/agent-partner/feedback/export'
};

/**
 * Agentic Suite Analytics - LLM token/cost consumption.
 * Gateway forwards this 1:1 to agentic-suite-analytics's /api/v1/agent-analytics/dashboard.
 */
exports.LLM_USAGE_API = {
  DASHBOARD: '/api/v1/agentic-analytics/api/v1/agent-analytics/dashboard'
};
