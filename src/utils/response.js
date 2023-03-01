/**
 * @param status Api response status like true/false.
 * @param message Api response message.
 * @summary Unsuccessful response format.
 */
class Response {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}


module.exports = {
  Response
};
