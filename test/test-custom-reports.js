const {
  describe, it, beforeEach, afterEach
} = require('node:test');
const assert = require('node:assert/strict');
const axios = require('axios');
const { CustomReports } = require('../src/core/custom-reports');
const { SearchUnifyRestClient } = require('../src/su-rest-client');
const { CUSTOM_REPORTS } = require('../src/utils/su-apis');

const INSTANCE = 'https://acme.searchunify.com';
const auth = { getAuthHeader: async () => 'key-1', authType: 'apiKey', getAuthType: () => 'apiKey' };
const client = () => new CustomReports({ instance: INSTANCE, timeout: 60000 }, auth);

let captured;
let respond;
let interceptorId;

beforeEach(() => {
  captured = [];
  respond = () => { return { status: true, message: 'ok', data: { done: true } }; };
  // answer every request locally: no network
  interceptorId = axios.interceptors.request.use((config) => {
    captured.push(config);
    // eslint-disable-next-line no-param-reassign
    config.adapter = async () => {
      return {
        data: respond(config), status: 200, statusText: 'OK', headers: {}, config
      };
    };

    return config;
  });
});

afterEach(() => axios.interceptors.request.eject(interceptorId));

const bodyOf = (config) => (typeof config.data === 'string' ? JSON.parse(config.data) : config.data);

describe('custom reports (read only)', () => {
  it('has the three read routes and nothing else', () => {
    assert.deepEqual(CUSTOM_REPORTS, {
      LIST: '/api/v2/custom-reports/reports',
      RUN: '/api/v2/custom-reports/reports/run',
      FILTER_OPTIONS: '/api/v2/custom-reports/reports/filter-options'
    });
  });

  it('is reachable from the rest client', () => {
    const rest = new SearchUnifyRestClient({ instance: `${INSTANCE}/`, authType: 'apiKey', apiKey: 'k' });
    assert.ok(rest.CustomReports() instanceof CustomReports);
  });

  it('lists the published reports with the credential and an empty body', async () => {
    respond = () => { return { status: true, message: 'Reports', data: { reports: [{ id: 'r1', name: 'Top searches' }] } }; };
    const result = await client().listReports();

    assert.equal(captured[0].url, `${INSTANCE}${CUSTOM_REPORTS.LIST}`);
    assert.equal(captured[0].method.toUpperCase(), 'POST');
    assert.equal(captured[0].headers['x-api-token'], 'key-1');
    assert.deepEqual(bodyOf(captured[0]), {});
    assert.deepEqual(result, { status: true, message: 'Reports', data: { reports: [{ id: 'r1', name: 'Top searches' }] } });
  });

  it('runs a report with exactly the given parameters', async () => {
    const params = {
      reportId: 'top_searches',
      from: '2026-10-01',
      to: '2026-10-31',
      page: 2,
      pageSize: 20,
      sortBy: 'searches',
      sortDir: 'desc',
      internalUser: 'external',
      searchClients: ['uid-1'],
      custom: { language: 'en' },
      search: { query: 'sso' }
    };
    await client().runReport(params);

    assert.equal(captured[0].url, `${INSTANCE}${CUSTOM_REPORTS.RUN}`);
    assert.deepEqual(bodyOf(captured[0]), params);
  });

  it('refuses a run without a report or dates, or with fields the route does not take', async () => {
    await assert.rejects(client().runReport({ from: '2026-10-01', to: '2026-10-31' }), /reportId/);
    await assert.rejects(client().runReport({ reportId: 'r', from: '2026-10-01' }), /to/);
    await assert.rejects(client().runReport({ reportId: 'r', from: '2026-10-31', to: '2026-10-01' }), /on or before/);
    await assert.rejects(client().runReport({ reportId: 'r', from: '01-10-2026', to: '2026-10-31' }), /YYYY-MM-DD/);
    await assert.rejects(client().runReport({
      reportId: 'r', from: '2026-10-01', to: '2026-10-31', pageSize: 501
    }), /pageSize/);
    await assert.rejects(client().runReport({
      reportId: 'r', from: '2026-10-01', to: '2026-10-31', internalUser: 'everyone'
    }), /internalUser/);
    await assert.rejects(client().runReport({
      reportId: 'r', from: '2026-10-01', to: '2026-10-31', tenantId: 'x'
    }), /tenantId/);
    assert.equal(captured.length, 0);
  });

  it('lists the values of one custom filter', async () => {
    await client().getReportFilterOptions({
      reportId: 'top_searches', name: 'language', search: 'e', limit: 50
    });

    assert.equal(captured[0].url, `${INSTANCE}${CUSTOM_REPORTS.FILTER_OPTIONS}`);
    assert.deepEqual(bodyOf(captured[0]), {
      reportId: 'top_searches', name: 'language', search: 'e', limit: 50
    });
    await assert.rejects(client().getReportFilterOptions({ reportId: 'top_searches' }), /name/);
  });

  it('returns status false with the error when the instance refuses', async () => {
    respond = () => {
      const error = new Error('Request failed with status code 404');
      error.response = { status: 404, data: { status: false, message: "Report 'nope' not found" } };
      throw error;
    };
    const result = await client().runReport({ reportId: 'nope', from: '2026-10-01', to: '2026-10-31' });

    assert.equal(result.status, false);
    assert.equal(result.message.response.data.message, "Report 'nope' not found");
  });
});
