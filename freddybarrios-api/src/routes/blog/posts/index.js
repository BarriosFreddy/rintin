const { RESOURCES } = require("../../../constants");
const passport = require("passport");
const validationHandler = require("../../../middlewares/validationHandler");
const PostsService = require("../../../services/blog/posts.service");
const {
  postCreateSchema,
  postUpdateSchema,
  postIdSchema,
} = require("../../../utils/schemas/posts");

const router = require("express").Router();

const {
  LOANS: { SAVE, UPDATE, FIND_BY_ID, FIND_ALL, DELETE, CLOSE },
} = RESOURCES;

const API_TOKEN = 'dXNlcm5hbWU6cGFzc3dvcmQ=';

const postsRouter = () => {
  router.post(
    SAVE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(postCreateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const result = await PostsService.save(body);
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
    validationHandler(postUpdateSchema),
    async (req, res, next) => {
      try {
        const { body } = req;
        const { id } = req.params;
        const result = await PostsService.update(id, body);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.get(
    FIND_ALL,
    //passport.authenticate("jwt", { session: false }),
    async (req, res, next) => {
      let { size = 10, page = 0, active } = req.query;
      let query
      if (active) {
        active = active === 'true' || false  
        query = {
          active
        }
      }
      try {
        const { headers: { authorization } } = req;
        const token = authorization ? authorization.split(' ').pop() : null;
        if (authorization && token && token === API_TOKEN) {
            const posts = await PostsService.findAll(query, { page, size });
            res.status(200).send(posts);            
        } else {
            res.status(401).send(null);  
        }
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  router.get(
    FIND_BY_ID,
    passport.authenticate("jwt", { session: false }),
    validationHandler(postIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const trips = await PostsService.findById(id);
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
    validationHandler(postIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await PostsService.close(id);
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
    validationHandler(postIdSchema, "params"),
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const result = await PostsService.delete(id);
        res.status(200).send(result);
      } catch (error) {
        console.error(error);
        next(error);
      }
    }
  );

  return router;
};

module.exports = postsRouter;
