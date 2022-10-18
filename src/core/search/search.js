const { SEARCH_API } = require("../../utils/su-apis");
const { AUTHENTICATION } = require("../../utils/constants");
const { HttpRequest } = require("../../utils/request-handler");
const validation = require("../../validations");
const { getAuthHeader } = require("../../utils/auth-type");
const { validateClient } = require("../../validations/client/start-client-validation");

const getSearchResults = async (params) => {
    const isValid = validation.search.searchValidation(params, validateClient(AUTHENTICATION));
    if (isValid.error) throw new Error(isValid.error.message);

    const payload = JSON.stringify(
        isValid.value
    );

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${SEARCH_API.SEARCH}`,
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
    getSearchResults
}