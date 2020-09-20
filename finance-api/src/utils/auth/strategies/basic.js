const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const AccountsService = require("../../../services/AccountsService");
const boom = require("@hapi/boom");
const bcrypt = require('bcrypt');

const verify = async (username, password, cb) => {
  try {
    const accounts = await AccountsService.findAll({ username });
    if (accounts.length === 0) {
      cb(boom.unauthorized(), false);
    }
    const account = accounts.shift();
    const isSamePassword = await bcrypt.compare(password, account.password);
    if (isSamePassword) {
      return cb(null, account);
    } else {
      cb(boom.unauthorized(), false);
    }
  } catch (error) {
    cb(error);
  }
}

passport.use(
  new BasicStrategy(verify)
);
