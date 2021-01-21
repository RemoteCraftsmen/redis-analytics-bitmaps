const keyGenerator = require('./keyGenerator');
const { BITMAP, COUNT, SET, SET_AND } = require('./types');

class AnalyzerService {
    constructor(prefix, redisService) {
        this.prefix = prefix;
        this.redisService = redisService;
    }

    analyze(type, timeSpan, args) {
        const key = keyGenerator({ prefix: this.prefix, type, timeSpan, ...args });

        switch (type) {
            case BITMAP:
                return this.redisService.countBit(key);

            case COUNT:
                return this.redisService.get(key).then(value => (value ? parseInt(value) : 0));

            case SET:
                return this.redisService.getSetValues(key);

            case SET_AND:
                return this.redisService.getSetIntersection(
                    keyGenerator({ ...args.first, prefix: this.prefix, type: SET, timeSpan }),
                    keyGenerator({ ...args.second, prefix: this.prefix, type: SET, timeSpan })
                );
        }
    }
}

module.exports = AnalyzerService;
