const dayjs = require('dayjs');
const { StatusCodes } = require('http-status-codes');
const { BITMAP } = require('../../services/event/types');

class TrafficIndexController {
    constructor(redisService, periodService, analyzerService) {
        this.redisService = redisService;
        this.periodService = periodService;
        this.analyzerService = analyzerService;
    }

    async invoke(req, res) {
        const { filter, period = '2015-12' } = req.query;

        try {
            const { sources = [], pages = [], total = false } = filter
                ? JSON.parse(filter)
                : {
                      sources: ['facebook', 'google', 'direct', 'email', 'referral', 'none'],
                      pages: ['homepage', 'product1', 'product2', 'product3'],
                      total: true
                  };

            const results = [];

            if (total) {
                results.push({
                    count: await this.analyzerService.analyze(BITMAP, period, { customName: 'global' }),
                    type: 'total'
                });
            }

            for (const source of sources) {
                results.push({
                    count: await this.analyzerService.analyze(BITMAP, period, { source }),
                    type: 'source',
                    value: source
                });
            }

            for (const page of pages) {
                results.push({
                    count: await this.analyzerService.analyze(BITMAP, period, {
                        action: 'visit',
                        page
                    }),
                    type: 'page',
                    value: page
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
}

module.exports = TrafficIndexController;
