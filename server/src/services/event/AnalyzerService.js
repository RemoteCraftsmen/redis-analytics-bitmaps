const timeSpans = require('./timeSpans');
const scopes = require('./scopes');

class AnalyzerService {
    constructor(prefix, redisService) {
        this.prefix = prefix;
        this.redisService = redisService;
    }

    get resolvers() {
        const redisService = this.redisService;

        return {
            set: key => {
                return redisService.getSetValues(key);
            },

            setLength: key => {
                return redisService.getSetLength(key);
            },

            list: key => {
                return redisService.getListValues(key);
            },

            increment: key => {
                return redisService.get(key).then(value => (value ? parseInt(value) : 0));
            },

            bitmap: key => {
                return redisService.count(key);
            },

            key: key => {
                return key;
            }
        };
    }

    async analyze(type, timeSpan, scope, { args = {}, timeResolver = null, resolver = null } = {}) {
        const _timeSpan =
            typeof timeSpan === 'object' ? `${timeResolver}:${timeSpans[timeResolver](timeSpan)}` : timeSpan;

        const _scope = scopes[scope](args);

        if (!_scope) {
            return;
        }

        const scopeName = _scope !== scope ? `:${_scope}` : '';

        return this.resolvers[resolver ? resolver : type](`${this.prefix}:${type}:${scope}${scopeName}:${_timeSpan}`);
    }
}

module.exports = AnalyzerService;
