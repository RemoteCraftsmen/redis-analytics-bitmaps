const { StatusCodes } = require('http-status-codes');

class SalesIndexController {
    constructor(redisService) {
        this.redisService = redisService;
    }

    async invoke(req, res) {
        return res.sendStatus(StatusCodes.OK);
    }
}

module.exports = SalesIndexController;
