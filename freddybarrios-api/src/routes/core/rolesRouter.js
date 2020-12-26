const router = require("express").Router();
const passport = require("passport");
const { RESOURCES } = require("../../../constants");
const RolesService = require("../../services/RolesService");
const validationHandler = require("../../middlewares/validationHandler");
const {
  roleIdSchema,
  roleCreateSchema,
  roleUpdateSchema,
} = require("../../utils/schemas/roles");

const { SAVE, UPDATE, FIND_BY_ID, FIND_ALL, DELETE } = RESOURCES.ROLES;

const rolesRouter = () => {
  router.post(
    SAVE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(roleCreateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const result = await RolesService.save(body);
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
    validationHandler(roleUpdateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const { id } = req.params;
        const result = await RolesService.update(id, body);
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
        const roles = await RolesService.findAll();
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
    validationHandler(roleIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const roles = await RolesService.findById(id);
        res.status(200).send(roles);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.delete(
    DELETE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(roleIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await RolesService.delete(id);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  return router;
};

module.exports = rolesRouter;
