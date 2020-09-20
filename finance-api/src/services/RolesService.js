const mongodbLib = require("../libs/mongodbLib");

const COLLECTION = "roles";

class RolesService {
  constructor() {}

  save(trip) {
    return mongodbLib.save(COLLECTION, trip);
  }

  update(id, trip) {
    return mongodbLib.update(COLLECTION, id, trip);
  }

  findAll(query) {
    return mongodbLib.getAll(COLLECTION, query);
  }

  findById(id) {
    return mongodbLib.get(COLLECTION, id);
  }

  delete(id) {
    return mongodbLib.delete(COLLECTION, id);
  }
}

module.exports = new RolesService();
