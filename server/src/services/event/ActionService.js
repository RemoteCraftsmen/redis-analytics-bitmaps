const dayjs = require('dayjs');

class ActionService {
    constructor(prefix, redisService) {
        this.prefix = prefix;
        this.redisService = redisService;
    }

    store(userId, action, date) {
        return this.redisService.addToSortedSet(
            `${this.prefix}:_private:userActions:${userId}:${action}`,
            date,
            this._calculateDateScore(date)
        );
    }

    count(userId, action) {
        return this.redisService.getSortedSetLenght(`${this.prefix}:_private:userActions:${userId}:${action}`);
    }

    countBefore(userId, action, date) {
        const min = '-inf';
        const max = `(${this._calculateDateScore(date)}`;

        return this.redisService.getSortedSetLenght(`${this.prefix}:_private:userActions:${userId}:${action}`, {
            min,
            max
        });
    }

    countAfter(userId, action, date) {
        const min = `(${this._calculateDateScore(date)}`;
        const max = '+inf';

        return this.redisService.getSortedSetLenght(`${this.prefix}:_private:userActions:${userId}:${action}`, {
            min,
            max
        });
    }

    _calculateDateScore(date) {
        const _date = dayjs(date);

        return _date.year() * 2 + _date.month() * 30 + _date.date();
    }
}

module.exports = ActionService;
