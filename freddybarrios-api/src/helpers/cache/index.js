const NodeCache =  require("node-cache");
const { CACHE_TTL = 10000 } = process.env;
 
console.log({CACHE_TTL});
const cache = new NodeCache({ stdTTL: Number(CACHE_TTL)})

const set = async (key, value) => {
    return await cache.set(key, value)
}

const get = async (key = "") => {
    return await cache.get(key)
}

module.exports = {
    set,
    get
}