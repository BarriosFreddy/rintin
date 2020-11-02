const joi = require("@hapi/joi");

const idSchema = joi.string().regex(/[\da-fA-F]{24}$/);
const nameSchema = joi.string().max(100);
const codeSchema = joi.string().max(10);
const canReadSchema = joi.boolean();
const canWriteSchema = joi.boolean();
const canDeleteSchema = joi.boolean();

const roleIdSchema = joi.object().keys({
  id: idSchema.required(),
});

const roleCreateSchema = joi.object().keys({
  name: nameSchema.required(),
  code: codeSchema.required(),
  canRead: canReadSchema.required(),
  canWrite: canWriteSchema.required(),
  canDelete: canDeleteSchema.required(),
});

const roleUpdateSchema = joi.object().keys({
  name: nameSchema,
  code: codeSchema,
  canRead: canReadSchema,
  canWrite: canWriteSchema,
  canDelete: canDeleteSchema,
});

module.exports = {
  roleIdSchema,
  roleCreateSchema,
  roleUpdateSchema,
};
