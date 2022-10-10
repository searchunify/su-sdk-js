const APIs = require('./src/controllers');
const validations = require('./src/validations');
const { startClient } = require('./src/controllers/client/start-client');

/**
 * @class Searchunify
 * @summary Initilize SearchUnify SDK.
 * @param {Object} instance SearchUnify Instance URL.
 * @param {Object} timeout APIs Request Timeout (Default 60000ms).
 * @author Mohan Rana
 */

function Searchunify(clientProps) {
    try {
        const isValid = validations.client.initilize(clientProps);
        if (isValid.error) throw new Error(isValid.error.message);
        startClient(isValid.value);

        return {
            oauth: APIs.oauth2,
            analytics: APIs.analytics,
            content: APIs.content,
            search: APIs.search
        };
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    Searchunify
}