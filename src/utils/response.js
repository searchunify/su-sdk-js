/**
 * @param status Api response status like true/false.
 * @param message Api response message.
 * @summary Unsuccessful response format.
 */
exports.Response = function (status, message) {
  this.status = status;
  this.message = message;
};