const dayjs = require('dayjs');
const timeSpans = require('./timeSpans');
const scopes = require('./scopes');
const stores = require('./stores');

class Event {
    constructor(prefix) {
        this.prefix = prefix;
    }

    async store(userId, date, args) {
        const keys = Object.keys(timeSpans).flatMap(timeSpansKey => {
            const timeSpan = timeSpans[timeSpansKey].bind(timeSpans);

            return Object.keys(scopes).flatMap(scopesKey => {
                const scope = scopes[scopesKey](...args);

                if (!scope) {
                    return [];
                }

                const scopeName = scope !== scopesKey ? `:${scope}` : '';

                return `${scopesKey}${scopeName}:${timeSpansKey}:${timeSpan(dayjs(date))}`;
            });
        });

        for (const key of keys) {
            for (const store of stores) {
                await store(this.prefix, key, userId);
            }
        }
    }
}

module.exports = Event;
