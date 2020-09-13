const mongodbLib = require("../libs/mongodbLib");
const bcrypt = require('bcrypt');
const ROUNDS = 12;


const COLLECTION = "accounts";
class AccountsService {
  constructor() {}

  async save(account) {
    const passwordHashed = await bcrypt.hash(account.password, ROUNDS);
    account.password = passwordHashed;
    return mongodbLib.save(COLLECTION, account);
  }

  findAll(query) {
    return mongodbLib.getAll(COLLECTION, query);
  }

  findById(id) {
    return mongodbLib.get(COLLECTION, id);
  }

}

module.exports = new AccountsService();
