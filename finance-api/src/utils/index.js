module.exports = {
  generateCode() {
    return `${new Date().getFullYear()}${new Date().getTime()}`;
  },
  extractTokenFromCookie({cookies}) {
    let token = null
    if(cookies) token = cookies.jwt
    return token;
  }
};
