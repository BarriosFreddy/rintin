module.exports = {
  generateCode() {
    return `${new Date().getFullYear()}${new Date().getTime()}`;
  },
};
