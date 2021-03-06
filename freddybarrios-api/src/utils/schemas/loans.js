const joi = require("@hapi/joi");


const idSchema = joi.string().regex(/[\da-fA-F]{24}$/);
const amountSchema = joi.number();
const debtorSchema = joi.string();
const codeSchema = joi.string();
const percentageSchema = joi.number();
const feeDefaultSchema = joi.number();
const collectSchema = joi.string();
const commentsSchema = joi.string();
const createdAtSchema = joi.date();
const updatedAtSchema = joi.date();
const activeSchema = joi.boolean();

const feeSchema = joi.object().keys({
  code: codeSchema,
  amount: amountSchema.required(),
  createdAt: createdAtSchema.required(),
  comments: commentsSchema.optional(),
})

const loansIdSchema = joi.object().keys({
  id: idSchema.required(),
});

const loansCreateSchema = joi.object().keys({
  amount: amountSchema.required(),
  debtor: debtorSchema.required(),
  percentage: percentageSchema.required(),
  feeDefault: feeDefaultSchema,
  collect: collectSchema.required(),
  comments: commentsSchema.optional(),
  active: activeSchema,
  fees: joi.array().items(feeSchema),
  createdAt: createdAtSchema.required(),
  updatedAt: updatedAtSchema.optional(),
});

const loansUpdateSchema = joi.object().keys({
  code: codeSchema,
  amount: amountSchema,
  debtor: debtorSchema,
  percentage: percentageSchema,
  feeDefault: feeDefaultSchema,
  collect: collectSchema,
  comments: commentsSchema,
  active: activeSchema,
  fees: joi.array().items(feeSchema),
  createdAt: createdAtSchema,
  updatedAt: updatedAtSchema,
});

module.exports = {
  loansIdSchema,
  loansCreateSchema,
  loansUpdateSchema,
};
