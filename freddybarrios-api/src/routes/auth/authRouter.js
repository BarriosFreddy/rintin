const router = require("express").Router();
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const { AUTH } = require("../../../constants").RESOURCES;
const { AUTH_JWT_SECRET, ENV = "dev" } = process.env;

const isProd = ENV === "PROD";

const JWT_COOKIE_NAME = "jwt";
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
            expiresIn: "24h",
          });

          res.cookie(JWT_COOKIE_NAME, token, {
            httpOnly: true,
            secure: isProd,
            maxAge: 3600000,
            sameSite: "none"
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

  router.get('/logout', (req, res) => {
    res.clearCookie(JWT_COOKIE_NAME)
    res.status(200).send()
  })

  return router;
};

module.exports = authRouter;
