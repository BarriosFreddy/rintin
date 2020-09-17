const joi = require("@hapi/joi");

const idSchema = joi.string().regex(/[\da-fA-F]{24}$/);
const descriptionSchema = joi.string().max(100);
const codeSchema = joi.string().max(10);
const type = joi.object().keys({
  label: joi.string(),
  value: joi.any()
});
const typesSchema = joi.array().items(type);

const typificationIdSchema = {
  id: idSchema.required(),
};

const typificationCreateSchema = joi.object().keys({
  description: descriptionSchema.required(),
  code: codeSchema.required(),
  types: typesSchema.required(),
});

const typificationUpdateSchema = joi.object().keys({
  description: descriptionSchema,
  code: codeSchema,
  types: typesSchema,
});

module.exports = {
  typificationIdSchema,
  typificationCreateSchema,
  typificationUpdateSchema,
};
