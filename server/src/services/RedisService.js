const { promisify } = require('util');
const redisClient = require('./RedisClient');

class RedisService {
    constructor() {
        this.redis = redisClient;
        ['SETBIT'].forEach(method => (this.redis[method] = promisify(this.redis[method])));
    }

    storeTrafficPerPage(userId, date, page) {
        return this.redis.SETBIT(`traffic_per_page:${page}:${date}`, userId, 1);
    }

    storeTrafficPerSource(userId, date, source) {
        return this.redis.SETBIT(`traffic_per_source:${source}:${date}`, userId, 1);
    }
}

module.exports = RedisService;
