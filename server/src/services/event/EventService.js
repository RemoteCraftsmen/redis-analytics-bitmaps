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

            // async function (prefix, key, userId, { action }) {
            //     if (!action || action !== 'buy' || !key.startsWith('global')) {
            //         return;
            //     }

            //     const actionCount = await actionService.count(userId, 'buy');

            //     if (actionCount < 2) {
            //         return;
            //     }

            //     return redisService.addToSet(`${prefix}:retention:${key}`, userId);
            // }
        ];
    }

    async store(userId, date, args = {}) {
        const keys = Object.keys(timeSpans).flatMap(timeSpansKey => {
            const timeSpan = timeSpans[timeSpansKey].bind(timeSpans);

            return Object.keys(scopes).flatMap(scopesKey => {
                const scope = scopes[scopesKey](args);
                const _timeSpan = timeSpan(dayjs(date));

                if (!scope || !_timeSpan) {
                    return [];
                }

                const scopeName = scope !== scopesKey ? `:${scope}` : '';
                const timeSpanName = _timeSpan !== timeSpansKey ? `:${_timeSpan}` : '';

                return `${scopesKey}${scopeName}:${timeSpansKey}${timeSpanName}`;
            });
        });

        for (const key of keys) {
            for (const store of this.stores) {
                await store(this.prefix, key, userId, { ...args, date });
            }
        }
    }
}

module.exports = EventService;
