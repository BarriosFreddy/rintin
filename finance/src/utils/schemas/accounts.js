const joi = require("@hapi/joi");

const idSchema = joi.string().regex(/[\da-fA-F]{24}$/);
const usernameSchema = joi.string().min(3).max(30);
const passwordSchema = joi.string().max(255);
const imageUrlSchema = joi.string().uri();
const activatedSchema = joi.boolean();
const langKeySchema = joi.string().max(3);
const rolesSchema = joi.string();
const createdAtSchema = joi.date();
const updatedAtSchema = joi.date();

const accountIdSchema = joi.object().keys({
  id: idSchema.required()
})

const accountCreateSchema = joi.object().keys({
  userId: idSchema.required(),
  username: usernameSchema.required(),
  password: passwordSchema.required(),
  imageUrl: imageUrlSchema,
  activated: activatedSchema,
  langKey: langKeySchema,
  roles: joi.array().items(rolesSchema.required()),
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});

const accountUpdateSchema = joi.object().keys({
  userId: idSchema,
  username: usernameSchema,
  password: passwordSchema,
  imageUrl: imageUrlSchema,
  activated: activatedSchema,
  langKey: langKeySchema,
  roles: joi.array().items(rolesSchema),
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});

module.exports = {
  accountIdSchema,
  accountCreateSchema,
  accountUpdateSchema
};
