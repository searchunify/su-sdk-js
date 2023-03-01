

/**
 * @class Searchunify Plugin Client
 * @summary Initilize SearchUnify SDK.
 * @param {Object} instance SearchUnify Instance URL.
 * @param {Object} timeout APIs Request Timeout (Default 60000ms).
 * @author Ashish Prasher
 */

class SearchUnifyPluginClient {
  #timeout;

  #instance;

  constructor(props) {
    this.#timeout = props.timeout;
    this.#instance = props.instance;
  }
}

module.exports = {
  SearchUnifyPluginClient
};
