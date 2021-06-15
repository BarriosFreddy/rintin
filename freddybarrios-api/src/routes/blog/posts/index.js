const { RESOURCES } = require("../../../../constants");
const passport = require("passport");
const validationHandler = require("../../../middlewares/validationHandler");
const {
  save,
  findAll,
  update,
  findById,
} = require("../../../controllers/blog/PostsController");
const {
  postCreateSchema,
  postUpdateSchema,
  postIdSchema,
} = require("../../../utils/schemas/posts");

const router = require("express").Router();

const {
  LOANS: { SAVE, UPDATE, FIND_BY_ID, FIND_ALL, DELETE, CLOSE },
} = RESOURCES;

const postsRouter = () => {
  router.post(
    SAVE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(postCreateSchema),
    save
  );

  router.put(
    UPDATE,
    passport.authenticate("jwt", { session: false }),
    validationHandler(postUpdateSchema),
    update
  );

  router.get(FIND_ALL, findAll);

  router.get(FIND_BY_ID, findById);

  return router;
};

module.exports = postsRouter;
