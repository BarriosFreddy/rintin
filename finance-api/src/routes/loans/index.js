const { RESOURCES } = require("../../constants");
const passport = require("passport");
const validationHandler = require("../../middlewares/validationHandler");
const LoansService = require("../../services/loans/loans.service");
const {
  loansCreateSchema,
  loansUpdateSchema,
  loansIdSchema,
} = require("../../utils/schemas/loans");

const router = require("express").Router();

const {
  LOANS: { SAVE, UPDATE, FIND_BY_ID, FIND_ALL, DELETE, CLOSE },
} = RESOURCES;

const loansRouter = () => {
  router.post(
    SAVE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(loansCreateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const result = await LoansService.save(body);
        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.put(
    UPDATE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(loansUpdateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const { id } = req.params;
        const result = await LoansService.update(id, body);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.get(
    FIND_ALL,
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      const { size = 10, page = 0 } = req.query;
      try {
        const loans = await LoansService.findAll(null, { page, size });
        res.status(200).send(loans);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.get(
    FIND_BY_ID,
    passport.authenticate("jwt", { session: false }),
    validationHandler(loansIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const trips = await LoansService.findById(id);
        res.status(200).send(trips);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.get(
    CLOSE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(loansIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await LoansService.close(id);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.delete(
    DELETE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(loansIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await LoansService.delete(id);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  return router;
};

module.exports = loansRouter;
