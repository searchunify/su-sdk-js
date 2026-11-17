const axios = require('axios');
const { Response } = require('./response');
const { AUTH_TYPES } = require('./constants');

exports.requestMethods = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE',
  patch: 'PATCH',
  head: 'HEAD',
  connect: 'CONNECT',
  options: 'OPTIONS',
  trace: 'TRACE'
};

const responseHandler = (response) => {
  // Raw CSV / string bodies (e.g. `/api/v2/leadership/*` download) are not `{ data, message }` envelopes.
  if (response === null || response === undefined) {
    return { status: true, message: 'Successfully done.', data: response };
  }
  if (typeof response !== 'object' || Array.isArray(response)) {
    return { status: true, message: 'Successfully done.', data: response };
  }
  // delete extra message and statuscode.
  const { data, message } = response;
  const successMessage = message || 'Successfully done.';
  if (message) delete response.message;
  const result = {
    status: true,
    message: successMessage,
    data: data || response
  };

  return result;
};

const MCP_TRACK_CONTEXT_HEADERS = Object.freeze({
  tool: 'x-searchunify-mcp-tool',
  callId: 'x-searchunify-mcp-call-id',
  user: 'x-searchunify-mcp-user'
});

const MAX_MCP_HEADER_VALUE_LENGTH = 256;
const LONE_SURROGATE = /[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g;

/**
 * Trims, caps at MAX_MCP_HEADER_VALUE_LENGTH UTF-16 code units and URI-encodes one value.
 * Lone surrogates (e.g. an emoji cut in half by the cap) are dropped first, because
 * encodeURIComponent throws URIError on them.
 */
const toMcpHeaderValue = (value) => {
  const capped = String(value).trim().slice(0, MAX_MCP_HEADER_VALUE_LENGTH).replace(LONE_SURROGATE, '');

  return capped === '' ? null : encodeURIComponent(capped);
};

/**
 * Builds the per-call MCP tracking headers from the caller-supplied context function.
 * Values are URI-encoded so any character is header-safe; missing/empty values are skipped.
 * A throwing context function never breaks the API call - tracking is best effort.
 */
const buildMcpTrackContextHeaders = (authObj) => {
  const headers = {};
  if (!authObj.sendMcpConsumptionTrack || typeof authObj.mcpTrackContext !== 'function') {
    return headers;
  }
  let context;
  try {
    context = authObj.mcpTrackContext() || {};
  } catch (e) {
    return headers;
  }
  Object.entries(MCP_TRACK_CONTEXT_HEADERS).forEach(([key, headerName]) => {
    const value = context[key];
    if (value === undefined || value === null) return;
    try {
      const encoded = toMcpHeaderValue(value);
      if (encoded !== null) headers[headerName] = encoded;
    } catch (e) {
      // Best effort: a value that cannot be encoded is skipped, never fails the API call.
    }
  });

  return headers;
};

exports.buildMcpTrackContextHeaders = buildMcpTrackContextHeaders;
exports.MCP_TRACK_CONTEXT_HEADERS = MCP_TRACK_CONTEXT_HEADERS;

exports.HttpRequest = async (options, authObj) => {
  let defaultHeaders = {};
  // Token requests (generateToken / getRefreshedToken) opt out of default headers.
  const isAuthRequest = options.defaultHeaders === false;

  if (options.defaultHeaders === false) {
    delete options.defaultHeaders;
  } else if (authObj.authType === 'apiKey') {
    defaultHeaders = {
      'Content-Type': 'application/json',
      'x-api-token': await authObj.getAuthHeader()
    };
  } else {
    defaultHeaders = {
      Authorization: await authObj.getAuthHeader(),
      'Content-Type': 'application/json'
    };
  }

  if (authObj.sendMcpConsumptionTrack) {
    defaultHeaders['x-searchunify-mcp-track'] = '1';
    if (!isAuthRequest) {
      Object.assign(defaultHeaders, buildMcpTrackContextHeaders(authObj));
    }
  }

  options.headers = { ...defaultHeaders, ...options.headers };
  const requestPayload = { ...options };
  try {
    const { data } = await axios(requestPayload);

    return responseHandler(data);
  } catch (error) {
    if (error
      && error.response
      && error.response.status === 401
      && authObj.getAuthType() === AUTH_TYPES.PASSWORD) {
      await authObj.getRefreshedToken();
      requestPayload.headers.Authorization = await authObj.getAuthHeader();
      const { data } = await axios(requestPayload);

      return responseHandler(data);
    }
    if (error
      && error.response
      && error.response.status === 401
      && authObj.getAuthType() === AUTH_TYPES.CLIENT_CREDENTIALS) {
      await authObj.generateToken();
      requestPayload.headers.Authorization = await authObj.getAuthHeader();
      const { data } = await axios(requestPayload);

      return responseHandler(data);
    }

    return new Response(false, error);
  }
};
