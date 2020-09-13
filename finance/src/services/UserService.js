const mongodbLib = require("../libs/mongodbLib");

const COLLECTION = "users";
class UserService {
  constructor() {}

  /**
   * Save User
   * @param {Object} user
   */
  save(user) {
    return mongodbLib.save(COLLECTION, user);
  }

  /**
   * Update User
   * @param {Number} id
   * @param {Object} user
   */
  update(id, user) {
    return mongodbLib.update(COLLECTION, id, user);
  }

  /**
   * List Users
   */
  findAll(query) {
    return mongodbLib.getAll(COLLECTION, query);
  }

  /**
   * Find a user by id
   * @param {Number} id
   */
  findById(id) {
    return mongodbLib.get(COLLECTION, id);
  }

  /**
   * Delete a User by id
   * @param {Number} id
   */
  delete(id) {
    return mongodbLib.delete(COLLECTION, id);
  }
}

module.exports = new UserService();
