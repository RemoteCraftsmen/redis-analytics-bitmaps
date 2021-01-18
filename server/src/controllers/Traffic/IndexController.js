const dayjs = require('dayjs');
const { StatusCodes } = require('http-status-codes');

class TrafficIndexController {
    constructor(redisService, periodService, analyzerService) {
        this.redisService = redisService;
        this.periodService = periodService;
        this.analyzerService = analyzerService;
    }

    async invoke(req, res) {
        const { filter } = req.query;

        try {
            const { period = 'month:2015-12', search = null, type = 'source', trend = false } = filter
                ? JSON.parse(filter)
                : {};

            if (search && Array.isArray(search)) {
                const totals = {};

                for (const item of search) {
                    if (type === 'source') {
                        totals[`${item}Traffic`] = await this.analyzerService.analyze('bitmap', period, 'source', {
                            args: { source: item }
                        });

                        continue;
                    }

                    totals[`${item}Traffic`] = await this.analyzerService.analyze('bitmap', period, 'actionPage', {
                        args: { action: 'visit', page: item }
                    });
                }

                return res.send(totals);
            }

            if (search && type === 'source') {
                const totalTraffic = await this.analyzerService.analyze('bitmap', period, 'source', {
                    args: { source: search }
                });

                return res.send({ totalTraffic });
            }

            if (search && type === 'page') {
                const totalTraffic = await this.analyzerService.analyze('bitmap', period, 'actionPage', {
                    args: { action: 'visit', page: search }
                });

                return res.send({ totalTraffic });
            }

            const totalTraffic = await this.analyzerService.analyze('bitmap', period, 'global');

            return res.send({ totalTraffic });
        } catch (err) {
            if (err instanceof SyntaxError) {
                return res.sendStatus(StatusCodes.BAD_REQUEST);
            }

            console.error(err);

            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async _search(period, search, type, trend) {
        const dates =
            period && typeof period === 'object' && period.from && period.to
                ? this.periodService.getRangeOfDates(dayjs(period.from), period.to, 'day', [dayjs(period.from)])
                : this.periodService.getRangeOfDates(dayjs('2015-12-01'), '2015-12-31', 'day', [dayjs('2015-12-01')]);

        const searches = search ? [search] : ['google', 'facebook', 'email', 'direct', 'referral', 'none'];

        const prefix = type === 'page' ? 'traffic_per_page' : 'traffic_per_source';

        const keys = [];

        const _trend = {};

        for (const _search of searches) {
            const _key = `${prefix}:${_search}`;

            for (const date of dates) {
                const formatedDate = date.format('YYYY-MM-DD');

                const key = `${_key}:${formatedDate}`;

                if (trend) {
                    _trend[formatedDate] = await this.redisService.count(key);
                }

                keys.push(key);
            }
        }

        if (keys.length === 0) {
            return 0;
        }

        const total = await this.redisService.calculateUniques(keys);

        const result = trend ? { total, trend: _trend } : total;

        return result;
    }
}

module.exports = TrafficIndexController;
