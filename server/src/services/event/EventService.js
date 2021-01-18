const dayjs = require('dayjs');
const timeSpans = require('./timeSpans');
const scopes = require('./scopes');

class EventService {
    constructor(prefix, redisService) {
        this.prefix = prefix;
        this.redisService = redisService;
    }

    get stores() {
        return [
            (prefix, key, userId) => {
                return this.redisService.setBit(`${prefix}:bitmap:${key}`, userId, 1);
            },

            (prefix, key) => {
                return this.redisService.increment(`${prefix}:increment:${key}`);
            },

            (prefix, key, userId) => {
                return this.redisService.addToSet(`${prefix}:set:${key}`, userId);
            }
        ];
    }

    async storeAll(userId, date, args = {}) {
        const keys = Object.keys(timeSpans).flatMap(timeSpansKey => {
            const timeSpan = timeSpans[timeSpansKey].bind(timeSpans);

            return Object.keys(scopes).flatMap(scopesKey => {
                const scope = scopes[scopesKey](args);
                const _timeSpan = timeSpan(dayjs(date));

                if (!scope || !_timeSpan || scope === '_custom') {
                    return [];
                }

                const scopeName = scope !== scopesKey ? `:${scope}` : '';
                const timeSpanName = _timeSpan !== timeSpansKey ? `:${_timeSpan}` : '';

                return `${scopesKey}${scopeName}:${timeSpansKey}${timeSpanName}`;
            });
        });

        for (const key of keys) {
            for (const store of this.stores) {
                await store(this.prefix, key, userId);
            }
        }
    }

    async storeCustom(userId, date, customKey) {
        const keys = Object.keys(timeSpans).map(timeSpansKey => {
            const timeSpan = timeSpans[timeSpansKey](dayjs(date));
            const scope = scopes.custom({ customKey });

            const timeSpanName = timeSpan !== timeSpansKey ? `:${timeSpan}` : '';
            const scopeName = scope !== 'custom' ? `:${scope}` : '';

            return `custom${scopeName}:${timeSpansKey}${timeSpanName}`;
        });

        for (const key of keys) {
            for (const store of this.stores) {
                await store(this.prefix, key, userId);
            }
        }
    }
}

module.exports = EventService;
