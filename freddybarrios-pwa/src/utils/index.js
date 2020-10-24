import constants from "../store/constant";

export default {
  generateCode() {
      return `${new Date().getFullYear()}${new Date().getTime()}`
  },
  sumFees(fees = []) {
    return fees.reduce((prev, current) => prev + Number(current.amount), 0)
  },
  formatNumber(number = 0) {
    return new Intl.NumberFormat().format(number)
  },
  getToken() {
    return window.localStorage.getItem(constants.LOGGED_IN)
  }
};
