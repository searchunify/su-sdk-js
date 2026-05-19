const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { Analytics } = require('../src/core/analytics');
const { Content } = require('../src/core/content');
const { SearchClients } = require('../src/core/search-clients');
const { SearchUnifyRestClient } = require('../src/core/su-rest-client');
const analyticsValidation = require('../src/validations/analytics-validation');
const { ANALYTICS, CONTENT_API } = require('../src/utils/su-apis');
const { validate } = require('../src/validations/joi-validator');

// --- API URL constants ---

describe('su-apis URLs', () => {
  it('should have AVERAGE_CLICK_POSITION url', () => {
    assert.equal(ANALYTICS.AVERAGE_CLICK_POSITION, '/api/v2/overview/averageClickPositionChart');
  });

  it('should have SESSION_LOG url', () => {
    assert.equal(ANALYTICS.SESSION_LOG, '/api/v2/session/log/all');
  });

  it('should have SESSION_LIST_TABLE url', () => {
    assert.equal(ANALYTICS.SESSION_LIST_TABLE, '/api/v2/session/list/table');
  });

  it('should have overview MCP mirror urls', () => {
    assert.equal(ANALYTICS.OVERVIEW_SEARCH_CLICK_POSITION, '/api/v2/overview/searchClickPosition');
    assert.equal(ANALYTICS.OVERVIEW_CREATED_CASES, '/api/v2/overview/createdCases');
    assert.equal(ANALYTICS.OVERVIEW_READ_ANSWERS, '/api/v2/overview/readAnswers');
    assert.equal(ANALYTICS.OVERVIEW_CITATION_CLICKS, '/api/v2/overview/citationClicks');
    assert.equal(ANALYTICS.OVERVIEW_COPIED_ANSWERS, '/api/v2/overview/copiedAnswers');
    assert.equal(ANALYTICS.OVERVIEW_USER_ENGAGEMENT_TRENDS, '/api/v2/overview/user-engagement-trends');
    assert.equal(ANALYTICS.LLM_RESPONSE_FEEDBACK, '/api/v2/llm/llm-response-feedback');
  });

  it('should have conversions tab MCP mirror urls', () => {
    assert.equal(ANALYTICS.CONVERSION_SESSION_DETAILS, '/api/v2/conversion/sessionDetails');
    assert.equal(ANALYTICS.CONVERSION_TOP_CLICKED_DOCS, '/api/v2/conversion/topClickedDocs');
    assert.equal(ANALYTICS.CONVERSION_SEARCHES_ON_CLICK, '/api/v2/conversion/searchesOnClick');
    assert.equal(ANALYTICS.CONVERSION_TOP_SEARCHES_WITH_CLICKS, '/api/v2/conversion/topSearchesWithClicks');
    assert.equal(ANALYTICS.CONVERSION_CLICKED_RESULTS, '/api/v2/conversion/clickedResults');
    assert.equal(ANALYTICS.SEARCHES_CREATED_CASE, '/api/v2/conversion/searchesCreatedCase');
    assert.equal(ANALYTICS.SEARCHES_ON_DEFLECTION, '/api/v2/conversion/searchesOnDeflection');
    assert.equal(ANALYTICS.ARTICLE_CREATED_CASES_SESSIONS, '/api/v2/conversion/articlesCreatedCasesSessions');
    assert.equal(ANALYTICS.CONVERSION_LINK_SHARING, '/api/v2/conversion/linkSharing');
    assert.equal(ANALYTICS.CONVERSION_DISCUSSIONS, '/api/v2/conversion/discussions');
    assert.equal(ANALYTICS.SESSION_TRACKING_FORMATTED, '/api/v2/getSessionTrackingFormattedResult');
  });

  it('should have content-gap MCP mirror urls', () => {
    assert.equal(ANALYTICS.SPLIT_TILE_DATA_CONTENT, '/api/v2/content/splitTileDataContent');
    assert.equal(ANALYTICS.UNSUCCESSFUL_SUMMARY_CHART, '/api/v2/content/unSuccessfulSummaryChart');
    assert.equal(ANALYTICS.OVERVIEW_TOP_SEARCHES, '/api/v2/overview/topSearches');
    assert.equal(ANALYTICS.OVERVIEW_SEARCH_SESSIONS, '/api/v2/overview/searchSessions');
    assert.equal(ANALYTICS.SEARCHS_WITH_NO_CLICKS, '/api/v2/overview/searchsWithNoClicks');
    assert.equal(ANALYTICS.SUCCESSIVE_NO_CLICKS, '/api/v2/content/succesiveNoClicks');
    assert.equal(ANALYTICS.SEARCHES_WITH_NO_RESULT, '/api/v2/overview/searchesWithNoResult');
    assert.equal(ANALYTICS.SUCCESSIVE_NO_RESULTS, '/api/v2/content/succesiveNoResults');
    assert.equal(ANALYTICS.UNSUCCESSFUL_SEARCH_SESSION_CHART, '/api/v2/content/unSuccessfulSearchSessionChart');
    assert.equal(ANALYTICS.HIGH_CONVERSION, '/api/v2/content/highConversion');
    assert.equal(ANALYTICS.HIGH_CONVERSION_CLICKS, '/api/v2/content/highConversionClicks');
    assert.equal(ANALYTICS.HIGH_CONVERSION_SESSIONS, '/api/v2/content/highConversionSessions');
    assert.equal(ANALYTICS.ARTICLE_USAGE_BY_AGENTS, '/api/v2/content/articleUsageByAgents');
    assert.equal(ANALYTICS.SUCCESSIVE_ARTICLES_USAGE, '/api/v2/content/successiveArticlesUsage');
  });

  it('should have SEARCH_CLIENTS url', () => {
    assert.equal(CONTENT_API.SEARCH_CLIENTS, '/api/v2/search-clients');
  });
});

// --- Validation schemas ---

describe('averageClickPositionValidation', () => {
  it('should pass with valid required params', () => {
    const result = validate(analyticsValidation.averageClickPositionValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
    });
    assert.ok(result);
  });

  it('should pass with all optional params', () => {
    const result = validate(analyticsValidation.averageClickPositionValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      count: 50,
    });
    assert.ok(result);
  });

  it('should fail without startDate', () => {
    assert.throws(() => {
      validate(analyticsValidation.averageClickPositionValidation, {
        endDate: '2025-01-31',
      });
    });
  });

  it('should fail without endDate', () => {
    assert.throws(() => {
      validate(analyticsValidation.averageClickPositionValidation, {
        startDate: '2025-01-01',
      });
    });
  });
});

describe('sessionDetailsValidation', () => {
  it('should pass with valid params', () => {
    const result = validate(analyticsValidation.sessionDetailsValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    });
    assert.ok(result);
  });

  it('should pass with optional count', () => {
    const result = validate(analyticsValidation.sessionDetailsValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      count: 10,
    });
    assert.ok(result);
  });

  it('should pass with optional sessionId filter', () => {
    const result = validate(analyticsValidation.sessionDetailsValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      count: 10,
      sessionId: '1649742483444046',
    });
    assert.ok(result);
  });

  it('should pass with optional sortByField and sortType', () => {
    const result = validate(analyticsValidation.sessionDetailsValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      count: 10,
      sortByField: 'click',
      sortType: 'desc',
    });
    assert.ok(result);
  });

  it('should fail without searchClientId', () => {
    assert.throws(() => {
      validate(analyticsValidation.sessionDetailsValidation, {
        startDate: '2025-01-01',
        endDate: '2025-01-31',
      });
    });
  });

  it('should accept sortByField page_view', () => {
    const result = validate(analyticsValidation.sessionDetailsValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      count: 10,
      sortByField: 'page_view',
      sortType: 'desc',
    });
    assert.ok(result);
  });
});

describe('sessionListTableValidation', () => {
  it('should pass with required count and max 500', () => {
    const result = validate(analyticsValidation.sessionListTableValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      count: 500,
    });
    assert.ok(result);
  });

  it('should fail when count exceeds 500', () => {
    assert.throws(() => {
      validate(analyticsValidation.sessionListTableValidation, {
        startDate: '2025-01-01',
        endDate: '2025-01-31',
        searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
        count: 501,
      });
    });
  });

  it('should accept optional startIndex without upper bound', () => {
    const result = validate(analyticsValidation.sessionListTableValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      count: 100,
      startIndex: 500,
    });
    assert.ok(result);
  });
});


// --- Class instantiation ---

describe('SearchClients class', () => {
  it('should instantiate without errors', () => {
    const mockAuth = { getAuthHeader: async () => 'test', authType: 'apiKey' };
    const client = new SearchClients({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    assert.ok(client);
  });

  it('should have getSearchClients method', () => {
    const mockAuth = { getAuthHeader: async () => 'test', authType: 'apiKey' };
    const client = new SearchClients({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    assert.equal(typeof client.getSearchClients, 'function');
  });
});

describe('SearchUnifyRestClient exposes SearchClients', () => {
  it('should have SearchClients() accessor', () => {
    const client = new SearchUnifyRestClient({
      instance: 'https://test.searchunify.com',
      authType: 'apiKey',
      apiKey: 'test-key',
    });
    assert.ok(client.SearchClients);
    assert.equal(typeof client.SearchClients, 'function');
    const sc = client.SearchClients();
    assert.equal(typeof sc.getSearchClients, 'function');
  });
});

describe('Analytics class - new methods exist', () => {
  const mockAuth = { getAuthHeader: async () => 'test', authType: 'apiKey' };
  const analytics = new Analytics({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);

  it('should have getAverageClickPosition method', () => {
    assert.equal(typeof analytics.getAverageClickPosition, 'function');
  });

  it('should have getSessionDetails method', () => {
    assert.equal(typeof analytics.getSessionDetails, 'function');
  });

  it('should have getSessionListTable method', () => {
    assert.equal(typeof analytics.getSessionListTable, 'function');
  });

  it('should have overview tab mirror methods', () => {
    assert.equal(typeof analytics.getOverviewSearchClickPosition, 'function');
    assert.equal(typeof analytics.getOverviewCreatedCases, 'function');
    assert.equal(typeof analytics.getOverviewFeaturedSnippet, 'function');
    assert.equal(typeof analytics.getOverviewKnowledgeTitle, 'function');
    assert.equal(typeof analytics.getOverviewPageRating, 'function');
    assert.equal(typeof analytics.getOverviewSearchFeedback, 'function');
    assert.equal(typeof analytics.getOverviewAdvertisements, 'function');
    assert.equal(typeof analytics.getOverviewReadAnswers, 'function');
    assert.equal(typeof analytics.getOverviewCitationClicks, 'function');
    assert.equal(typeof analytics.getOverviewCopiedAnswers, 'function');
    assert.equal(typeof analytics.getOverviewUserEngagementTrends, 'function');
    assert.equal(typeof analytics.getLlmResponseFeedback, 'function');
  });

  it('should have conversions tab mirror methods', () => {
    assert.equal(typeof analytics.getSessionTrackingFormattedResult, 'function');
    assert.equal(typeof analytics.postConversionSessionDetails, 'function');
    assert.equal(typeof analytics.postConversionTopClickedDocs, 'function');
    assert.equal(typeof analytics.postConversionSearchesOnClick, 'function');
    assert.equal(typeof analytics.postConversionTopSearchesWithClicks, 'function');
    assert.equal(typeof analytics.postConversionClickedResults, 'function');
    assert.equal(typeof analytics.postConversionSearchesCreatedCase, 'function');
    assert.equal(typeof analytics.postConversionSearchesOnDeflection, 'function');
    assert.equal(typeof analytics.postConversionArticlesCreatedCasesSessions, 'function');
    assert.equal(typeof analytics.postConversionLinkSharing, 'function');
    assert.equal(typeof analytics.postConversionDiscussions, 'function');
  });

  it('should have content-gap mirror methods', () => {
    assert.equal(typeof analytics.postContentSplitTileDataContent, 'function');
    assert.equal(typeof analytics.postContentUnsuccessfulSummaryChart, 'function');
    assert.equal(typeof analytics.postOverviewSearchesWithNoClicks, 'function');
    assert.equal(typeof analytics.postOverviewTopSearches, 'function');
    assert.equal(typeof analytics.postOverviewSearchSessions, 'function');
    assert.equal(typeof analytics.postContentSuccessiveNoClicks, 'function');
    assert.equal(typeof analytics.postOverviewSearchesWithNoResult, 'function');
    assert.equal(typeof analytics.postContentSuccessiveNoResults, 'function');
    assert.equal(typeof analytics.postContentUnsuccessfulSearchSessionChart, 'function');
    assert.equal(typeof analytics.postContentHighConversion, 'function');
    assert.equal(typeof analytics.postContentHighConversionClicks, 'function');
    assert.equal(typeof analytics.postContentHighConversionSessions, 'function');
    assert.equal(typeof analytics.postContentArticleUsageByAgents, 'function');
    assert.equal(typeof analytics.postContentSuccessiveArticlesUsage, 'function');
  });
});

describe('Content class - getSearchClients removed', () => {
  const mockAuth = { getAuthHeader: async () => 'test', authType: 'apiKey' };
  const content = new Content({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);

  it('should NOT have getSearchClients (moved to SearchClients class)', () => {
    assert.equal(content.getSearchClients, undefined);
  });
});

// --- Existing methods unchanged ---

describe('Existing methods use similarValidationWithCount', () => {
  it('validates with count (no offset)', () => {
    const result = validate(analyticsValidation.similarValidationWithCount, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      count: 10,
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    });
    assert.ok(result);
  });
});

describe('overviewPageRating validation', () => {
  const base = {
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  };

  it('allows pageNumber with count (MCP-style)', () => {
    const result = validate(analyticsValidation.overviewPageRating, {
      ...base,
      count: 100,
      pageNumber: 2,
    });
    assert.ok(result);
  });

  it('rejects pageNumber alone on similarValidation (regression)', () => {
    assert.throws(() => {
      validate(analyticsValidation.similarValidation, {
        ...base,
        pageNumber: 1,
      });
    });
  });
});
