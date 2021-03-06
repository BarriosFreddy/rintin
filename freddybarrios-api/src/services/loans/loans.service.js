const mongodbLib = require("../../libs/mongodbLib");

const COLLECTION = "loans";

class LoansService {
  constructor() {}

  /**
   * Save loan
   * @param {Object} loan
   */
  save(loan) {
    loan.active = true;
    loan.createdAt = new Date().getTime();
    return mongodbLib.save(COLLECTION, loan);
  }

  /**
   * Update loan
   * @param {Number} id
   * @param {Object} loan
   */
  update(id, loan) {
    return mongodbLib.update(COLLECTION, id, loan);
  }

  /**
   * List loans
   */
  findAll(query, pageRequest) {
    return mongodbLib.getAll(COLLECTION, { ...query, orderBy: { createdAt : -1 }}, pageRequest);
  }

  /**
   * Find a loan by id
   * @param {Number} id
   */
  findById(id) {
    return mongodbLib.get(COLLECTION, id);
  }

  async close(id) {
    const loan =  await mongodbLib.get(COLLECTION, id);
    if (loan) {
      loan.active = false;
      delete loan._id
      return await this.update(id, loan)
    }
    return null
  }

  /**
   * Delete a loan by id
   * @param {Number} id
   */
  delete(id) {
    return mongodbLib.delete(COLLECTION, id);
  }
}

module.exports = new LoansService();
