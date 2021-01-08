const mongodbLib = require("../../libs/mongodbLib");
const cache = require("../../helpers/cache")

const COLLECTION = "posts";

function PostsService() {

  function save(post) {
    post.createdAt = new Date().getTime();
    return mongodbLib.save(COLLECTION, post);
  }

  function update(id, post) {
    post.updatedAt = new Date().getTime();
    return mongodbLib.update(COLLECTION, id, post);
  }

  function findAll(query, pageRequest) {
    return cacheSystem(`findAllPosts${pageRequest.size}${pageRequest.page}`, { ...query, orderBy: { createdAt : -1 }, pageRequest})
  }

  function findById(id) {
    return mongodbLib.get(COLLECTION, id);
  }

  async function cacheSystem(queryKey, query) {
    let result = await cache.get(queryKey)
    if (!result) {
      const {pageRequest, ...queryFields} = query
      result = mongodbLib.getAll(COLLECTION, queryFields, pageRequest);
      await cache.set(queryKey, result)
    }
    return result;
  }

  return {
    save,
    update,
    findAll,
    findById
  }
}

module.exports = new PostsService();
