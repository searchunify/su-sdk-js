/**
 * @param status Api response status like true/false.
 * @param message Api response message.
 * @param data Api response data.
 * @summary Successful response format.
 */
exports.Response = function (status, message, data) {
  const defaultMessage = 'Successful response.';
  this.status = status;
  this.message = message ? message : defaultMessage;
  if (data) this.data = data;
};