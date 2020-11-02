const joi = require("@hapi/joi");

const idSchema = joi.string().regex(/[\da-fA-F]{24}$/);
const titleSchema = joi.string().max(250);
const descriptionSchema = joi.string().max(200);
const codeSchema = joi.string().max(10);
const contentSchema = joi.string();
const tagsSchema = joi.array().items(joi.string());
const publishSchema = joi.boolean();
const createdAtSchema = joi.date();
const updatedAtSchema = joi.date();

const postIdSchema = joi.object().keys({
  id: idSchema.required(),
});

const postCreateSchema = joi.object().keys({
  title: titleSchema.required(),
  code: codeSchema.optional(),
  description: descriptionSchema.required(),
  content: contentSchema.required(),
  tags: tagsSchema.optional(),
  publish: publishSchema.required(),
  createdAt: createdAtSchema.required(),
  updatedAt: updatedAtSchema.optional(),
});

const postUpdateSchema = joi.object().keys({
  title: titleSchema,
  code: codeSchema,
  description: descriptionSchema,
  content: contentSchema,
  tags: tagsSchema,
  publish: publishSchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});

module.exports = {
  postIdSchema,
  postCreateSchema,
  postUpdateSchema,
};
