const axios = require('axios');
const { Response } = require('./response');

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

exports.HttpRequest = async (options, authObj) => {
  let defaultHeaders = {};

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

  options.headers = { ...defaultHeaders, ...options.headers };
  const requestPayload = { ...options };
  try {
    const { data } = await axios(requestPayload);

    return responseHandler(data);
  } catch (error) {
    if (error
      && error.response
      && error.response.status === 401
      && authObj.getAuthType() === 'oauth2') {
      await authObj.getRefreshedToken();
      requestPayload.headers.Authorization = await authObj.getAuthHeader();
      const { data } = await axios(requestPayload);

      return responseHandler(data);
    }

    return new Response(false, error);
  }
};
