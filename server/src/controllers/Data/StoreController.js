const { StatusCodes } = require('http-status-codes');
const { redis } = require('../../config');

class DataStoreController {
    constructor(redisService) {
        this.redisService = redisService;
    }

    async invoke(req, res) {
        const { userId, date, action, source } = req.body;

        const actions = {
            homepage: {
                method: 'storeTrafficPerPage',
                params: [userId, date, 'homepage']
            },
            product1page: {
                method: 'storeTrafficPerPage',
                params: [userId, date, 'product1page']
            },
            product2page: {
                method: 'storeTrafficPerPage',
                params: [userId, date, 'product2page']
            },
            product2page: {
                method: 'storeTrafficPerPage',
                params: [userId, date, 'product2page']
            }
        };

        const _action = actions[action];

        if (!_action) {
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }

        await redis.redisService[_action.method](..._action.params);

        await storeTrafficPerSource(userId, date, source);

        return res.sendStatus(StatusCodes.CREATED);
    }
}

module.exports = DataStoreController;
