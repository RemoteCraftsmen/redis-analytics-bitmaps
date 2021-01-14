const timeSpans = require('./timeSpans');
const scopes = require('./scopes');

class AnalyzerService {
    constructor(prefix, redisService) {
        this.prefix = prefix;
        this.redisService = redisService;
    }

    async analyze(type, timeSpan, date, scope, args = []) {
        const _timeSpan = typeof date === 'object' ? `${timeSpan}:${timeSpans[timeSpan](date)}` : `${timeSpan}:${date}`;

        const _scope = scopes[scope](...args);

        if (!_scope) {
            return;
        }

        const scopeName = _scope !== scope ? `:${_scope}` : '';

        return `${this.prefix}:${type}:${scope}${scopeName}:${_timeSpan}`;
    }
}

module.exports = AnalyzerService;
