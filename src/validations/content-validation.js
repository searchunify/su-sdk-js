const Joi = require('joi');

const contentSourceIdValidation = Joi.object().keys({
  contentSourceId: Joi.string().trim().required()
});

const objectSpecificDataValidation = Joi.object().keys({
  contentSourceId: Joi.string().trim().required(),
  objectId: Joi.string().trim().required(),
  offset: Joi.number(),
  size: Joi.number().min(1).max(50)
});

const objectSpecificDataWithIdValidation = Joi.object().keys({
  contentSourceId: Joi.string().trim().required(),
  objectId: Joi.string().trim().required(),
  documentId: Joi.string().trim().required()
});

const updateDoucmentByIdValidation = Joi.object().keys({
  contentSourceId: Joi.string().trim().required(),
  objectId: Joi.string().trim().required(),
  documentId: Joi.string().trim().required(),
  data: Joi.object().min(1).required()
});

const uploadDataValidation = Joi.object().keys({
  contentSourceId: Joi.string().trim().required(),
  objectId: Joi.string().trim().required(),
  data: Joi.array().min(1).required()
});

module.exports = {
  contentSourceIdValidation,
  objectSpecificDataValidation,
  objectSpecificDataWithIdValidation,
  updateDoucmentByIdValidation,
  uploadDataValidation
};
