const timeSpans = require('./timeSpans');
const scopes = require('./scopes');
const resolvers = require('./resolvers');

class AnalyzerService {
    constructor(prefix, redisService) {
        this.prefix = prefix;
        this.redisService = redisService;
    }

    async analyze(type, timeSpan, scope, { args = {}, timeResolver = null, resolver = null } = {}) {
        const _timeSpan =
            typeof timeSpan === 'object' ? `${timeResolver}:${timeSpans[timeResolver](timeSpan)}` : timeSpan;

        const _scope = scopes[scope](args);

        if (!_scope) {
            return;
        }

        const scopeName = _scope !== scope ? `:${_scope}` : '';

        return resolvers[resolver ? resolver : type](`${this.prefix}:${type}:${scope}${scopeName}:${_timeSpan}`);
    }
}

module.exports = AnalyzerService;
