const dayjs = require('dayjs');
const timeSpans = require('./timeSpans');
const scopes = require('./scopes');

const stores = [
    function (prefix, redisService, key, userId) {
        return redisService.setBit(`${prefix}:bitmap:${key}`, userId, 1);
    },

    async function (prefix, redisService, key) {
        return redisService.increment(`${prefix}:increment:${key}`);
    },

    async function (prefix, redisService, key, userId) {
        return redisService.addToSet(`${prefix}:set:${key}`, userId);
    }
];

class EventService {
    constructor(prefix, redisService) {
        this.prefix = prefix;
        this.redisService = redisService;
    }

    async store(userId, date, args = {}) {
        const keys = Object.keys(timeSpans).flatMap(timeSpansKey => {
            const timeSpan = timeSpans[timeSpansKey].bind(timeSpans);

            return Object.keys(scopes).flatMap(scopesKey => {
                const scope = scopes[scopesKey](args);

                if (!scope) {
                    return [];
                }

                const scopeName = scope !== scopesKey ? `:${scope}` : '';

                return `${scopesKey}${scopeName}:${timeSpansKey}:${timeSpan(dayjs(date))}`;
            });
        });

        for (const key of keys) {
            for (const store of stores) {
                await store(this.prefix, this.redisService, key, userId);
            }
        }
    }
}

module.exports = EventService;
