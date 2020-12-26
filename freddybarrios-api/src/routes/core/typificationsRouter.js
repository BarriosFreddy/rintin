const router = require("express").Router();
const passport = require("passport");
const { RESOURCES } = require("../../../constants");
const TypificationsService = require("../../services/TypificationsService");
const validationHandler = require("../../middlewares/validationHandler");
const {
  typificationIdSchema,
  typificationCreateSchema,
  typificationUpdateSchema,
} = require("../../utils/schemas/typifications");

const { SAVE, UPDATE, FIND_BY_ID, FIND_ALL, DELETE } = RESOURCES.TYPIFICATIONS;

const typificationsRouter = () => {
  router.post(
    SAVE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(typificationCreateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const result = await TypificationsService.save(body);
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
    validationHandler(typificationUpdateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const { id } = req.params;
        const result = await TypificationsService.update(id, body);
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
        const typifications = await TypificationsService.findAll();
        res.status(200).send(roles);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.get(
    FIND_BY_ID,
    passport.authenticate("jwt", { session: false }),
    validationHandler(typificationIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const typifications = await TypificationsService.findById(id);
        res.status(200).send(typifications);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.delete(
    DELETE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(typificationIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await TypificationsService.delete(id);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  return router;
};

module.exports = typificationsRouter;
