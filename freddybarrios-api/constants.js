const GENERIC_ENDPOINTS = {
  SAVE: "/",
  UPDATE: "/:id",
  FIND_BY_ID: "/:id",
  FIND_ALL: "/",
  DELETE: "/:id",
};

module.exports = Object.freeze({
  API_TOKEN: "dXNlcm5hbWU6cGFzc3dvcmQ=",
  RESOURCES: {
    AUTH: {
      URI: "/auth",
      AUTHENTICATE: "/authenticate" 
    },
    ACCOUNTS: {
      URI: "/accounts",
      ...GENERIC_ENDPOINTS,
    },
    USERS: {
      URI: "/users",
      ...GENERIC_ENDPOINTS,
    },
    APPLICATION_SETTINGS: {
      URI: "/applicationSettings",
      ...GENERIC_ENDPOINTS,
    },
    ROLES: {
      URI: "/roles",
      ...GENERIC_ENDPOINTS,
    },
    TYPIFICATIONS: {
      URI: "/typifications",
      ...GENERIC_ENDPOINTS,
    },
    LOANS: {
      URI: "/loans",
      ...GENERIC_ENDPOINTS,
      CLOSE: "/:id/close"
    },
    POSTS: {
      URI: "/posts",
      ...GENERIC_ENDPOINTS,
    }
  },
});
