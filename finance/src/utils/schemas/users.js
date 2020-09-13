const joi = require("@hapi/joi");

const idSchema = joi.string().regex(/[\da-fA-F]{24}$/);
const imageUrlSchema = joi.string().uri();
const firstNameSchema = joi.string().max(150);
const lastNameSchema = joi.string().max(150);
const genderSchema = joi.string();
const birthDateSchema = joi.date();
const dniSchema = joi.string().max(20);
const emailSchema = joi.string().email();
const phoneNumberSchema = joi.number();
const addressSchema = joi.string();
const createdAtSchema = joi.date();
const updatedAtSchema = joi.date();


const userIdSchema = joi.object().keys({
  id: idSchema.required(),
});

const userCreateSchema = joi.object().keys({
  imageUrl: imageUrlSchema,
  firstName: firstNameSchema.required(),
  lastName: lastNameSchema,
  birthDate: birthDateSchema,
  gender: genderSchema,
  dni: dniSchema,
  email: emailSchema.required(),
  phoneNumber: phoneNumberSchema,
  address: addressSchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema
});


const userUpdateSchema = joi.object().keys({
  imageUrl: imageUrlSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  birthDate: birthDateSchema,
  gender: genderSchema,
  dni: dniSchema,
  email: emailSchema,
  phoneNumber: phoneNumberSchema,
  address: addressSchema,
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema
});

module.exports = {
  userIdSchema,
  userCreateSchema,
  userUpdateSchema,
};
