const dayjs = require('dayjs');

const testData = [
    { page: 'homepage', source: 'google', date: '2021-01-07' },
    { page: 'product1page', source: 'email', date: '2021-01-07' },
    { page: 'product1page', source: 'direct', date: '2021-01-07' },
    { page: 'homepage', source: 'referral', date: '2021-01-08' },
    { page: 'product2page', source: 'google', date: '2021-01-08' },
    { page: 'product2page', source: 'email', date: '2021-01-08' },
    { page: 'homepage', source: 'direct', date: '2021-01-08' },
    { page: 'product1page', source: 'referral', date: '2021-01-08' },
    { page: 'product3page', source: 'referral', date: '2021-01-09' },
    { page: 'product2page', source: 'referral', date: '2021-01-09' },
    { page: 'homepage', source: 'google', date: '2021-01-10' },
    { page: 'product1page', source: 'email', date: '2021-01-10' },
    { page: 'product1page', source: 'direct', date: '2021-01-10' },
    { page: 'homepage', source: 'referral', date: '2021-01-11' },
    { page: 'product2page', source: 'google', date: '2021-01-11' },
    { page: 'product2page', source: 'email', date: '2021-01-11' },
    { page: 'homepage', source: 'direct', date: '2021-01-11' },
    { page: 'product1page', source: 'referral', date: '2021-01-11' },
    { page: 'product3page', source: 'referral', date: '2021-01-12' },
    { page: 'product2page', source: 'referral', date: '2021-01-12' },
    { page: 'homepage', source: 'google', date: '2021-01-13' },
    { page: 'product1page', source: 'email', date: '2021-01-13' },
    { page: 'product1page', source: 'direct', date: '2021-01-13' },
    { page: 'homepage', source: 'referral', date: '2021-01-14' },
    { page: 'product2page', source: 'google', date: '2021-01-14' },
    { page: 'product2page', source: 'email', date: '2021-01-14' },
    { page: 'homepage', source: 'direct', date: '2021-01-14' },
    { page: 'product1page', source: 'referral', date: '2021-01-14' },
    { page: 'product3page', source: 'referral', date: '2021-01-15' },
    { page: 'product2page', source: 'referral', date: '2021-01-15' },
    { page: 'homepage', source: 'google', date: '2021-01-16' },
    { page: 'product1page', source: 'email', date: '2021-01-16' },
    { page: 'product1page', source: 'direct', date: '2021-01-16' },
    { page: 'homepage', source: 'referral', date: '2021-01-17' },
    { page: 'product2page', source: 'google', date: '2021-01-17' },
    { page: 'product2page', source: 'email', date: '2021-01-17' },
    { page: 'homepage', source: 'direct', date: '2021-01-17' },
    { page: 'product1page', source: 'referral', date: '2021-01-17' },
    { page: 'product3page', source: 'referral', date: '2021-01-18' },
    { page: 'product2page', source: 'referral', date: '2021-01-18' },
    { page: 'homepage', source: 'google', date: '2021-01-19' },
    { page: 'product1page', source: 'email', date: '2021-01-19' },
    { page: 'product1page', source: 'direct', date: '2021-01-19' },
    { page: 'homepage', source: 'referral', date: '2021-01-20' },
    { page: 'product2page', source: 'google', date: '2021-01-20' },
    { page: 'product2page', source: 'email', date: '2021-01-20' },
    { page: 'homepage', source: 'direct', date: '2021-01-20' },
    { page: 'product1page', source: 'referral', date: '2021-01-20' },
    { page: 'product3page', source: 'referral', date: '2021-01-21' },
    { page: 'product2page', source: 'referral', date: '2021-01-21' }
];

class TrafficIndexController {
    async invoke(req, res) {
        const { filter: { between = null } = {} } = req.query;

        const data =
            between && typeof between === 'object' && between.from && between.to
                ? testData.filter(
                      data =>
                          data.date === between.from ||
                          data.date === between.to ||
                          dayjs(data.date).isBetween(between.from, between.to, 'day')
                  )
                : testData;

        return res.send(data);
    }
}

module.exports = TrafficIndexController;
