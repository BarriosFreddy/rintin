module.exports = {
  generateCode() {
    return `${new Date().getFullYear()}${new Date().getTime()}`;
  },
  extractTokenFromCookie({ cookies }) {
    let token = null;
    if (cookies) token = cookies.jwt;
    return token;
  },
  fromAuthHeaderAsBearerToken({ headers }) {
    let token = null;
    if (
      headers &&
      headers.authorization &&
      headers.authorization.startsWith("Bearer")
    )
      token = headers.authorization.split(" ").pop();
    return token;
  },
};
