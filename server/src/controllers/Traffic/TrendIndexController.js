const { StatusCodes } = require('http-status-codes');
const dayjs = require('dayjs');

class TrafficTrendIndexController {
    constructor(redisService, periodService, analyzerService) {
        this.redisService = redisService;
        this.periodService = periodService;
        this.analyzerService = analyzerService;
    }

    async invoke(req, res) {
        const { filter } = req.query;

        try {
            const { period = null, search = null, type = 'source' } = filter ? JSON.parse(filter) : {};

            const dates =
                period && typeof period === 'object' && period.from && period.to
                    ? this.periodService.getRangeOfDates(dayjs(period.from), period.to, 'day', [dayjs(period.from)])
                    : this.periodService.getRangeOfDates(dayjs('2015-12-01'), '2015-12-31', 'day', [
                          dayjs('2015-12-01')
                      ]);

            if (search && Array.isArray(search)) {
                const results = {};

                for (const item of search) {
                    results[`${item}Traffic`] = {};

                    if (type === 'source') {
                        for (const date of dates) {
                            results[`${item}Traffic`][date.format('YYYY-MM-DD')] = await this.analyzerService.analyze(
                                'bitmap',
                                `day:${date.format('YYYY-MM-DD')}`,
                                'source',
                                {
                                    args: { source: item }
                                }
                            );
                        }

                        continue;
                    }

                    for (const date of dates) {
                        results[`${item}Traffic`][date.format('YYYY-MM-DD')] = await this.analyzerService.analyze(
                            'bitmap',
                            `day:${date.format('YYYY-MM-DD')}`,
                            'actionPage',
                            {
                                args: { action: 'visit', page: item }
                            }
                        );
                    }
                }

                return res.send(results);
            }

            const results = {};

            for (const date of dates) {
                results[date.format('YYYY-MM-DD')] = await this.analyzerService.analyze(
                    'bitmap',
                    `day:${date.format('YYYY-MM-DD')}`,
                    'global'
                );
            }

            return res.send({ results });
        } catch (err) {
            if (err instanceof SyntaxError) {
                return res.sendStatus(StatusCodes.BAD_REQUEST);
            }

            console.error(err);

            return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = TrafficTrendIndexController;
