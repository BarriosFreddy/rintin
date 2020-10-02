const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const boom = require("@hapi/boom");
const AccountsService = require("../../../services/AccountsService");

const { AUTH_JWT_SECRET } = process.env;

const extractTokenFromCookie = (req) => {
  let token = null
  console.log({req});
  if(cookies) token = req.cookies.jwt
  
  return token;
}

passport.use(
  new Strategy(
    {
      secretOrKey: AUTH_JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
