const dayjs = require('dayjs');
const keyGenerator = require('./keyGenerator');
const TimeSpanService = require('./TimeSpanService');
const timeSpanService = new TimeSpanService();

class EventService {
    static BITMAP = 'bitmap';
    static SET = 'set';
    static COUNT = 'count';

    constructor(prefix, redisService) {
        this.prefix = prefix;
        this.redisService = redisService;
    }

    get stores() {
        return {
            storeBitmap: (key, userId) => {
                return this.redisService.setBit(key, userId, 1);
            },

            storeCount: key => {
                return this.redisService.increment(key);
            },

            storeSet: (key, userId) => {
                return this.redisService.addToSet(key, userId);
            }
        };
    }

    get scopes() {
        return [
            ({ source }) => {
                return { source };
            },

            ({ action }) => {
                return { action };
            },

            ({ source, action }) => {
                return { action, source };
            },

            ({ action, page }) => {
                return { action, page };
            },

            () => {
                return { customName: 'global' };
            }
        ];
    }

    async storeAll(userId, date, args = {}) {
        const timeSpans = timeSpanService.all(dayjs(date));

        const keys = { bitmap: [], count: [], set: [] };

        for (const timeSpan of timeSpans) {
            for (const scope of this.scopes) {
                keys.bitmap.push(
                    keyGenerator({ prefix: this.prefix, type: EventService.BITMAP, timeSpan, ...scope(args) })
                );
                keys.count.push(
                    keyGenerator({ prefix: this.prefix, type: EventService.COUNT, timeSpan, ...scope(args) })
                );
                keys.set.push(keyGenerator({ prefix: this.prefix, type: EventService.SET, timeSpan, ...scope(args) }));
            }
        }

        const { storeBitmap, storeCount, storeSet } = this.stores;

        for (const key of keys.bitmap) {
            await storeBitmap(key, userId);
        }

        for (const key of keys.count) {
            await storeCount(key);
        }

        for (const key of keys.set) {
            await storeSet(key, userId);
        }
    }

    async store(type, customName, userId, timeSpans = []) {
        const { storeBitmap, storeCount, storeSet } = this.stores;

        for (const timeSpan of timeSpans) {
            const key = keyGenerator({ prefix: this.prefix, type, customName, timeSpan });

            switch (type) {
                case EventService.BITMAP:
                    await storeBitmap(key, userId);
                    break;
                case EventService.COUNT:
                    await storeCount(key);
                    break;
                case EventService.SET:
                    await storeSet(key, userId);
                    break;
            }
        }
    }
}

module.exports = EventService;
