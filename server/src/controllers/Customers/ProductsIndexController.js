const { StatusCodes } = require('http-status-codes');
const { SET, JOIN } = require('../../services/event/types');

class CustomersProductIndexController {
    constructor(analyzerService) {
        this.analyzerService = analyzerService;
    }

    async invoke(req, res) {
        const { filter, join, period = '2015-12' } = req.query;

        const { products = [] } = filter ? JSON.parse(filter) : { products: ['product1', 'product2', 'product3'] };

        const [firstProduct, secondProduct] = join ? JSON.parse(join) : [];

        const results = [];

        for (const product of products) {
            const boughtBy = await this.analyzerService
                .analyze(SET, period, { action: 'buy', page: product })
                .then(usersIds => usersIds.map(userId => `User${parseInt(userId) + 1}`));

            results.push({
                type: 'product',
                value: product,
                boughtBy
            });
        }

        if (firstProduct && secondProduct) {
            const boughtBy = await this.analyzerService
                .analyze(JOIN, period, {
                    first: { action: 'buy', page: firstProduct },
                    second: { action: 'buy', page: secondProduct }
                })
                .then(usersIds => usersIds.map(userId => `User${parseInt(userId) + 1}`));

            results.push({
                type: 'products_join',
                value: `${firstProduct}_${secondProduct}`,
                boughtBy
            });
        }

        return res.send(results);
    }
}

module.exports = CustomersProductIndexController;
