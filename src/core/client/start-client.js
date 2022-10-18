const { AUTHENTICATION } = require("./../../utils/constants");

exports.startClient = (params) => {
    AUTHENTICATION.INSTANCE_URL = params.instance;
    AUTHENTICATION.REQUEST_TIMEOUT = params.timeout ? params.timeout: AUTHENTICATION.REQUEST_TIMEOUT;
}

