const qs = require('qs');
const { HttpRequest } = require("../../utils/request-handler");
const validation = require("./../../validations");
const { AUTHENTICATION } = require("./../../utils/constants");
const { AUTH_API } = require("../../utils/su-apis")
const { validateClient, validateOauthClient } = require("../../validations/client/start-client-validation")

const generateToken = async (params) => {
    const isValid = validation.oauth2.accessTokenValidation(params, validateOauthClient());
    if (isValid.error) throw new Error(isValid.error.message);
    let authHeader = Buffer.from(isValid.value.clientId + ":" + isValid.value.clientSecret).toString('base64');

    const queryStrings = qs.stringify({
        grant_type: 'password',
        username: isValid.value.username,
        password: isValid.value.password
    });

    const options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${AUTH_API.TOKEN}`,
        data: queryStrings,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authHeader}`,
            'Cache-Control': 'no-cache'
        }
    }

    let response = await HttpRequest(options);
    if (response.status && response.data && response.data.accessToken) {
        AUTHENTICATION.OAUTH2.ACCESS_TOKEN = response.data.accessToken;
        AUTHENTICATION.OAUTH2.REFRESH_TOKEN = response.data.refreshToken;
        AUTHENTICATION.AUTH_TYPE = 'oauth2';
    }
    return response;
}

const getRefreshedToken = async (params) => {
    const isValid = validation.oauth2.refreshTokenValidation(params, validateClient());
    if (isValid.error) throw new Error(isValid.error.message);
    const queryStrings = qs.stringify({
        grant_type: 'refresh_token',
        client_id: isValid.value.clientId,
        client_secret: isValid.value.clientSecret,
        refresh_token: AUTHENTICATION.OAUTH2.REFRESH_TOKEN
    });

    let options = {
        method: 'post',
        url: `${AUTHENTICATION.INSTANCE_URL}${AUTH_API.TOKEN}`,
        data: queryStrings,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cache-Control': 'no-cache'
        }
    }
    let response = await HttpRequest(options);
    if (response.status && response.data && response.data.accessToken) {
        AUTHENTICATION.OAUTH2.ACCESS_TOKEN = response.data.accessToken;
        AUTHENTICATION.OAUTH2.REFRESH_TOKEN = response.data.refreshToken;
        AUTHENTICATION.AUTH_TYPE = 'oauth2';
    }
    return response;
}

module.exports = {
    generateToken,
    getRefreshedToken
}