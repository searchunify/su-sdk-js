const { CaseQa } = require('./case-qa');
const { SupportAgentAnalytics } = require('./support-agent-analytics');
const { AgentPartnerAnalytics } = require('./agent-partner-analytics');
const { LlmUsage } = require('./llm-usage');

/** Instantiates every Agentic Suite Analytics domain class. Adding a new domain only touches this file. */
function initAgenticClasses(props, authentication) {
  return {
    caseQa: new CaseQa(props, authentication),
    supportAgentAnalytics: new SupportAgentAnalytics(props, authentication),
    agentPartnerAnalytics: new AgentPartnerAnalytics(props, authentication),
    llmUsage: new LlmUsage(props, authentication)
  };
}

module.exports = {
  initAgenticClasses
};
