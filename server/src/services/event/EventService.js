const dayjs = require('dayjs');
const timeSpans = require('./timeSpans');
const scopes = require('./scopes');
const AnalyzerService = require('./AnalyzerService');
const ActionService = require('./ActionService');

class EventService {
    constructor(prefix, redisService) {
        this.prefix = prefix;
        this.redisService = redisService;
        this.actionService = new ActionService(prefix, redisService);
    }

    get stores() {
        const redisService = this.redisService;
        const actionService = this.actionService;

        return [
            function (prefix, key, userId) {
                return redisService.setBit(`${prefix}:bitmap:${key}`, userId, 1);
            },

            function (prefix, key) {
                return redisService.increment(`${prefix}:increment:${key}`);
            },

            function (prefix, key, userId) {
                return redisService.addToSet(`${prefix}:set:${key}`, userId);
            },

            async function (prefix, key, userId, { action, date }) {
                if (!action || !['register', 'buy'].includes(action) || !key.startsWith('global')) {
                    return;
                }

                const actionCount =
                    action === 'buy'
                        ? await actionService.countBefore(userId, 'register', date)
                        : await actionService.countAfter(userId, 'buy', date);

                if (actionCount < 1) {
                    return;
                }

                return redisService.setBit(`${prefix}:cohort:${key}`, userId, 1);
            },

            async function (prefix, key, userId, { action }) {
                if (!action || action !== 'buy' || !key.startsWith('global')) {
                    return;
                }

                const actionCount = await actionService.count(userId, 'buy');

                if (actionCount < 2) {
                    return;
                }

                return redisService.addToSet(`${prefix}:retention:${key}`, userId);
            }
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

        if (args.action) {
            await this.actionService.store(userId, args.action, date);
        }

        for (const key of keys) {
            for (const store of this.stores) {
                await store(this.prefix, key, userId, { ...args, date });
            }
        }
    }
}

module.exports = EventService;
