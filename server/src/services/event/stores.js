module.exports = [
    function (prefix, redisService, key, userId) {
        return redisService.setBit(`${prefix}:bitmap:${key}`, userId, 1);
    },

    async function (prefix, redisService, key) {
        return redisService.increment(`${prefix}:increment:${key}`);
    },

    async function (prefix, redisService, key, userId) {
        return redisService.addToSet(`${prefix}:set:${key}`, userId);
    }
];
