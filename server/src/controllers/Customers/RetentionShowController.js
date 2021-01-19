const { SET } = require('../../services/event/types');

class CustomersRetentionShowController {
    constructor(redisService, periodService, analyzerService) {
        this.redisService = redisService;
        this.periodService = periodService;
        this.analyzerService = analyzerService;
    }

    async invoke(req, res) {
        const users = await this.analyzerService
            .analyze(SET, 'anytime', { customName: 'retention-buy' })
            .then(usersIds => usersIds.map(userId => `User${parseInt(userId) + 1}`));

        return res.send(users);
    }
}

module.exports = CustomersRetentionShowController;
