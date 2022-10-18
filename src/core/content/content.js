const qs = require('qs');
const { CONTENT_API } = require("../../utils/su-apis");
const { AUTHENTICATION } = require("../../utils/constants");
const { HttpRequest } = require("../../utils/request-handler");
const validation = require("../../validations");
const { getAuthHeader } = require("../../utils/auth-type");
const { validateClient } = require("../../validations/client/start-client-validation");

const getContentSources = async () => {
    const isValid = validation.content.contentSourceIdValidation(validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);
    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${CONTENT_API.CONTENT_SOURCES}`,
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
        }
    }

    let response = await HttpRequest(options);
    return response;
}

const getContentSourceById = async (params) => {
    const isValid = validation.content.contentSourceIdValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);
    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${CONTENT_API.CONTENT_SOURCES_BY_ID}/${isValid.value.contentSourceId}`,
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
        }
    }

    let response = await HttpRequest(options);
    return response;
}

const getObjectAndFields = async (params) => {
    const isValid = validation.content.contentSourceIdValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);
    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${CONTENT_API.OBJECT_AND_FIELDS.replace('<contentSourceId>', isValid.value.contentSourceId)}`,
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
        }
    }

    let response = await HttpRequest(options);
    return response;
}

const getObjectSpecificData = async (params) => {
    const isValid = validation.content.objectSpecificDataValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const queryParams = qs.stringify({
        from: isValid.value.offset,
        size: isValid.value.size
    });

    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${CONTENT_API.OBJECT_DATA.replace('<contentSourceId>', isValid.value.contentSourceId).replace('<objectId>', isValid.value.objectId)}?${queryParams}`,
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
        }
    }

    let response = await HttpRequest(options);
    return response;
}

const getObjectSpecificDataWithId = async (params) => {
    let isValid = validation.content.objectSpecificDataWithIdValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);
    const options = {
        method: 'get',
        url: `${AUTHENTICATION.INSTANCE_URL}${CONTENT_API.OBJECT_DATA_WITH_ID.replace('<contentSourceId>', isValid.value.contentSourceId).replace('<objectId>', isValid.value.objectId).replace('<documentId>', isValid.value.documentId)}`,
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
        }
    }

    let response = await HttpRequest(options);
    return response;
}

const updateDoucmentById = async (params) => {
    const isValid = validation.content.updateDoucmentByIdValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify(isValid.value.data);

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${CONTENT_API.UPDATE_DOC_BY_ID.replace('<contentSourceId>', isValid.value.contentSourceId).replace('<objectId>', isValid.value.objectId).replace('<documentId>', isValid.value.documentId)}`,
        data: payload,
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
        }
    }

    let response = await HttpRequest(options);
    return response;
}

const uploadData = async (params) => {
    const isValid = validation.content.uploadDataValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify({
            bulkData: isValid.value.data
    });

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${CONTENT_API.BATCH_UPLOAD.replace('<contentSourceId>', isValid.value.contentSourceId).replace('<objectId>', isValid.value.objectId)}`,
        data: payload,
        headers: {
            'Authorization': getAuthHeader(),
            'Content-Type': 'application/json'
        }
    }

    let response = await HttpRequest(options);
    return response;
}

module.exports = {
    getContentSources,
    getContentSourceById,
    getObjectAndFields,
    getObjectSpecificData,
    getObjectSpecificDataWithId,
    updateDoucmentById,
    uploadData
}