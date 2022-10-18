const axios = require('axios');
const { Response } = require('./response');
const { AUTHENTICATION } = require('./constants')

const responseHandler = (response) => {
    // delete extra message and statuscode.
    let { data, message } = response;
    let successMessage = message ? message : `Successfully done.`;
    if (message) delete response.message;
    let result = {
        status: true,
        message: successMessage,
        data: data ? data : response
    }
    return result;
}

exports.HttpRequest = async (options) => {
    try {
        const requestPayload = { ...options, timeout: AUTHENTICATION.REQUEST_TIMEOUT };
        let { data } = await axios(requestPayload);
        const result = responseHandler(data);
        return result
    } catch (error) {
        let errorMessage = '';
        let { response, message } = error;
        let { data } = response;
        if (data && data.error) {
            errorMessage = data.error.message ? data.error.message : message;
        }
        else if (data && data.message) {
            errorMessage = data.message ? data.message : message;
        }
    
        return new Response(false, errorMessage);
    }
}