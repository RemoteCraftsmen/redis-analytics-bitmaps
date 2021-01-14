const dayjs = require('dayjs');
const RedisService = require('../RedisService');

const redisService = new RedisService();

const timeSpans = {
    year(date) {
        return date.year();
    },

    month(date) {
        return `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}`;
    },

    day(date) {
        return date.format('YYYY-MM-DD');
    },

    weekOfMonth(date) {
        const week = Math.ceil(date.date() / 7);

        return `${this.month(date)}/${week}`;
    }
};

const scopes = {
    source: source => {
        return source;
    },

    action: (source, action) => {
        return action;
    },

    actionPage: (source, action, page) => {
        if (action !== 'visit') {
            return null;
        }

        return `${action}:${page}`;
    },

    sourceAction: (source, action) => {
        return `${source}:${action}`;
    },

    global: () => {
        return 'global';
    }
};

const stores = [
    function (prefix, key, userId) {
        return redisService.setBit(`${prefix}:bitmap:${key}`, userId, 1);
    },

    async function (prefix, key) {
        return redisService.increment(`${prefix}:increment:${key}`);
    },

    async function (prefix, key, userId) {
        return redisService.addToSet(`${prefix}:set:${key}`, userId);
    }
];

class Event {
    constructor(prefix) {
        this.prefix = prefix;
    }

    async store(userId, date, source, action, page) {
        const keys = Object.keys(timeSpans).flatMap(timeSpansKey => {
            const timeSpan = timeSpans[timeSpansKey].bind(timeSpans);

            return Object.keys(scopes).flatMap(scopesKey => {
                const scope = scopes[scopesKey](source, action, page);

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
