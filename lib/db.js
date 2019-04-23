const config = require('../config/environment');
const { promisify } = require('util');
const redis = require('redis');
const redisClient = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

module.exports.redisClient = redisClient;
module.exports.getAsync = getAsync;
module.exports.setAsync = setAsync;