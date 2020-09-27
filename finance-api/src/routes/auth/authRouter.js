const router = require("express").Router();
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const { AUTH } = require("../../constants").RESOURCES;
const { AUTH_JWT_SECRET, ENV = "dev" } = process.env;

const isProd = ENV === "prod";

const authRouter = () => {
  router.post(AUTH.AUTHENTICATE, (req, res, next) => {
    passport.authenticate("basic", (err, data, info) => {
      try {
        if (err || !data) {
          console.log({ err, data });
          return next(boom.unauthorized());
        }
        req.login(data, { session: false }, (err) => {
          if (err) {
            next(err);
          }
          const { _id: id, email } = data;
          const payload = {
            sub: id,
            email,
          };
          const token = jwt.sign(payload, AUTH_JWT_SECRET, {
            expiresIn: "1h",
          });

          res.cookie("jwt", token, {
            httpOnly: true,
            secure: isProd,
            maxAge: 3600000,
          });
          res.status(200).json({
            id_token: token,
            user: {
              id,
              email,
            },
          });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });

  return router;
};

module.exports = authRouter;
