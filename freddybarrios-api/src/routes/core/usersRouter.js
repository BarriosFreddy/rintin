const router = require("express").Router();
const passport = require("passport");
const { RESOURCES } = require("../../../constants");
const UserService = require("../../services/UserService");
const validationHandler = require("../../middlewares/validationHandler");
const {
  userIdSchema,
  userCreateSchema,
  userUpdateSchema,
} = require("../../utils/schemas/users");

const { SAVE, UPDATE, FIND_BY_ID, FIND_ALL, DELETE } = RESOURCES.USERS;

const usersRouter = () => {
  /**
   * Save endpoint
   * Receives a user model
   * Produces a saved user model
   */
  router.post(
    SAVE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(userCreateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const result = await UserService.save(body);
        res.status(201).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  /**
   * Update endpoint
   * Receives a model identifier and a user model
   * Produces a updated user model
   */
  router.put(
    UPDATE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(userUpdateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const { id } = req.params;
        const result = await UserService.update(id, body);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  /**
   * FindAll endpoint
   * Recieves no parameters
   * Produces a list of users
   */
  router.get(
    FIND_ALL,
    passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      try {
        const { query } = req;
        const users = await UserService.findAll(query);
        res.status(200).send(users);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  /**
   * FindById endpoint
   * Recieves a model id
   * Produces a user model
   */
  router.get(
    FIND_BY_ID,
    passport.authenticate("jwt", { session: false }),
    validationHandler(userIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const user = await UserService.findById(id);
        res.status(200).send(user);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  /**
   * Delete endpoint
   * Recieves a model id
   * Produces deleted model
   */
  router.delete(
    DELETE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(userIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await UserService.delete(id);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  return router;
};

module.exports = usersRouter;
