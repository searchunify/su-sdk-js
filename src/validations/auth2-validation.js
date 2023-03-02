const Joi = require('joi');

exports.accessTokenValidation = Joi.object().keys({
  clientId: Joi.string().trim().required(),
  clientSecret: Joi.string().trim().required(),
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required()
});

exports.refreshTokenValidation = Joi.object().keys({
  clientId: Joi.string().trim().required(),
  clientSecret: Joi.string().trim().required(),
  refreshToken: Joi.string().trim().required()
});
