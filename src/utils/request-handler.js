const axios = require('axios');
const { Response } = require('./response');
const { AUTHENTICATION } = require('./constants')

const updateResponse = (response) => {
    let result = {
        message: null,
        data: null
    }
    if (response.data && response.data.data) {
        result.message = response.data.message;
        result.data = response.data.data;
        delete response.data.data.message;
        delete response.data.data.status;
    }
    else if (response.data) {
        result.message = response.data.message;
        result.data = response.data;
        delete response.data.message;
        delete response.data.status;
    }
    return result;
}

exports.HttpRequest = async (options) => {
    try {
        const requestPayload = {...options, timeout: AUTHENTICATION.REQUEST_TIMEOUT };
        let response = await axios(requestPayload);
        const result = updateResponse(response);
        return new Response(true, result.message, result.data);
    } catch (error) {
        let message = error.message;
        if (error.response && error.response.data) {
            if (error.response.data.message) {
                message = error.response.data.message;
            }
            else if (error.response.data.error) {
                message = error.response.data.error;
            }
        }

        return new Response(false, message);
    }
}