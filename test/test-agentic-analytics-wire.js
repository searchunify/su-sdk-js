const {
  describe, it, beforeEach, afterEach
} = require('node:test');
const assert = require('node:assert/strict');
const axios = require('axios');
const { CaseQa } = require('../src/agentic/case-qa');
const { SupportAgentAnalytics } = require('../src/agentic/support-agent-analytics');
const { LlmUsage } = require('../src/agentic/llm-usage');
const caseQaValidation = require('../src/validations/case-qa-validation');
const agentPartnerValidation = require('../src/validations/agent-partner-validation');
const { validate } = require('../src/validations/joi-validator');

const mockAuth = { getAuthHeader: async () => 'test', authType: 'apiKey' };

/**
 * Intercepts the single outgoing axios request, captures its config, and rejects it before any
 * network I/O happens - HttpRequest's catch block then returns Response(false, error), so the
 * method call resolves instead of hitting a real (or absent) network.
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

describe('SupportAgentAnalytics#getKpis wire format (regression: array agentIds)', () => {
  it('should send a comma-joined agentIds query param, not bracketed indices', async () => {
    const supportAgent = new SupportAgentAnalytics({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    await supportAgent.getKpis({ startDate: '2025-01-01', endDate: '2025-01-31', agentIds: ['a1', 'a2'] });
    assert.ok(capturedConfig, 'request should have been issued');
    assert.match(capturedConfig.url, /agentIds=a1%2Ca2/);
    assert.doesNotMatch(capturedConfig.url, /agentIds%5B0%5D/);
  });

  it('should still accept a plain string agentIds unchanged', async () => {
    const supportAgent = new SupportAgentAnalytics({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    await supportAgent.getKpis({ startDate: '2025-01-01', endDate: '2025-01-31', agentIds: 'a1' });
    assert.match(capturedConfig.url, /agentIds=a1(?!%2C)/);
  });

  it('should accept the real backend datePreset values', async () => {
    const supportAgent = new SupportAgentAnalytics({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    await supportAgent.getKpis({ datePreset: 'last7Days' });
    assert.match(capturedConfig.url, /datePreset=last7Days/);
  });

  it('should reject the old (wrong) lowercase datePreset values', () => {
    const supportAgent = new SupportAgentAnalytics({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    assert.throws(() => supportAgent.getKpis({ datePreset: 'last7days' }));
  });
});

describe('CaseQa#getCaseQaDetail wire format (regression: unescaped caseId)', () => {
  it('should URL-encode a caseId containing path/query-breaking characters', async () => {
    const caseQa = new CaseQa({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    await caseQa.getCaseQaDetail({
      caseId: 'abc/def?x=1',
      uid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      analyticsId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567891'
    });
    assert.ok(capturedConfig, 'request should have been issued');
    const pathAndQuery = capturedConfig.url.split('?');
    // Path segment must not contain a raw '/' or '?' introduced by the caseId itself.
    assert.ok(pathAndQuery[0].endsWith('/detail'));
    assert.doesNotMatch(pathAndQuery[0], /abc\/def/);
    assert.match(pathAndQuery[0], /abc%2Fdef%3Fx%3D1/);
    // uid/analyticsId must still be present as real query params (not swallowed by the caseId).
    assert.match(capturedConfig.url, /uid=a1b2c3d4-e5f6-7890-abcd-ef1234567890/);
    assert.match(capturedConfig.url, /analyticsId=a1b2c3d4-e5f6-7890-abcd-ef1234567891/);
  });
});

describe('LlmUsage#getLlmUsageDashboard wire format (regression: untrimmed params)', () => {
  it('should send the trimmed value, not the raw padded input', async () => {
    const llmUsage = new LlmUsage({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);
    await llmUsage.getLlmUsageDashboard({ provider: '  openai  ' });
    assert.ok(capturedConfig, 'request should have been issued');
    assert.match(capturedConfig.url, /provider=openai(?!%20)/);
    assert.doesNotMatch(capturedConfig.url, /%20openai%20/);
  });
});

describe('getCaseQaFiltersValidation (regression: empty string filters rejected)', () => {
  it('should allow an empty-string teamId (clearing a filter), matching backend semantics', () => {
    const result = validate(caseQaValidation.getCaseQaFiltersValidation, { teamId: '' });
    assert.equal(result.value.teamId, '');
  });

  it('should allow an empty-string aiAgentUid and managerEmail too', () => {
    const result = validate(caseQaValidation.getCaseQaFiltersValidation, { aiAgentUid: '', managerEmail: '' });
    assert.equal(result.value.aiAgentUid, '');
    assert.equal(result.value.managerEmail, '');
  });
});

describe('agent-partner paginationSchema (regression: enabled without page/pageSize)', () => {
  it('should reject pagination.enabled=true without page/pageSize', () => {
    assert.throws(() => {
      const schema = agentPartnerValidation.tagTrendsSpikeWatchlistValidation;
      validate(schema, { pagination: { enabled: true } });
    });
  });

  it('should pass pagination.enabled=true with page/pageSize provided', () => {
    const result = validate(agentPartnerValidation.tagTrendsSpikeWatchlistValidation, {
      pagination: { enabled: true, page: 1, pageSize: 20 }
    });
    assert.ok(result);
  });

  it('should still pass with pagination omitted entirely', () => {
    const result = validate(agentPartnerValidation.tagTrendsSpikeWatchlistValidation, {});
    assert.ok(result);
  });
});
