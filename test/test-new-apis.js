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
    assert.equal(ANALYTICS.LLM_RESPONSE_FEEDBACK, '/api/v2/llm/llm-response-feedback');
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
    assert.equal(typeof analytics.getLlmResponseFeedback, 'function');
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
