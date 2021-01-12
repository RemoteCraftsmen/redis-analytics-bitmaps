const dayjs = require('dayjs');
const { StatusCodes } = require('http-status-codes');

class CustomerCohortIndexController {
    constructor(redisService, periodService) {
        this.redisService = redisService;
        this.periodService = periodService;
    }

    async invoke(req, res) {
        const startDate = dayjs('2015-12-01');

        const dates = this.periodService.getRangeOfDates(startDate, '2015-12-31', 'day', [startDate]);

        const iterations = [];

        const productsIds = [1, 2, 3];

        for (const date of dates) {
            const productsKeys = [];
            const _dates = dates.filter(d => dayjs(d).isAfter(date));

            productsIds.forEach(productId => {
                const _key = `product_bought:${productId}`;

                _dates.forEach(d => productsKeys.push(`${_key}:${d.format('YYYY-MM-DD')}`));
            });

            iterations.push({ registrationKey: `registration:${date.format('YYYY-MM-DD')}`, productsKeys });
        }

        const cohortKeys = [];

        for (const iteration of iterations) {
            if (iteration.productsKeys.length === 0) {
                continue;
            }

            const productBoughtKey = await this.redisService.calculateUniques(iteration.productsKeys, true);
            const cohortKey = await this.redisService.calculateIntersection(
                [iteration.registrationKey, productBoughtKey],
                true
            );

            cohortKeys.push(cohortKey);
        }

        const registerThenBought = await this.redisService.calculateUniques(cohortKeys);

        for (const cohortKey of cohortKeys) {
            await this.redisService.delete(cohortKey);
        }

        return res.send({ registerThenBought });
    }
}

module.exports = CustomerCohortIndexController;
