const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const { CaseQa } = require('../src/agentic/case-qa');
const { SupportAgentAnalytics } = require('../src/agentic/support-agent-analytics');
const { AgentPartnerAnalytics } = require('../src/agentic/agent-partner-analytics');
const { LlmUsage } = require('../src/agentic/llm-usage');
const { SearchUnifyRestClient } = require('../src/core/su-rest-client');
const caseQaValidation = require('../src/validations/case-qa-validation');
const supportAgentValidation = require('../src/validations/support-agent-validation');
const agentPartnerValidation = require('../src/validations/agent-partner-validation');
const llmUsageValidation = require('../src/validations/llm-usage-validation');
const { CASE_QA_API, SUPPORT_AGENT_API, AGENT_PARTNER_API, LLM_USAGE_API } = require('../src/utils/su-apis');
const { validate } = require('../src/validations/joi-validator');

const mockAuth = { getAuthHeader: async () => 'test', authType: 'apiKey' };

// --- API URL constants ---

describe('Agentic Analytics su-apis URLs', () => {
  it('should have CASE_QA_API urls under the agentic-analytics gateway prefix', () => {
    assert.equal(CASE_QA_API.FILTERS, '/api/v1/agentic-analytics/api/v1/case-qa/overview/filters');
    assert.equal(CASE_QA_API.CASE_DETAIL, '/api/v1/agentic-analytics/api/v1/case-qa/overview/<caseId>/detail');
    assert.equal(CASE_QA_API.MY_SCORE_CARD, '/api/v1/agentic-analytics/api/v1/human-managers-teams-agents/my-score-card');
  });

  it('should have SUPPORT_AGENT_API urls under the agentic-analytics gateway prefix', () => {
    assert.equal(SUPPORT_AGENT_API.AGENTS, '/api/v1/agentic-analytics/api/v1/analytics/support-agent/agents');
    assert.equal(
      SUPPORT_AGENT_API.SESSION_TRANSCRIPT,
      '/api/v1/agentic-analytics/api/v1/analytics/support-agent/sessions/<sessionId>/transcript'
    );
  });

  it('should have AGENT_PARTNER_API urls under the agentic-analytics gateway prefix', () => {
    assert.equal(AGENT_PARTNER_API.SEARCH_CLIENTS, '/api/v1/agentic-analytics/api/v1/agent-partner/search-clients');
    assert.equal(
      AGENT_PARTNER_API.OVERVIEW_AGENT_ENGAGEMENT_EXPORT,
      '/api/v1/agentic-analytics/api/v1/agent-partner/overview/agent-engagement/export'
    );
  });

  it('should have LLM_USAGE_API url under the agentic-analytics gateway prefix', () => {
    assert.equal(LLM_USAGE_API.DASHBOARD, '/api/v1/agentic-analytics/api/v1/agent-analytics/dashboard');
  });
});

// --- Validation schemas ---

describe('getCaseQaMetricsValidation', () => {
  it('should pass with required filters', () => {
    const result = validate(caseQaValidation.getCaseQaMetricsValidation, {
      filters: { from: '2025-01-01', to: '2025-01-31' },
    });
    assert.ok(result);
  });

  it('should fail without filters', () => {
    assert.throws(() => {
      validate(caseQaValidation.getCaseQaMetricsValidation, {});
    });
  });
});

describe('getCaseQaDetailValidation', () => {
  it('should pass with required caseId/uid/analyticsId', () => {
    const result = validate(caseQaValidation.getCaseQaDetailValidation, {
      caseId: '500xx0000000001',
      uid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      analyticsId: 'a1b2c3d4-e5f6-7890-abcd-ef1234567891',
    });
    assert.ok(result);
  });

  it('should fail without analyticsId', () => {
    assert.throws(() => {
      validate(caseQaValidation.getCaseQaDetailValidation, {
        caseId: '500xx0000000001',
        uid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      });
    });
  });
});

describe('getSessionTranscriptValidation', () => {
  it('should pass with sessionId', () => {
    const result = validate(supportAgentValidation.getSessionTranscriptValidation, { sessionId: 'sess-1' });
    assert.ok(result);
  });

  it('should fail without sessionId', () => {
    assert.throws(() => {
      validate(supportAgentValidation.getSessionTranscriptValidation, {});
    });
  });
});

describe('getSessionsValidation', () => {
  it('should pass with a valid outcome filter', () => {
    const result = validate(supportAgentValidation.getSessionsValidation, { outcome: 'deflected', page: 1 });
    assert.ok(result);
  });

  it('should fail with an invalid outcome value', () => {
    assert.throws(() => {
      validate(supportAgentValidation.getSessionsValidation, { outcome: 'not-a-real-outcome' });
    });
  });
});

describe('agentPartnerRequestValidation', () => {
  it('should pass with an empty body', () => {
    const result = validate(agentPartnerValidation.agentPartnerRequestValidation, {});
    assert.ok(result);
  });

  it('should pass with filters plus unknown backend-specific keys', () => {
    const result = validate(agentPartnerValidation.agentPartnerRequestValidation, {
      filters: { productIds: ['p1'] },
      someBackendSpecificField: 'value',
    });
    assert.ok(result);
  });
});

describe('getLlmUsageDashboardValidation', () => {
  it('should pass with no params', () => {
    const result = validate(llmUsageValidation.getLlmUsageDashboardValidation, {});
    assert.ok(result);
  });

  it('should fail when days exceeds 365', () => {
    assert.throws(() => {
      validate(llmUsageValidation.getLlmUsageDashboardValidation, { days: 400 });
    });
  });
});

// --- Class instantiation & method presence ---

describe('CaseQa class', () => {
  const caseQa = new CaseQa({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);

  it('should instantiate without errors', () => {
    assert.ok(caseQa);
  });

  it('should have all case-qa/agent-scorecard methods', () => {
    assert.equal(typeof caseQa.getCaseQaFilters, 'function');
    assert.equal(typeof caseQa.getCaseQaMetrics, 'function');
    assert.equal(typeof caseQa.getCaseQaCaseDetails, 'function');
    assert.equal(typeof caseQa.getCaseQaDetail, 'function');
    assert.equal(typeof caseQa.getCqaInsights, 'function');
    assert.equal(typeof caseQa.getAgentScoreCardMetrics, 'function');
    assert.equal(typeof caseQa.getMyScoreCard, 'function');
    assert.equal(typeof caseQa.getMyScoreCardDetails, 'function');
  });
});

describe('SupportAgentAnalytics class', () => {
  const supportAgent = new SupportAgentAnalytics({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);

  it('should instantiate without errors', () => {
    assert.ok(supportAgent);
  });

  it('should have all support-agent methods', () => {
    assert.equal(typeof supportAgent.getAgents, 'function');
    assert.equal(typeof supportAgent.getKpis, 'function');
    assert.equal(typeof supportAgent.getTrendsVolumeOutcome, 'function');
    assert.equal(typeof supportAgent.getTrendsDuration, 'function');
    assert.equal(typeof supportAgent.getTrendsCsat, 'function');
    assert.equal(typeof supportAgent.getOutcomeDistribution, 'function');
    assert.equal(typeof supportAgent.getSankey, 'function');
    assert.equal(typeof supportAgent.getSessions, 'function');
    assert.equal(typeof supportAgent.getSessionTranscript, 'function');
  });
});

describe('AgentPartnerAnalytics class', () => {
  const agentPartner = new AgentPartnerAnalytics({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);

  it('should instantiate without errors', () => {
    assert.ok(agentPartner);
  });

  it('should have search-clients/adoption/overview/tag-trends/feedback methods', () => {
    assert.equal(typeof agentPartner.getSearchClients, 'function');
    assert.equal(typeof agentPartner.getAdoptionContentSources, 'function');
    assert.equal(typeof agentPartner.getOverviewTileData, 'function');
    assert.equal(typeof agentPartner.getOverviewAgentEngagement, 'function');
    assert.equal(typeof agentPartner.exportOverviewAgentEngagementReport, 'function');
    assert.equal(typeof agentPartner.getTagTrendsSpikeWatchlist, 'function');
    assert.equal(typeof agentPartner.getAdoptionRaAdoptionReport, 'function');
    assert.equal(typeof agentPartner.getFeedbackReport, 'function');
    assert.equal(typeof agentPartner.exportFeedbackReport, 'function');
  });
});

describe('LlmUsage class', () => {
  const llmUsage = new LlmUsage({ instance: 'https://test.searchunify.com', timeout: 5000 }, mockAuth);

  it('should instantiate without errors', () => {
    assert.ok(llmUsage);
  });

  it('should have getLlmUsageDashboard method', () => {
    assert.equal(typeof llmUsage.getLlmUsageDashboard, 'function');
  });
});

describe('SearchUnifyRestClient exposes Agentic Analytics domains', () => {
  const client = new SearchUnifyRestClient({
    instance: 'https://test.searchunify.com',
    authType: 'apiKey',
    apiKey: 'test-key',
  });

  it('should have a CaseQa() accessor returning a CaseQa instance', () => {
    assert.equal(typeof client.CaseQa, 'function');
    assert.equal(typeof client.CaseQa().getCaseQaFilters, 'function');
  });

  it('should have a SupportAgentAnalytics() accessor returning a SupportAgentAnalytics instance', () => {
    assert.equal(typeof client.SupportAgentAnalytics, 'function');
    assert.equal(typeof client.SupportAgentAnalytics().getAgents, 'function');
  });

  it('should have an AgentPartnerAnalytics() accessor returning an AgentPartnerAnalytics instance', () => {
    assert.equal(typeof client.AgentPartnerAnalytics, 'function');
    assert.equal(typeof client.AgentPartnerAnalytics().getSearchClients, 'function');
  });

  it('should have an LlmUsage() accessor returning an LlmUsage instance', () => {
    assert.equal(typeof client.LlmUsage, 'function');
    assert.equal(typeof client.LlmUsage().getLlmUsageDashboard, 'function');
  });
});
