const qs = require('qs');
const { CONTENT_API } = require('../utils/su-apis');
const { HttpRequest, requestMethods } = require('../utils/request-handler');
const { content } = require('../validations');
const { validate } = require('../validations/joi-validator');
const { Base } = require('./base');

class Content extends Base {
  #instance;

  #timeout;

  #authObj;

  constructor(props, authObj) {
    super(props);
    this.#instance = props.instance;
    this.#timeout = props.timeout;
    this.#authObj = authObj;
  }

  getContentSources = async () => HttpRequest({
    timeout: this.#timeout,
    method: requestMethods.get,
    url: `${this.#instance}${CONTENT_API.CONTENT_SOURCES}`
  }, this.#authObj);

  getContentSourceById = async (params) => {
    validate(content.contentSourceIdValidation, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${CONTENT_API.CONTENT_SOURCES_BY_ID}/${params.contentSourceId}`
    }, this.#authObj);
  };

  getObjectAndFields = async (params) => {
    validate(content.contentSourceIdValidation, params);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${CONTENT_API.OBJECT_AND_FIELDS.replace('<contentSourceId>', params.contentSourceId)}`

    }, this.#authObj);
  };

  getObjectSpecificData = async (params) => {
    validate(content.objectSpecificDataValidation, params);

    const queryParams = qs.stringify({
      from: params.offset,
      size: params.size
    }, this.#authObj);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${CONTENT_API.OBJECT_DATA.replace('<contentSourceId>', params.contentSourceId).replace('<objectId>', params.objectId)}?${queryParams}`

    }, this.#authObj);
  };

  getObjectSpecificDataWithId = async (params) => {
    validate(content.objectSpecificDataWithIdValidation, params, true);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.get,
      url: `${this.#instance}${CONTENT_API.OBJECT_DATA_WITH_ID.replace('<contentSourceId>', params.contentSourceId).replace('<objectId>', params.objectId).replace('<documentId>', params.documentId)}`
    }, this.#authObj);
  };

  updateDoucmentById = async (params) => {
    validate(content.updateDoucmentByIdValidation, params, true);

    const payload = JSON.stringify(params.data);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${CONTENT_API.UPDATE_DOC_BY_ID.replace('<contentSourceId>', params.contentSourceId).replace('<objectId>', params.objectId).replace('<documentId>', params.documentId)}`,
      data: payload
    }, this.#authObj);
  };

  uploadData = async (params) => {
    validate(content.uploadDataValidation, params);

    const payload = JSON.stringify({
      bulkData: params.data
    }, this.#authObj);

    return HttpRequest({
      timeout: this.#timeout,
      method: requestMethods.post,
      url: `${this.#instance}${CONTENT_API.BATCH_UPLOAD.replace('<contentSourceId>', params.contentSourceId).replace('<objectId>', params.objectId)}`,
      data: payload
    }, this.#authObj);
  };
}

module.exports = {
  Content
};
