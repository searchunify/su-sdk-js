const Joi = require('joi');
const { ANALYTICS_INTERNAL_USERS } = require('../utils/constants');

const userMetricsValidation = {
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsFilters: Joi.alternatives().try(
    Joi.string().trim(),
    Joi.array().items(Joi.string().trim())
  ).optional(),
  userMetricsLimit: Joi.when('userMetricsFlag', {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
  userMetricsOffset: Joi.when('userMetricsFlag', {
    is: true,
    then: Joi.number().required(),
    otherwise: Joi.number().optional(),
  }),
};

const similarValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().uuid().trim(),
  ecoSystemId: Joi.string().trim().optional(),
  tenantId: Joi.string().uuid().trim().optional(),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  /** Ignored by overview POST bodies; allowed for callers (e.g. MCP) that share the same schema. */
  count: Joi.number().min(1).max(500).optional(),
  emailTracking: Joi.boolean().optional(),
  conversionType: Joi.string().optional(),
  ...userMetricsValidation
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const similarValidationWithCount = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  searchClientId: Joi.string().uuid().trim(),
  ecoSystemId: Joi.string().trim().optional(),
  ...userMetricsValidation,
  pageNumber: Joi.number().min(1).optional(),
  sortByField: Joi.string().valid('count').optional(),
  sortType: Joi.string().valid('asc', 'desc').optional(),
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const searchSessionByCaseUidValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().required(),
  caseUid: Joi.string().uuid().trim().required(),
  ecoSystemId: Joi.string().trim().optional()
});

const searchConversionWithFilters = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().trim().optional(),
  ...userMetricsValidation,
});

const searchConversionBySessionId = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  searchClientId: Joi.string().uuid().trim(),
  sessionId: Joi.string().trim().required(),
});

const discussionsReadyToBecomeArticles = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500).required(),
  ...userMetricsValidation,
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const caseArticlesValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  searchType: Joi.string().trim().valid('all', 'global', 'support').required(),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  ...userMetricsValidation,
  ecoSystemId: Joi.string().trim().optional(),
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const attachedArticlesValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  ecoSystemId: Joi.string().trim().optional(),
  ...userMetricsValidation,
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

const attachedOnCaseValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  searchClientId: Joi.string().uuid().trim().required(),
  offset: Joi.number().min(1),
  url: Joi.string().uri().trim().required(),
  ...userMetricsValidation,
}).nand('searchClientId', 'ecoSystemId').messages({
  'object.nand': 'searchClientId and ecoSystemId cannot be used together',
});

/** Same as overview POST validation (getAverageClickPosition uses similarValidation). Kept for backward compatibility. */
const averageClickPositionValidation = similarValidation;

const sessionDetailsValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().uuid().trim().required(),
  count: Joi.number().min(1).optional(),
  sessionId: Joi.string().trim().optional(),
  startIndex: Joi.number().min(1).optional(),
  sortByField: Joi.string()
    .valid('search', 'click', 'support', 'case', 'page_view', 'end_date', 'start_date')
    .optional(),
  sortType: Joi.string().valid('asc', 'desc').optional(),
});

const sessionListTableValidation = Joi.object()
  .keys({
    startDate: Joi.string().trim().required(),
    endDate: Joi.string().trim().required(),
    searchClientId: Joi.string().uuid().trim().optional(),
    ecoSystemId: Joi.string().uuid().trim().optional(),
    count: Joi.number().min(1).max(500).required(),
    sessionId: Joi.string().trim().optional(),
    startIndex: Joi.number().min(1).optional(),
    sortByField: Joi.string()
      .valid('search', 'click', 'support', 'case', 'page_view', 'end_date', 'start_date')
      .optional(),
    sortType: Joi.string().valid('asc', 'desc').optional(),
    tenantId: Joi.string().uuid().trim().optional(),
    internalUser: Joi.alternatives()
      .try(
        Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
        Joi.boolean()
      )
      .optional(),
    searchFilter: Joi.string().valid('yes', 'no', 'all').optional(),
    clickFilter: Joi.string().valid('yes', 'no', 'all').optional(),
    caseFilter: Joi.string().valid('yes', 'no', 'all').optional(),
    articleFilter: Joi.string().valid('yes', 'no', 'all').optional(),
  })
  .xor('searchClientId', 'ecoSystemId');

const searchSessionBySSIdValidation = Joi.object().keys({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  count: Joi.number().min(1).max(500),
  sessionId: Joi.string().trim(),
  searchClientId: Joi.string().uuid().trim().required(),
  pageNumber: Joi.number().min(1),
});

/** POST /api/v2/conversion/caseDeflectionStage1 — same core fields as analytics session validators (from/to). */
const conversionCaseDeflectionStage1 = Joi.object({
  from: Joi.string().trim().required(),
  to: Joi.string().trim().required(),
  uid: Joi.alternatives().try(Joi.string().valid('all'), Joi.string().uuid().trim()).optional(),
  ecoId: Joi.string().uuid().trim().optional().allow(null, ''),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  emailTracking: Joi.boolean().optional(),
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsFilters: Joi.alternatives().try(Joi.string().trim(), Joi.array().items(Joi.string().trim())).optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional(),
  /** Required by analytics `validator` on POST /api/v2/conversion/* when not proxied through admin (admin injects tenant-id). */
  tenantId: Joi.string().uuid().trim().optional()
}).custom((value, helpers) => {
  const hasUid =
    value.uid !== undefined && value.uid !== null && value.uid !== '';
  const hasEco =
    value.ecoId !== undefined &&
    value.ecoId !== null &&
    String(value.ecoId).trim() !== '';
  if (hasUid && hasEco) {
    return helpers.error('any.invalid');
  }
  return value;
});

/** POST /api/v2/conversion/caseDeflectionStage2 — same body shape as stage1. */
const conversionCaseDeflectionStage2 = conversionCaseDeflectionStage1;

/** POST /api/v2/conversion/caseDeflectionTrends — filterValue required; tenantId optional (omit when caller does not send it). */
const conversionCaseDeflectionTrends = conversionCaseDeflectionStage1.keys({
  filterValue: Joi.string().valid('cumulative', 'stage1', 'stage2').required(),
  trueDeflection: Joi.boolean().optional()
});

/** POST /api/v2/conversion/conversionSummary */
const conversionConversionSummary = Joi.object({
  from: Joi.string().trim().required(),
  to: Joi.string().trim().required(),
  tenantId: Joi.string().uuid().trim().optional(),
  uid: Joi.alternatives().try(Joi.string().valid('all'), Joi.string().uuid().trim()).optional(),
  ecoId: Joi.string().uuid().trim().optional().allow(null, ''),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  limit: Joi.number().min(1).max(500).optional(),
  offset: Joi.number().min(1).optional(),
  userMetricsFlag: Joi.boolean().optional(),
  userMetricsFilters: Joi.alternatives().try(Joi.string().trim(), Joi.array().items(Joi.string().trim())).optional(),
  userMetricsLimit: Joi.number().optional(),
  userMetricsOffset: Joi.number().optional()
}).custom((value, helpers) => {
  const hasEco =
    value.ecoId !== undefined &&
    value.ecoId !== null &&
    String(value.ecoId).trim() !== '';
  const hasUid =
    value.uid !== undefined && value.uid !== null && value.uid !== '';
  if (hasUid && hasEco) {
    return helpers.error('any.invalid');
  }
  if (!hasUid && !hasEco) {
    return helpers.error('any.invalid');
  }
  return value;
});

/** POST /api/v2/leadership/deflection-count (legacy POST /leadership/deflection-count unchanged on analytics) */
const leadershipDeflectionCount = Joi.object({
  tenantId: Joi.string().uuid().trim().optional(),
  uid: Joi.string().uuid().trim().optional().allow(null, ''),
  ecoId: Joi.string().uuid().trim().optional().allow(null, ''),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  from: Joi.string().trim().optional().allow(null, ''),
  to: Joi.string().trim().optional().allow(null, '')
}).custom((value, helpers) => {
  const hasUid = value.uid && typeof value.uid === 'string' && value.uid.length > 0;
  const hasEco =
    value.ecoId && typeof value.ecoId === 'string' && String(value.ecoId).trim().length > 0;
  if (hasUid && hasEco) {
    return helpers.error('any.invalid');
  }
  if (!hasUid && !hasEco) {
    return helpers.error('any.invalid');
  }
  return value;
});

/** POST /api/v2/leadership/deflection-cost-savings-download */
const leadershipDeflectionCostSavingsDownload = leadershipDeflectionCount.keys({
  costPerCase: Joi.number().positive().required(),
  csv: Joi.alternatives()
    .try(Joi.number().valid(0, 1, 4), Joi.string().valid('0', '1', '4'))
    .required(),
  sendToEmail: Joi.alternatives()
    .try(Joi.number().valid(0, 1), Joi.string().valid('0', '1'))
    .optional(),
  email: Joi.string().trim().email().optional()
});

/** POST /api/v2/conversion/current-relevance-index and relevance-index drill-down. */
const conversionRelevanceIndex = Joi.object({
  uid: Joi.string().uuid().trim().required(),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  from: Joi.string().trim().optional().allow(null, ''),
  to: Joi.string().trim().optional().allow(null, '')
});

/** POST /api/v2/leadership/get-content-sources — un-archived content sources for facet discovery. */
const leadershipGetContentSources = Joi.object({
  tenantId: Joi.string().uuid().trim().optional(),
  csTypes: Joi.array().items(Joi.string().trim()).optional()
});

/** POST /api/v2/conversion/clicksCountContentSource — same scope shape as caseDeflectionStage1 (uid xor ecoId). */
const conversionClicksCountContentSource = conversionCaseDeflectionStage1;

/** POST /api/v2/conversion/sessionDetails — session tracking detail grid (admin Conversions). */
const conversionSessionDetailsPost = conversionCaseDeflectionStage1.keys({
  keyword: Joi.string().allow('').optional(),
  searchingType: Joi.string().optional(),
  exactSearch: Joi.alternatives().try(Joi.boolean(), Joi.number(), Joi.string()).optional(),
  offset: Joi.number().optional(),
  limit: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
  searchFilter: Joi.string().optional(),
  clickFilter: Joi.string().optional(),
  supportFilter: Joi.string().optional(),
  caseFilter: Joi.string().optional(),
  articleFilter: Joi.string().optional(),
  sortByField: Joi.string().optional(),
  sortType: Joi.string().valid('asc', 'desc').optional(),
  globalSearchfilter: Joi.any().optional(),
  globalConversion: Joi.any().optional(),
  supportSearchFilter: Joi.any().optional(),
  supportConversonfilter: Joi.any().optional(),
  contentFacetsFilter: Joi.any().optional(),
  searchActivityType: Joi.string().optional()
});

/** POST /api/v2/conversion/topClickedDocs, topSearchesWithClicks, discussions — paginated conversion tables. */
const conversionPaginatedTablePost = conversionCaseDeflectionStage1.keys({
  limit: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
  offset: Joi.number().optional(),
  terminateQueryLogic: Joi.boolean().optional()
});

/** POST /api/v2/conversion/searchesOnClick — search keywords for clicks on one document (`url` from topClickedDocs). */
const conversionSearchesOnClickPost = conversionCaseDeflectionStage1.keys({
  url: Joi.string().trim().required()
});

/** POST /api/v2/conversion/clickedResults — documents clicked for one search phrase (admin `text_entered`). */
const conversionClickedResultsPost = conversionCaseDeflectionStage1.keys({
  text_entered: Joi.string().trim().min(1).required()
});

/** Base POST body for /api/v2/content/* and /api/v2/overview/search* content-gap routes. */
const contentGapPostBase = conversionCaseDeflectionStage1.keys({
  searchQuery: Joi.string().allow('').optional(),
  sortingField: Joi.string().optional(),
  sortType: Joi.string().valid('asc', 'desc').optional(),
  offset: Joi.number().optional(),
  limit: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
  searchGrouping: Joi.boolean().optional(),
  actionStatusFilters: Joi.array().items(Joi.string()).optional(),
  text: Joi.string().allow('').optional(),
  orderBy: Joi.string().valid('ASC', 'DESC').optional(),
  articleTitleSearchQuery: Joi.string().allow('').optional(),
  caseSubjectSearchQuery: Joi.string().allow('').optional(),
  searchText: Joi.string().allow('').optional(),
  cookie: Joi.string().allow('').optional(),
  emailId: Joi.string().allow('').optional()
});

/** POST /api/v2/content/tileDataContent and splitTileDataContent (eco only for split). */
const contentTileDataPost = conversionCaseDeflectionStage1;
const contentSplitTileDataPost = conversionCaseDeflectionStage1.keys({
  ecoId: Joi.string().uuid().trim().required()
});

/** POST /api/v2/content/unSuccessfulSummaryChart and unSuccessfulSearchSessionChart. */
const contentUnsuccessfulChartsPost = conversionCaseDeflectionStage1;

/** Search Classifications main tables. */
const contentSearchesWithNoClicksPost = contentGapPostBase;
const contentSearchesWithNoResultPost = contentGapPostBase;

/** POST /api/v2/overview/topSearches (all / top searches grid) and /overview/searchSessions (successful searches) — same body as search-classification table posts. */
const overviewTopSearchesPost = contentGapPostBase;
const overviewSearchSessionsPost = contentGapPostBase;

/** Search Classifications successive drill-downs. */
const contentSuccessiveNoClicksPost = contentGapPostBase.keys({
  text: Joi.string().trim().min(1).required()
});
const contentSuccessiveNoResultsPost = contentGapPostBase.keys({
  text: Joi.string().trim().min(1).required()
});

/** High Conversion report and sub-reports. */
const contentHighConversionPost = contentGapPostBase;
const contentHighConversionClicksPost = contentGapPostBase.keys({
  searchText: Joi.string().trim().min(1).required()
});
const contentHighConversionSessionsPost = contentGapPostBase.keys({
  searchText: Joi.string().trim().min(1).required()
});

/** Article Usage By Agents report and sub-report. */
const contentArticleUsageByAgentsPost = contentGapPostBase.keys({
  orderBy: Joi.string().valid('ASC', 'DESC').optional(),
  searchQuery: Joi.string().allow('').optional()
});
const contentSuccessiveArticlesUsagePost = contentGapPostBase.keys({
  text: Joi.string().trim().min(1).required(),
  orderBy: Joi.string().valid('ASC', 'DESC').optional(),
  articleTitleSearchQuery: Joi.string().allow('').optional(),
  caseSubjectSearchQuery: Joi.string().allow('').optional()
});

/** POST /api/v2/conversion/searchesCreatedCase — Unsuccessful deflection: search keywords for one clicked article URL. */
const conversionSearchesCreatedCasePost = conversionCaseDeflectionStage1.keys({
  url: Joi.string().trim().required(),
  searchType: Joi.string().trim().required(),
  terminateQueryLogic: Joi.boolean().optional()
});

/** POST /api/v2/conversion/searchesOnDeflection — Successful deflection: search keywords for one clicked article URL. */
const conversionSearchesOnDeflectionPost = conversionCaseDeflectionStage1.keys({
  url: Joi.string().trim().required(),
  searchType: Joi.string().trim().required(),
  terminateQueryLogic: Joi.boolean().optional()
});

/** POST /api/v2/conversion/articlesCreatedCasesSessions — session rows for an article (admin `caseDeflaction` typo). */
const conversionArticlesCreatedCasesSessionsPost = conversionCaseDeflectionStage1.keys({
  url: Joi.string().trim().required(),
  searchType: Joi.string().trim().required(),
  offset: Joi.number().optional(),
  limit: Joi.alternatives().try(Joi.number(), Joi.string()).optional(),
  caseDeflaction: Joi.boolean().required()
});

/** POST /api/v2/conversion/linkSharing — Share results analytics. */
const conversionLinkSharingPost = conversionCaseDeflectionStage1.keys({
  limit: Joi.number().optional(),
  offset: Joi.number().optional(),
  modeselectInsideResults: Joi.any().optional(),
  caseNumberText: Joi.string().allow('').optional(),
  linkedByText: Joi.string().allow('').optional()
});

/** GET /api/v2/getSessionTrackingFormattedResult — formatted session tracking (admin). */
const sessionTrackingFormattedValidation = Joi.object({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().uuid().trim().optional(),
  ecoSystemId: Joi.string().uuid().trim().optional(),
  count: Joi.number().min(1).max(500).optional(),
  startIndex: Joi.number().min(1).optional(),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  sortByField: Joi.string().optional(),
  sortType: Joi.string().valid('asc', 'desc').optional()
}).xor('searchClientId', 'ecoSystemId');

/** POST /api/v2/leadership/unassisted-self-solve-volume and assisted-self-solve-volume. */
/** POST /api/v2/overview/searchClickPosition — MCP mirror; tenantId omitted on wire when not set. */
const overviewSearchClickPosition = similarValidation.keys({
  searchQuery: Joi.string().allow('').optional(),
  sortingField: Joi.string().optional(),
  sortType: Joi.string().valid('asc', 'desc').optional(),
  pageNumber: Joi.number().min(1).max(500).optional()
});

/** POST /api/v2/overview/createdCases */
const overviewCreatedCases = similarValidation.keys({
  caseUid: Joi.string().allow('').optional(),
  caseSubject: Joi.string().allow('').optional(),
  sessionCookie: Joi.string().allow('').optional(),
  emailId: Joi.string().allow('').optional(),
  pageNumber: Joi.number().min(1).max(500).optional(),
  isAscending: Joi.boolean().optional()
});

/** POST /api/v2/overview/pageRating — body uses `limit` / `offset` (row skip); MCP/SDK may pass pageNumber + count. */
const overviewPageRating = similarValidation.keys({
  pageNumber: Joi.number().min(1).max(500).optional()
});

/** POST /api/v2/overview/searchFeedback */
const overviewSearchFeedback = similarValidation.keys({
  pageNumber: Joi.number().min(1).max(500).optional()
});

/** POST /api/v2/overview/advertisements */
const overviewAdvertisements = similarValidation.keys({
  searchKey: Joi.string().allow('').optional(),
  advertisementSortType: Joi.string().optional(),
  pageNumber: Joi.number().min(1).max(500).optional()
});

/** POST /api/v2/overview/readAnswers | citationClicks | copiedAnswers — User Engagement grids (offset = 1-based page). */
const overviewUserEngagementGrid = similarValidation.keys({
  pageNumber: Joi.number().min(1).max(500).optional(),
  searchQuery: Joi.string().allow('').optional()
});

/** POST /api/v2/overview/user-engagement-trends — Engagement Trends (not download). */
const overviewUserEngagementTrends = Joi.object({
  startDate: Joi.string().trim().optional().allow('', null),
  endDate: Joi.string().trim().optional().allow('', null),
  searchClientId: Joi.string().uuid().trim().optional(),
  ecoSystemId: Joi.string().trim().optional(),
  tenantId: Joi.string().uuid().trim().optional(),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  filterType: Joi.string().valid('monthly', 'quarterly', 'weekly', 'daily').optional(),
  ...userMetricsValidation
})
  .nand('searchClientId', 'ecoSystemId')
  .messages({
    'object.nand': 'searchClientId and ecoSystemId cannot be used together'
  })
  .custom((value, helpers) => {
    const f = String(value.filterType || 'monthly').toLowerCase();
    const hasFrom = value.startDate && String(value.startDate).trim();
    const hasTo = value.endDate && String(value.endDate).trim();
    if ((f === 'weekly' || f === 'daily') && (!hasFrom || !hasTo)) {
      return helpers.error('any.invalid');
    }
    return value;
  });

/** POST /api/v2/llm/llm-response-feedback */
const llmResponseFeedbackOverview = Joi.object({
  startDate: Joi.string().trim().required(),
  endDate: Joi.string().trim().required(),
  searchClientId: Joi.string().uuid().trim().required(),
  count: Joi.number().min(1).max(500).optional(),
  pageNumber: Joi.number().min(1).max(500).optional(),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  searchQuery: Joi.string().allow('').optional(),
  reactionFilterType: Joi.alternatives()
    .try(Joi.string().valid('all', 'true', 'false', '0', '1'), Joi.boolean())
    .optional()
});

const leadershipSelfSolveVolume = Joi.object({
  uid: Joi.string().uuid().trim().optional().allow(null, ''),
  ecoId: Joi.string().uuid().trim().optional().allow(null, ''),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  from: Joi.string().trim().optional().allow(null, ''),
  to: Joi.string().trim().optional().allow(null, ''),
  directlyViewSetting: Joi.boolean().optional()
}).custom((value, helpers) => {
  const hasUid = value.uid && typeof value.uid === 'string' && value.uid.length > 0;
  const hasEco =
    value.ecoId && typeof value.ecoId === 'string' && value.ecoId.length > 0;
  if (hasUid && hasEco) {
    return helpers.error('any.invalid');
  }
  if (!hasUid && !hasEco) {
    return helpers.error('any.invalid');
  }
  return value;
});

/** POST /api/v2/leadership/assisted-case-volume — tenant-scoped rollup; uid/ecoId not required on this route. `indexName` is required. */
const leadershipAssistedCaseVolume = Joi.object({
  tenantId: Joi.string().uuid().trim().optional(),
  indexName: Joi.string().trim().required(),
  internalUser: Joi.alternatives()
    .try(
      Joi.string().valid('all', 'internal', 'external', 'externalOnly'),
      Joi.boolean()
    )
    .optional(),
  from: Joi.string().trim().optional().allow(null, ''),
  to: Joi.string().trim().optional().allow(null, '')
});

module.exports = {
  similarValidation,
  similarValidationWithCount,
  searchSessionByCaseUidValidation,
  searchConversionWithFilters,
  searchConversionBySessionId,
  discussionsReadyToBecomeArticles,
  caseArticlesValidation,
  attachedArticlesValidation,
  attachedOnCaseValidation,
  searchSessionBySSIdValidation,
  averageClickPositionValidation,
  sessionDetailsValidation,
  sessionListTableValidation,
  conversionCaseDeflectionStage1,
  conversionCaseDeflectionStage2,
  conversionCaseDeflectionTrends,
  conversionConversionSummary,
  conversionRelevanceIndex,
  leadershipSelfSolveVolume,
  leadershipAssistedCaseVolume,
  leadershipDeflectionCount,
  leadershipDeflectionCostSavingsDownload,
  leadershipGetContentSources,
  conversionClicksCountContentSource,
  conversionSessionDetailsPost,
  conversionPaginatedTablePost,
  conversionSearchesOnClickPost,
  conversionClickedResultsPost,
  contentTileDataPost,
  contentSplitTileDataPost,
  contentUnsuccessfulChartsPost,
  contentSearchesWithNoClicksPost,
  overviewTopSearchesPost,
  overviewSearchSessionsPost,
  contentSuccessiveNoClicksPost,
  contentSearchesWithNoResultPost,
  contentSuccessiveNoResultsPost,
  contentHighConversionPost,
  contentHighConversionClicksPost,
  contentHighConversionSessionsPost,
  contentArticleUsageByAgentsPost,
  contentSuccessiveArticlesUsagePost,
  conversionSearchesCreatedCasePost,
  conversionSearchesOnDeflectionPost,
  conversionArticlesCreatedCasesSessionsPost,
  conversionLinkSharingPost,
  sessionTrackingFormattedValidation,
  overviewSearchClickPosition,
  overviewCreatedCases,
  overviewPageRating,
  overviewSearchFeedback,
  overviewAdvertisements,
  overviewUserEngagementGrid,
  overviewUserEngagementTrends,
  llmResponseFeedbackOverview
};
