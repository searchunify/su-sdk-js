const Joi = require('joi');

const initialize = Joi.object().keys({
  instance: Joi.string().uri().trim().required(),
  timeout: Joi.number().min(30000).max(180000),
  apiKey: Joi.string(),
  oauth2: Joi.object().keys({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
  })
}).or('apiKey', 'oauth2');

const validateTimeout = Joi.object().keys({
  timeout: Joi.number().min(30000).max(180000)
});

module.exports = {
  initialize,
  validateTimeout
};
