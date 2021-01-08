const { promisify } = require('util');
const redisClient = require('./RedisClient');

class RedisService {
    constructor() {
        this.redis = redisClient;
        [].forEach(method => (this.redis[method] = promisify(this.redis[method])));
    }
}

module.exports = RedisService;
