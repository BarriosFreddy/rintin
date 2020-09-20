const passport = require("passport");
const router = require("express").Router();
const { RESOURCES } = require("../../constants");
const validationHandler = require("../../middlewares/validationHandler");
const ApplicationsSettingsService = require("../../services/ApplicationsSettingsService");
const {
  applicationSettingIdSchema,
  applicationSettingCreateSchema,
  applicationSettingUpdateSchema
} = require("../../utils/schemas/applicationSettings");

const { SAVE, UPDATE, FIND_BY_ID, FIND_ALL, DELETE } = RESOURCES.APPLICATION_SETTINGS;

const applicationSettingsRouter = () => {
  router.post(
    SAVE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(applicationSettingCreateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const result = await ApplicationsSettingsService.save(body);
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
    validationHandler(applicationSettingUpdateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const { id } = req.params;
        const result = await ApplicationsSettingsService.update(id, body);
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
        const trips = await ApplicationsSettingsService.findAll();
        res.status(200).send(trips);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.get(
    FIND_BY_ID,
    passport.authenticate("jwt", { session: false }),
    validationHandler(applicationSettingIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const trips = await ApplicationsSettingsService.findById(id);
        res.status(200).send(trips);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.delete(
    DELETE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(applicationSettingIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await ApplicationsSettingsService.delete(id);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  return router;
};

module.exports = applicationSettingsRouter;
