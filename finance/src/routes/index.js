const usersRouter = require("./core/usersRouter");
const authRouter = require("./auth/authRouter");
const accountsRouter = require("./core/accountsRouter");
const applicationSettingsRouter = require("./core/applicationSettingsRouter");
const rolesRouter = require("./core/rolesRouter");
const typificationsRouter = require("./core/typificationsRouter");

const loansRouter = require("./loans");

const {
  RESOURCES: {
    AUTH,
    USERS,
    ACCOUNTS,
    APPLICATION_SETTINGS,
    ROLES,
    TYPIFICATIONS,
    LOANS,
  }
} = require("../constants");

const routes = (app) => {
  app.get("/", (req, res) => {
    const infoAPI = {
      appName: "App Name ",
      version: "v1.0.0",
    };
    res.send(infoAPI);
  });

  app.use(AUTH.URI, authRouter());
  app.use(USERS.URI, usersRouter());
  app.use(ACCOUNTS.URI, accountsRouter());
  app.use(APPLICATION_SETTINGS.URI, applicationSettingsRouter());
  app.use(ROLES.URI, rolesRouter());
  app.use(TYPIFICATIONS.URI, typificationsRouter());

  app.use(LOANS.URI, loansRouter());
};

module.exports = routes;
