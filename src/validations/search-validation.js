const Joi = require('joi');

const searchValidation = Joi.object().keys({
  uid: Joi.string().uuid().trim().required(),
  searchString: Joi.string().trim().allow(null, '').required()
}).unknown(true);


module.exports = {
  searchValidation
};
