const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");
const AccountsService = require("../../../services/AccountsService");
const { extractTokenFromCookie } = require("../../index");

const { AUTH_JWT_SECRET } = process.env;

passport.use(
  new Strategy(
    {
      secretOrKey: AUTH_JWT_SECRET,
      jwtFromRequest: extractTokenFromCookie,
    },
    async (tokenPayload, cb) => {
      try {
        const account = await AccountsService.findById(tokenPayload.sub);

        if (!account) {
          cb(boom.unauthorized(), false);
        }

        delete account.password;

        return cb(null, { ...account });
      } catch (error) {
        return cb(error);
      }
    }
  )
);
