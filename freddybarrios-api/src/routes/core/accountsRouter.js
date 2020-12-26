const router = require("express").Router();
const passport = require("passport");
const { RESOURCES } = require("../../../constants");
const AccountsService = require("../../services/AccountsService");
const validationHandler = require("../../middlewares/validationHandler");
const {
  accountIdSchema,
  accountCreateSchema,
  accountUpdateSchema,
} = require("../../utils/schemas/accounts");

const { SAVE, UPDATE, FIND_BY_ID, FIND_ALL, DELETE } = RESOURCES.ACCOUNTS;

const accountsRouter = () => {
  router.post(
    SAVE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(accountCreateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const result = await AccountsService.save(body);
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
    validationHandler(accountUpdateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const { id } = req.params;
        const result = await AccountsService.update(id, body);
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
      try {
        const accounts = await AccountsService.findAll();
        res.status(200).send(accounts);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.get(
    FIND_BY_ID,
    passport.authenticate("jwt", { session: false }),
    validationHandler(accountIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const accounts = await AccountsService.findById(id);
        res.status(200).send(accounts);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.delete(
    DELETE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(accountIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await AccountsService.delete(id);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  return router;
};

module.exports = accountsRouter;
