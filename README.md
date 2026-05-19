# SearchUnify SDK
[![Version npm](https://img.shields.io/npm/v/su-sdk.svg?style=flat-square)](https://www.npmjs.com/package/su-sdk)

[![NPM](https://nodei.co/npm/su-sdk.png?downloads=true&downloadRank=true)](https://nodei.co/npm/su-sdk/)

## Overview
The SearchUnify SDK enables developers to easily work with the SearchUnify platform and build scalable solutions with search, analytics, crawlers and more. You can get started in minutes using NPM.
The SearchUnify SDK simplifies use of SearchUnify Services by providing a set of libraries that are consistent and familiar for the developers. It provides support for API lifecycle consideration such as credential management, retries, data marshaling, and serialization. The SearchUnify SDKs also support higher level abstractions for simplified development.

## Key Features
* HTTP/2 Support and pluggable HTTP layer, new programming interfaces seamlessly take advantage of HTTP/2 features and provide new ways to build applications.
* Nonblocking I/O, the SearchUnify SDK for Javascript utilizes a new, nonblocking SDK architecture to support true nonblocking I/O. It features truly non blocking asynchronous clients that implement high concurrency across a few threads.

## Getting Started
Sign up for SearchUnify, before you begin, you need a SearchUnify account. Please see the oAuth section of the developer guide for information about how to retrieve your SearchUnify credentials.

## Installation
SDK requires [Node.js](https://nodejs.org/) to run.

```bash
npm install su-sdk
```

## Authentication

The SDK supports multiple authentication methods to securely connect to your SearchUnify instance. Depending on your setup, you can initialize the SDK using OAuth 2.0, API Key, or Client Credentials authentication.

`tenantId` on `SearchUnifyRestClient` is optional and intended for non-MCP SDK callers. **SearchUnify MCP** does not send `tenantId` on outbound requests; the admin BFF injects it from the `tenant-id` header when proxying to analytics.

### 1. OAuth 2.0 (Password Grant)
An access token is generated internally and refreshed automatically on expiry (4 hours).

```javascript
const { SearchUnifyRestClient, AUTH_TYPES } = require('su-sdk');

const suRestClient = new SearchUnifyRestClient({
  instance: 'https://yourInstance.searchunify.com',
  timeout: 60000,
  authType: AUTH_TYPES.PASSWORD,
  oauth2: {
    username: 'changeme',
    password: 'changeme',
    clientId: 'changeme',
    clientSecret: 'changeme'
  }
});
```

### 2. API Key Authentication
Generate the API key from the SearchUnify admin panel.

```javascript
const { SearchUnifyRestClient, AUTH_TYPES } = require('su-sdk');

const suRestClient = new SearchUnifyRestClient({
  instance: 'https://yourInstance.searchunify.com',
  timeout: 60000,
  authType: AUTH_TYPES.API_KEY,
  apiKey: 'changeme'
});
```

### 3. Client Credentials (OAuth 2.0)
For server-to-server communication. The access token is generated internally and refreshed automatically on expiry (4 hours).

```javascript
const { SearchUnifyRestClient, AUTH_TYPES } = require('su-sdk');

const suRestClient = new SearchUnifyRestClient({
  instance: 'https://yourInstance.searchunify.com',
  timeout: 60000,
  authType: AUTH_TYPES.CLIENT_CREDENTIALS,
  oauth2: {
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret'
  }
});
```

## Sample API Call

```javascript
const tileData = async () => {
  try {
    const Analytics = suRestClient.Analytics();
    const data = await Analytics.getTilesData({
      startDate: '2022-12-09',
      endDate: '2022-12-10',
      searchClientId: 'searchClient-UID'
    });
    console.log('data', data);
  } catch (error) {
    console.log('error', error);
  }
};

tileData();
```

## Available APIs

> **Note:** For analytics methods, `searchClientId` and `ecoSystemId` are mutually exclusive — pass one or the other, not both.

---

### Search Clients

```javascript
const SearchClients = suRestClient.SearchClients();

// Get all search clients (returns id, name, uid, search_client_type)
const searchClients = await SearchClients.getSearchClients();
```

---

### Search

```javascript
const Search = suRestClient.Search();

// Search results — uid is the search client UUID
const results = await Search.getSearchResults({
  uid: 'searchClient-UUID',
  searchString: 'your query'
});

// GPT-enhanced search
// requestType: 'SEARCH_GPT' | 'GPT'
// sortby: '_score' | '_post_time'
// When requestType = 'SEARCH_GPT': pageNo and resultsPerPage are required
// When requestType = 'GPT': context, from, and articles are required
const gptResults = await Search.getGPTResults({
  searchClientId: 'searchClient-UUID',
  searchString: 'your query',
  requestType: 'SEARCH_GPT',
  sortby: '_score',
  pageNo: 1,
  resultsPerPage: 10
});
```

---

### Analytics

```javascript
const Analytics = suRestClient.Analytics();
```

#### Overview / Tile Data

```javascript
// Tile summary metrics
await Analytics.getTilesData({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid' });

// Search summary chart data
await Analytics.getSearchSummaryChart({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid' });

// Average click position chart
await Analytics.getAverageClickPosition({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid' });

// Content tile data
await Analytics.getTileDataContent({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid' });

// Tile metrics (set 1 and set 2)
await Analytics.getTileDataMetrics1({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid' });
await Analytics.getTileDataMetrics2({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid' });
```

#### Search Queries
> These methods require `startDate`, `endDate`, and `count` (1–500). `searchClientId` or `ecoSystemId` is optional.

```javascript
// All search queries
await Analytics.getAllSearchQuery({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });

// Queries that returned results
await Analytics.searchQueryWithResult({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });

// Queries with no clicks
await Analytics.searchQueryWithNoClicks({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });

// Queries without results
await Analytics.searchQueryWithoutResults({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });

// Search query histogram
await Analytics.searchQueryHistogram({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });

// Missed query histogram
await Analytics.missedQueryHistogram({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });

// KCS support search queries
await Analytics.getKcsSupportSearchQuery({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });
```

#### Search Conversions

```javascript
// All search conversions
await Analytics.getAllSearchConversion({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });

// Conversions not on first page
await Analytics.searchConversionNotOnFirstPage({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });

// Conversions with filters applied
await Analytics.searchConversionWithFilters({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid' });

// Conversions by session ID
await Analytics.searchConversionBySessionId({
  startDate: '2025-01-01', endDate: '2025-03-26',
  count: 10, searchClientId: 'uid', sessionId: 'session-id'
});

// Discussions ready to become articles
await Analytics.discussionsReadyToBecomeArticles({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10 });
```

#### KCS / Case Articles

```javascript
// searchType: 'all' | 'global' | 'support'
await Analytics.getCaseCreatedArticles({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid', searchType: 'all' });
await Analytics.getCaseDeflectedArticles({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid', searchType: 'all' });
await Analytics.getAttachedArticles({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid' });
await Analytics.getAttachedOnCase({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid', url: 'https://case-url' });
```

#### Leadership dashboard

Leadership methods call **`POST /api/v2/leadership/*`** on your SearchUnify **admin** instance URL (same base as other analytics mirrors). The admin service proxies to the analytics service and injects `tenantId` from the `tenant-id` header when present.

| SDK method | Path | Notes |
|------------|------|--------|
| `postLeadershipUnassistedSelfSolveVolume` | `/api/v2/leadership/unassisted-self-solve-volume` | USSV; optional `directlyViewSetting` |
| `postLeadershipAssistedSelfSolveVolume` | `/api/v2/leadership/assisted-self-solve-volume` | ASSV / KM effectiveness |
| `postLeadershipAssistedCaseVolume` | `/api/v2/leadership/assisted-case-volume` | Tenant-scoped; optional `indexName` |
| `postLeadershipDeflectionCount` | `/api/v2/leadership/deflection-count` | Explicit + implicit quarterly counts |
| `postLeadershipDeflectionCostSavingsDownload` | `/api/v2/leadership/deflection-cost-savings-download` | CSV/email; requires `costPerCase`, `csv` |
| `postLeadershipGetContentSources` | `/api/v2/leadership/get-content-sources` | Content source / facet discovery |

**Scope:** For deflection-count, USSV, and ASSV, pass **`uid` or `ecoId`** (mutually exclusive), not both. `internalUser` defaults to `'all'` on deflection-count and assisted-case-volume.

**Date range:** Omit `from` and `to` to use the analytics default (**last six completed quarters**), matching the Admin Leadership tab. When set, use `YYYY-MM-DD HH:mm:ss` (or values accepted by your analytics deployment).

```javascript
// Unassisted Self Solve Volume (last six quarters when from/to omitted)
await Analytics.postLeadershipUnassistedSelfSolveVolume({
  uid: 'searchClient-UUID',
  internalUser: 'all',
  directlyViewSetting: true
});

// Assisted Self Solve Volume
await Analytics.postLeadershipAssistedSelfSolveVolume({
  uid: 'searchClient-UUID',
  internalUser: 'all'
});

// Deflection counts (explicit + implicit per quarter)
await Analytics.postLeadershipDeflectionCount({
  uid: 'searchClient-UUID',
  internalUser: 'all'
});

// Assisted case volume (optional indexName for one content source)
await Analytics.postLeadershipAssistedCaseVolume({
  internalUser: 'all',
  indexName: 'optional-elastic-index-name'
});

// Content sources for Leadership facet labels
await Analytics.postLeadershipGetContentSources({});
```

**Admin UI vs SDK path:** The SearchUnify Admin UI calls **`POST /analytics/leadership/*`** (session auth + `analytics-secret` on the proxy). SDK and MCP use **`/api/v2/leadership/*`** on the same admin host. Both should reach the same analytics handlers when `/api/v2` leadership mirrors are deployed.

**Performance — deflection-count:** `postLeadershipDeflectionCount` runs **two** rollup queries in parallel (assisted + unassisted quarterly tables). On large tenants or slow databases it can take longer than other Leadership calls. If you see `timeout of 60000ms exceeded`, increase `timeout` on `SearchUnifyRestClient` (see below).

---

#### Request timeout

Every analytics call uses the **`timeout`** (ms) passed to `SearchUnifyRestClient` (default **60000**). Axios aborts the client wait when the limit is reached; the upstream request may still be running on the server.

```javascript
const suRestClient = new SearchUnifyRestClient({
  instance: 'https://yourInstance.searchunify.com',
  timeout: 120000, // recommended for leadership deflection-count on busy tenants
  authType: AUTH_TYPES.API_KEY,
  apiKey: 'changeme'
});
```

| Symptom | Likely cause | Mitigation |
|---------|----------------|------------|
| `timeout of 60000ms exceeded` on `postLeadershipDeflectionCount` | Heavy rollup SQL or loaded analytics DB | Raise `timeout` (e.g. 120000–180000); check analytics query logs |
| Fast 401 on direct analytics host | Missing `analytics-secret` on legacy `POST /leadership/*` | Call through admin `/api/v2/leadership/*` or send the header your deployment expects |
| Works in Admin UI, times out in SDK | Browser has no 60s cap; SDK enforces `timeout` | Increase SDK `timeout`; same backend may need DB tuning |

**MCP:** [su-mcp](https://github.com/searchunify/su-mcp) forwards timeout via `searchunify-timeout` (HTTP headers) or `timeout` in `creds.json`.

---

#### Sessions

```javascript
// Search queries grouped by session
await Analytics.getSearchQueryInSessions({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, searchClientId: 'uid' });

// Session details log
// sortByField: 'search' | 'click' | 'support' | 'case' | 'page_view' | 'end_date' | 'start_date'
// sortType: 'asc' | 'desc'
await Analytics.getSessionDetails({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid' });

// Session list table (count is required)
await Analytics.getSessionListTable({ startDate: '2025-01-01', endDate: '2025-03-26', searchClientId: 'uid', count: 10 });

// Session by search session ID
await Analytics.getSearchSessionBySearchSessionId({
  startDate: '2025-01-01', endDate: '2025-03-26',
  searchClientId: 'uid', sessionId: 'session-id'
});

// Session by case UID (authenticated)
await Analytics.searchSessionByCaseUidAuth({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, caseUid: 'case-uuid' });

// Session by case UID
await Analytics.getSearchSessionByCaseUid({ startDate: '2025-01-01', endDate: '2025-03-26', count: 10, caseUid: 'case-uuid' });
```

---

### Content

```javascript
const Content = suRestClient.Content();

// Get all content sources
await Content.getContentSources();

// Get content source by ID
await Content.getContentSourceById({ contentSourceId: 'id' });

// Get objects and fields for a content source
await Content.getObjectAndFields({ contentSourceId: 'id' });

// Get object data (offset and size are optional; size max: 50)
await Content.getObjectSpecificData({ contentSourceId: 'cs-id', objectId: 'obj-id', offset: 0, size: 10 });

// Get a specific document by ID
await Content.getObjectSpecificDataWithId({ contentSourceId: 'cs-id', objectId: 'obj-id', documentId: 'doc-id' });

// Update a document (data must be a non-empty object)
await Content.updateDoucmentById({
  contentSourceId: 'cs-id',
  objectId: 'obj-id',
  documentId: 'doc-id',
  data: { field: 'value' }
});

// Bulk upload documents (data must be a non-empty array)
await Content.uploadData({
  contentSourceId: 'cs-id',
  objectId: 'obj-id',
  data: [{ field: 'value' }]
});
```

---

## Documentation
Please refer to the SearchUnify developer guide to use the SDK. https://docs.searchunify.com/Content/Developer-Guides/SDKs.htm

## License
MIT

**&copy; Powered by [SearchUnify](https://www.searchunify.com/)!**
