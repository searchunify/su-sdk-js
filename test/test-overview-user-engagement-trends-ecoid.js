const {
  describe, it, beforeEach, afterEach
} = require('node:test');
const assert = require('node:assert/strict');
const axios = require('axios');
const { Analytics } = require('../src/core/analytics');

const mockAuth = { getAuthHeader: async () => 'test', authType: 'apiKey' };

/**
 * getOverviewUserEngagementTrends used to mislabel an ecosystem scope as `body.uid` instead of
 * `body.ecoId` (the convention every other ecoSystemId-aware method in this file follows) - fixed
 * as part of the same review round that touched postLeadershipAssistedCaseVolume. This test pins
 * that fix so it can't silently regress back to the mislabeled form.
 */
let capturedConfig;
let interceptorId;

beforeEach(() => {
  capturedConfig = null;
  interceptorId = axios.interceptors.request.use((config) => {
    capturedConfig = config;

    return Promise.reject(new Error('intercepted-no-network'));
  });
});

afterEach(() => {
  axios.interceptors.request.eject(interceptorId);
});

describe('Analytics#getOverviewUserEngagementTrends wire format (regression: ecoSystemId mislabeled as uid)', () => {
  it('should send ecoSystemId as body.ecoId with body.uid null, not body.uid', async () => {
    const analytics = new Analytics({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    await analytics.getOverviewUserEngagementTrends({ ecoSystemId: 'eco-1' });
    assert.ok(capturedConfig, 'request should have been issued');
    const body = JSON.parse(capturedConfig.data);
    assert.equal(body.ecoId, 'eco-1');
    assert.equal(body.uid, null);
  });

  it('should send searchClientId as body.uid with body.ecoId null when no ecoSystemId', async () => {
    const analytics = new Analytics({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    await analytics.getOverviewUserEngagementTrends({ searchClientId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' });
    const body = JSON.parse(capturedConfig.data);
    assert.equal(body.uid, 'a1b2c3d4-e5f6-7890-abcd-ef1234567890');
    assert.equal(body.ecoId, null);
  });
});
