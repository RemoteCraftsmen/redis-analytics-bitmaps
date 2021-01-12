const { StatusCodes } = require('http-status-codes');

class CustomerCohortIndexController {
    constructor(redisService, periodService) {
        this.redisService = redisService;
        this.periodService = periodService;
    }

    async invoke(req, res) {
        return res.sendStatus(StatusCodes.OK);
    }
}

module.exports = CustomerCohortIndexController;
