const testData = [
    { page: 'homepage', from: 'google', date: '2021-01-07' },
    { page: 'product1page', from: 'email', date: '2021-01-07' },
    { page: 'product1page', from: 'direct', date: '2021-01-07' },
    { page: 'homepage', from: 'referral', date: '2021-01-08' },
    { page: 'product2page', from: 'google', date: '2021-01-08' },
    { page: 'product2page', from: 'email', date: '2021-01-08' },
    { page: 'homepage', from: 'direct', date: '2021-01-08' },
    { page: 'product1page', from: 'referral', date: '2021-01-08' },
    { page: 'product3page', from: 'referral', date: '2021-01-09' },
    { page: 'product2page', from: 'referral', date: '2021-01-09' }
];

class TrafficIndexController {
    async invoke(req, res) {
        return res.send(testData);
    }
}

module.exports = TrafficIndexController;
