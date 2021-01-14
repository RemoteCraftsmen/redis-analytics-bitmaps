const { StatusCodes } = require('http-status-codes');

class DataStoreController {
    constructor(redisService, eventService) {
        this.redisService = redisService;
        this.eventService = eventService;
    }

    async invoke(req, res) {
        const { userId, date, action, source } = req.body;

        const actions = {
            register: {
                method: 'storeRegisterUsers',
                params: [userId, date],
                eventServiceParams: [userId, date, [source, 'register']]
            },
            homepage: {
                method: 'storeTrafficPerPage',
                params: [userId, date, 'homepage'],
                eventServiceParams: [userId, date, [source, 'visit', 'homepage']]
            },
            product1page: {
                method: 'storeTrafficPerPage',
                params: [userId, date, 'product1page'],
                eventServiceParams: [userId, date, [source, 'visit', 'product1']]
            },
            product2page: {
                method: 'storeTrafficPerPage',
                params: [userId, date, 'product2page'],
                eventServiceParams: [userId, date, [source, 'visit', 'product2']]
            },
            product3page: {
                method: 'storeTrafficPerPage',
                params: [userId, date, 'product3page'],
                eventServiceParams: [userId, date, [source, 'visit', 'product3']]
            },
            product1cart: {
                method: 'storeProductAddedToCart',
                params: [userId, date, 1],
                eventServiceParams: [userId, date, [source, 'addToCart', 'product1']]
            },
            product2cart: {
                method: 'storeProductAddedToCart',
                params: [userId, date, 2],
                eventServiceParams: [userId, date, [source, 'addToCart', 'product2']]
            },
            product3cart: {
                method: 'storeProductAddedToCart',
                params: [userId, date, 3],
                eventServiceParams: [userId, date, [source, 'addToCart', 'product3']]
            },
            product1buy: {
                method: 'storeProductBought',
                params: [userId, date, 1],
                eventServiceParams: [userId, date, [source, 'buy', 'product1']]
            },
            product2buy: {
                method: 'storeProductBought',
                params: [userId, date, 2],
                eventServiceParams: [userId, date, [source, 'buy', 'product2']]
            },
            product3buy: {
                method: 'storeProductBought',
                params: [userId, date, 3],
                eventServiceParams: [userId, date, [source, 'buy', 'product3']]
            }
        };

        const _action = actions[action];

        if (!_action) {
            return res.sendStatus(StatusCodes.BAD_REQUEST);
        }

        await this.redisService[_action.method](..._action.params);

        await this.eventService.store(..._action.eventServiceParams);

        await this.redisService.storeTrafficPerSource(userId, date, source);

        return res.sendStatus(StatusCodes.CREATED);
    }
}

module.exports = DataStoreController;
