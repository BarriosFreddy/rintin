const mongodbLib = require("../../libs/mongodbLib");
const cache = require("../../helpers/cache");

const COLLECTION = "posts";

const normalizeReadableUrl = (title) =>
  title ? title.toLowerCase().replace(/\s/g, "-").replace(/[,:]/g, "") : "";
function PostsService() {
  function save(post) {
    post.readableURL = normalizeReadableUrl(post.title);
    post.createdAt = new Date().getTime();
    return mongodbLib.save(COLLECTION, post);
  }

  function update(id, post) {
    post.readableURL = normalizeReadableUrl(post.title);
    post.updatedAt = new Date().getTime();
    return mongodbLib.update(COLLECTION, id, post);
  }

  function findAll(query, pageRequest) {
    return cacheSystem(`findAllPosts${pageRequest.size}${pageRequest.page}`, {
      ...query,
      orderBy: { createdAt: -1 },
      pageRequest,
    });
  }

  function findById(id) {
    return mongodbLib.get(COLLECTION, id);
  }

  function findByReadableURL(readableURL) {
    return mongodbLib.findOne(COLLECTION, { readableURL });
  }

  async function cacheSystem(queryKey, query) {
    let result = await cache.get(queryKey);
    if (!result) {
      const { pageRequest, ...queryFields } = query;
      result = mongodbLib.getAll(COLLECTION, queryFields, pageRequest);
      await cache.set(queryKey, result);
    }
    return result;
  }

  return {
    save,
    update,
    findAll,
    findById,
    findByReadableURL
  };
}

module.exports = new PostsService();
