const Joi = require('joi');

const initialize = Joi.object({
  instance: Joi.string().uri().trim().required(),
  timeout: Joi.number().min(30000).max(180000),
  apiKey: Joi.string(),
  authType: Joi.string().valid('apiKey', 'oauth2', 'clientCredentials'),
  oauth2: Joi.when('authType', {
    switch: [
      {
        is: 'apiKey',
        then: Joi.forbidden()
      },
      {
        is: 'clientCredentials',
        then: Joi.object({
          clientId: Joi.string().required(),
          clientSecret: Joi.string().required(),
          username: Joi.forbidden(),
          password: Joi.forbidden()
        }).required()
      },
      {
        is: Joi.valid('oauth2', Joi.valid(null)), // fallback to oauth2-like behavior
        then: Joi.object({
          clientId: Joi.string().required(),
          clientSecret: Joi.string().required(),
          username: Joi.string().required(),
          password: Joi.string().required()
        }).required()
      }
    ],
    otherwise: Joi.object({
      clientId: Joi.string().required(),
      clientSecret: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required()
    }).required()
  })
}).or('apiKey', 'oauth2');

const validateTimeout = Joi.object().keys({
  timeout: Joi.number().min(30000).max(180000)
});

module.exports = {
  initialize,
  validateTimeout
};
