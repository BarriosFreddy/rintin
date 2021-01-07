const mongodbLib = require("../../libs/mongodbLib");

const COLLECTION = "posts";

class PostsService {
  constructor() {}

  save(post) {
    post.createdAt = new Date().getTime();
    return mongodbLib.save(COLLECTION, post);
  }

  update(id, post) {
    post.updatedAt = new Date().getTime();
    return mongodbLib.update(COLLECTION, id, post);
  }

  findAll(query, pageRequest) {
    return mongodbLib.getAll(COLLECTION, { ...query, orderBy: { createdAt : -1 }}, pageRequest);
  }

  findById(id) {
    return mongodbLib.get(COLLECTION, id);
  }

}

module.exports = new PostsService();
