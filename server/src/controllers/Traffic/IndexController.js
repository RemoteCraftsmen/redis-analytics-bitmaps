const dayjs = require('dayjs');
const { StatusCodes } = require('http-status-codes');

class TrafficIndexController {
    constructor(redisService, periodService) {
        this.redisService = redisService;
        this.periodService = periodService;
    }

    async invoke(req, res) {
        const { filter } = req.query;

        try {
            const { period = null, search = null, type = 'source' } = filter ? JSON.parse(filter) : {};

            if (search && Array.isArray(search)) {
                const totals = {};

                for (const item of search) {
                    totals[`${item}Traffic`] = await this._search(period, item, type);
                }

                return res.send(totals);
            }

            const totalTraffic = await this._search(period, search, type);

            return res.send({ totalTraffic });
        } catch (err) {
            if (err instanceof SyntaxError) {
                return res.sendStatus(StatusCodes.BAD_REQUEST);
            }

            console.error(err);

            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async _search(period, search, type) {
        if (period instanceof Object && Array.isArray(period)) {
            const results = {};

            for (const p of period) {
                results[p] = await this._search(p, search, type);
            }

            return results;
        }

        const dates =
            period && typeof period === 'object' && period.from && period.to
                ? this.periodService.getRangeOfDates(dayjs(period.from), period.to, 'day', [])
                : this.periodService.getRangeOfDates(dayjs('2015-12-01'), '2015-12-31', 'day', []);

        const searches = search ? [search] : ['google', 'facebook', 'email', 'direct', 'referral', 'none'];

        const prefix = type === 'page' ? 'traffic_per_page' : 'traffic_per_source';

        const keys = [];

        searches.forEach(_search => {
            const _key = `${prefix}:${_search}`;

            dates.forEach(date => keys.push(`${_key}:${date.format('YYYY-MM-DD')}`));
        });

        console.log(keys);

        const total = await this.redisService.calculateOr(keys);

        return total;
    }
}

module.exports = TrafficIndexController;
