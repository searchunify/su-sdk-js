const {
  describe, it, beforeEach, afterEach
} = require('node:test');
const assert = require('node:assert/strict');
const axios = require('axios');
const { HttpRequest, buildMcpTrackContextHeaders } = require('../src/utils/request-handler');
const { initialize } = require('../src/validations/client-validations');

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

const authWith = (props) => ({ getAuthHeader: async () => 'k', authType: 'apiKey', ...props });

describe('buildMcpTrackContextHeaders', () => {
  it('returns nothing when tracking is off', () => {
    const auth = authWith({ sendMcpConsumptionTrack: false, mcpTrackContext: () => ({ tool: 'search' }) });
    assert.deepEqual(buildMcpTrackContextHeaders(auth), {});
  });

  it('returns nothing when no context function is set', () => {
    assert.deepEqual(buildMcpTrackContextHeaders(authWith({ sendMcpConsumptionTrack: true })), {});
  });

  it('encodes tool, call id and user', () => {
    const auth = authWith({
      sendMcpConsumptionTrack: true,
      mcpTrackContext: () => ({ tool: 'search', callId: 'abc-1', user: 'jane.doe+x@acme.com' })
    });
    assert.deepEqual(buildMcpTrackContextHeaders(auth), {
      'x-searchunify-mcp-tool': 'search',
      'x-searchunify-mcp-call-id': 'abc-1',
      'x-searchunify-mcp-user': 'jane.doe%2Bx%40acme.com'
    });
  });

  it('skips empty values and caps length', () => {
    const auth = authWith({
      sendMcpConsumptionTrack: true,
      mcpTrackContext: () => ({ tool: 'x'.repeat(400), callId: '  ', user: null })
    });
    const headers = buildMcpTrackContextHeaders(auth);
    assert.equal(headers['x-searchunify-mcp-tool'].length, 256);
    assert.equal(headers['x-searchunify-mcp-call-id'], undefined);
    assert.equal(headers['x-searchunify-mcp-user'], undefined);
  });

  it('never throws when the context function throws', () => {
    const auth = authWith({ sendMcpConsumptionTrack: true, mcpTrackContext: () => { throw new Error('boom'); } });
    assert.deepEqual(buildMcpTrackContextHeaders(auth), {});
  });
});

describe('HttpRequest MCP headers on the wire', () => {
  it('sends the track flag plus context headers', async () => {
    const auth = authWith({ sendMcpConsumptionTrack: true, mcpTrackContext: () => ({ tool: 'search', callId: 'c1' }) });
    await HttpRequest({ method: 'POST', url: 'https://t.searchunify.com/api/v2_search/searchResults' }, auth);
    assert.equal(capturedConfig.headers['x-searchunify-mcp-track'], '1');
    assert.equal(capturedConfig.headers['x-searchunify-mcp-tool'], 'search');
    assert.equal(capturedConfig.headers['x-searchunify-mcp-call-id'], 'c1');
  });

  it('sends no MCP headers for non-MCP callers', async () => {
    await HttpRequest({ method: 'GET', url: 'https://t.searchunify.com/api/v2/x' }, authWith({}));
    assert.equal(capturedConfig.headers['x-searchunify-mcp-track'], undefined);
    assert.equal(capturedConfig.headers['x-searchunify-mcp-tool'], undefined);
  });
});

describe('client validation', () => {
  it('accepts a mcpTrackContext function', () => {
    const { error } = initialize.validate({
      instance: 'https://t.searchunify.com', apiKey: 'k', authType: 'apiKey', sendMcpConsumptionTrack: true, mcpTrackContext: () => ({})
    });
    assert.equal(error, undefined);
  });

  it('rejects a non-function mcpTrackContext', () => {
    const { error } = initialize.validate({
      instance: 'https://t.searchunify.com', apiKey: 'k', authType: 'apiKey', mcpTrackContext: 'nope'
    });
    assert.ok(error);
  });
});

describe('HttpRequest MCP headers on token requests', () => {
  it('does not send tool/user headers on token calls', async () => {
    const auth = authWith({ sendMcpConsumptionTrack: true, mcpTrackContext: () => ({ tool: 'search', user: 'a@b.com' }) });
    await HttpRequest({ method: 'POST', url: 'https://t.searchunify.com/oauth/token', defaultHeaders: false }, auth);
    assert.equal(capturedConfig.headers['x-searchunify-mcp-tool'], undefined);
    assert.equal(capturedConfig.headers['x-searchunify-mcp-user'], undefined);
  });
});
