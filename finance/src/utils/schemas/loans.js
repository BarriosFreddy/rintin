const joi = require("@hapi/joi");


const idSchema = joi.string().regex(/[\da-fA-F]{24}$/);
const amountSchema = joi.number();
const debtorSchema = joi.string();
const percentageSchema = joi.number();
const feeDefaultSchema = joi.number();
const commentsSchema = joi.string();
const createdAtSchema = joi.date();
const updatedAtSchema = joi.date();
const activeSchema = joi.boolean();

const feeSchema = joi.object().keys({
  amount: amountSchema.required(),
  createdAt: createdAtSchema.required(),
})

const loansIdSchema = joi.object().keys({
  id: idSchema.required(),
});

const loansCreateSchema = joi.object().keys({
  amount: amountSchema.required(),
  debtor: debtorSchema.required(),
  percentage: percentageSchema.required(),
  feeDefault: feeDefaultSchema,
  comments: commentsSchema.optional(),
  active: activeSchema.required(),
  fees: joi.array().items(feeSchema),
  createdAt: createdAtSchema.required(),
  updatedAt: updatedAtSchema,
});

const loansUpdateSchema = joi.object().keys({
  amount: amountSchema,
  debtor: debtorSchema,
  percentage: percentageSchema,
  feeDefault: feeDefaultSchema,
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
