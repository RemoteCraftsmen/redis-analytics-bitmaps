const { promisify } = require('util');
const redisClient = require('./RedisClient');

class RedisService {
    constructor() {
        this.redis = redisClient;
        ['SETBIT', 'BITCOUNT'].forEach(method => (this.redis[method] = promisify(this.redis[method])));
    }

    storeTrafficPerPage(userId, period, page) {
        return this.redis.SETBIT(`traffic_per_page:${page}:${period}`, userId, 1);
    }

    storeTrafficPerSource(userId, period, source) {
        return this.redis.SETBIT(`traffic_per_source:${source}:${period}`, userId, 1);
    }

    bitCount(key) {
        return this.redis.BITCOUNT(key);
    }
}

module.exports = RedisService;
