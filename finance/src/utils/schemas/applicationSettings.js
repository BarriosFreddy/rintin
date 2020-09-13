const joi = require("@hapi/joi");

const idSchema = joi.string().regex(/[\da-fA-F]{24}$/);
const codeSchema = joi.string().min(2).max(10);
const descriptionSchema = joi.string();
const valueSchema = joi.any();

const applicationSettingIdSchema = joi.object().keys({
  id: idSchema.required()
})

const applicationSettingCreateSchema = joi.object().keys({
  code: codeSchema.required(),
  description: descriptionSchema.required(),
  value: valueSchema.required(),
});

const applicationSettingUpdateSchema = joi.object().keys({
  code: codeSchema,
  description: descriptionSchema,
  value: valueSchema,
});

module.exports = {
  applicationSettingIdSchema,
  applicationSettingCreateSchema,
  applicationSettingUpdateSchema
};
