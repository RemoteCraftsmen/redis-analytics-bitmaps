const dayjs = require('dayjs');
const { StatusCodes } = require('http-status-codes');
const { COUNT } = require('../../services/event/types');

class SalesIndexController {
    constructor(redisService, periodService, analyzerService) {
        this.redisService = redisService;
        this.periodService = periodService;
        this.analyzerService = analyzerService;
    }

    async invoke(req, res) {
        const { filter, period = '2015-12' } = req.query;

        try {
            const { products = [], total = false } = filter
                ? JSON.parse(filter)
                : { products: ['product1', 'product2', 'product3'], total: true };

            const results = [];

            if (total) {
                results.push({
                    type: 'total',
                    addedToCart: await this.analyzerService.analyze(COUNT, period, { action: 'addToCart' }),
                    bought: await this.analyzerService.analyze(COUNT, period, { action: 'buy' })
                });
            }

            for (const product of products) {
                results.push({
                    type: product,
                    addedToCart: await this.analyzerService.analyze(COUNT, period, {
                        action: 'addToCart',
                        page: product
                    }),
                    bought: await this.analyzerService.analyze(COUNT, period, { action: 'buy', page: product })
                });
            }

            return res.send(results);
        } catch (err) {
            if (err instanceof SyntaxError) {
                return res.sendStatus(StatusCodes.BAD_REQUEST);
            }

            console.error(err);

            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    async _search(period, prefix, search) {
        const dates =
            period && typeof period === 'object' && period.from && period.to
                ? this.periodService.getRangeOfDates(dayjs(period.from), period.to, 'day', [dayjs(period.from)])
                : this.periodService.getRangeOfDates(dayjs('2015-12-01'), '2015-12-31', 'day', [dayjs('2015-12-01')]);

        if (search && typeof search === 'object' && Array.isArray(search)) {
            const results = {};

            for (const [index, productId] of search.entries()) {
                results[`product${index + 1}`] = await this._search(period, prefix, productId);
            }

            return results;
        }

        const productsIds = search ? [search] : [1, 2, 3];

        const keys = [];

        productsIds.forEach(productId => {
            const _key = `${prefix}:${productId}`;

            dates.forEach(date => keys.push(`${_key}:${date.format('YYYY-MM-DD')}`));
        });

        if (keys.length === 0) {
            return 0;
        }

        return this.redisService.calculateSum(keys);
    }
}

module.exports = SalesIndexController;
