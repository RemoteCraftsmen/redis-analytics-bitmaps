const RedisService = require('../RedisService');
const redisService = new RedisService();

module.exports = [
    function (prefix, key, userId) {
        return redisService.setBit(`${prefix}:bitmap:${key}`, userId, 1);
    },

    async function (prefix, key) {
        return redisService.increment(`${prefix}:increment:${key}`);
    },

    async function (prefix, key, userId) {
        return redisService.addToSet(`${prefix}:set:${key}`, userId);
    }
];
