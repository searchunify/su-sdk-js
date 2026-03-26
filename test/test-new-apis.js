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
    assert.equal(ANALYTICS.AVERAGE_CLICK_POSITION, '/api/v2/searchQuery/averageClickPosition');
  });

  it('should have SESSION_LOG url', () => {
    assert.equal(ANALYTICS.SESSION_LOG, '/api/v2/session/log/all');
  });

  it('should have SEARCH_CLIENTS url', () => {
    assert.equal(CONTENT_API.SEARCH_CLIENTS, '/api/v1/search-clients');
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
      offset: 1,
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

  it('should pass with optional startIndex and count', () => {
    const result = validate(analyticsValidation.sessionDetailsValidation, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      count: 10,
      startIndex: 2,
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
});

describe('similarValidationWithCountAndOffset', () => {
  it('should pass with offset', () => {
    const result = validate(analyticsValidation.similarValidationWithCountAndOffset, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      count: 10,
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      offset: 2,
    });
    assert.ok(result);
  });

  it('should pass without offset (backward compatible)', () => {
    const result = validate(analyticsValidation.similarValidationWithCountAndOffset, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      count: 10,
      searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    });
    assert.ok(result);
  });

  it('should fail with count over 500', () => {
    assert.throws(() => {
      validate(analyticsValidation.similarValidationWithCountAndOffset, {
        startDate: '2025-01-01',
        endDate: '2025-01-31',
        count: 501,
        searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      });
    });
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
});

describe('Content class - getSearchClients removed', () => {
  const mockAuth = { getAuthHeader: async () => 'test', authType: 'apiKey' };
  const content = new Content({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);

  it('should NOT have getSearchClients (moved to SearchClients class)', () => {
    assert.equal(content.getSearchClients, undefined);
  });
});

// --- Pagination backward compatibility ---

describe('Existing methods accept offset param', () => {
  it('getAllSearchQuery validates with offset', () => {
    const result = validate(analyticsValidation.similarValidationWithCountAndOffset, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      count: 10,
      offset: 3,
    });
    assert.ok(result);
  });

  it('getAllSearchQuery validates without offset (backward compat)', () => {
    const result = validate(analyticsValidation.similarValidationWithCountAndOffset, {
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      count: 10,
    });
    assert.ok(result);
  });
});
