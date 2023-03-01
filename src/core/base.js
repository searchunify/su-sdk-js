const { validateTimeout } = require('../validations/client-validations');
const joiValidator = require('../validations/joi-validator');

// base class for all API Clients
class Base {
  #instance;

  #timeout;

  constructor(props) {
    this.#instance = props.instance;
    this.#timeout = props.timeout;
  }

  getApiTimeout() {
    return this.#timeout;
  }

  setApiTimeout(timeout) {
    joiValidator.validate(validateTimeout, { timeout });
    this.#timeout = timeout;
  }
}

module.exports = {
  Base
};
