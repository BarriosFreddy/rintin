const postsService = require("../../services/blog/posts.service");
const { API_TOKEN } = require("../../../constants");

async function save(req, res, next) {
  try {
    const { body } = req;
    const result = await postsService.save(body);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function findAll(req, res, next) {
  let { size = 10, page = 0, publish } = req.query;
  let query;
  if (publish === "true") {
    query = {
      publish: { "$ne" : null},
    };
  }

  try {
    const {
      headers: { authorization },
    } = req;
    const token = authorization ? authorization.split(" ").pop() : null;
    if (authorization && token && token === API_TOKEN) {
      const posts = await postsService.findAll(query, { page, size });
      res.status(200).send(posts);
    } else {
      res.status(401).send(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { body } = req;
    const { id } = req.params;
    const result = await postsService.update(id, body);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    next(error);
  }
}

async function findById(req, res, next) {
  try {
    const {
      headers: { authorization },
    } = req;
    const token = authorization ? authorization.split(" ").pop() : null;
    if (authorization && token && token === API_TOKEN) {
      const { id } = req.params;
      const trips = await postsService.findById(id);
      res.status(200).send(trips);
    } else {
      res.status(401).send(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = {
  save,
  findAll,
  update,
  findById,
};
