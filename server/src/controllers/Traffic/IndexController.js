const { StatusCodes } = require('http-status-codes');

class TrafficIndexController {
    constructor(redisService, periodService) {
        this.redisService = redisService;
        this.periodService = periodService;
    }

    async invoke(req, res) {
        const { filter } = req.query;

        try {
            const { between = null } = filter ? JSON.parse(filter) : {};

            const periods = ['dec_week_1', 'dec_week_2', 'dec_week_3', 'dec_week_4', 'dec_week_5'];

            const pages = ['homepage', 'product1page', 'product2page', 'product3page'];

            const keys = [];

            pages.forEach(page => {
                const _key = `traffic_per_page:${page}`;

                periods.forEach(period => keys.push(`${_key}:${period}`));
            });

            const total = await this.redisService.calculateOr(keys);

            return res.send({ total });
        } catch (err) {
            if (err instanceof SyntaxError) {
                return res.sendStatus(StatusCodes.BAD_REQUEST);
            }

            console.error(err);

            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = TrafficIndexController;
