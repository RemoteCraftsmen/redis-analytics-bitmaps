const fs = require('fs');
const path = require('path');
const faker = require('faker');
const dayjs = require('dayjs');
const di = require('../di');

const periodService = di.get('services.period');

const samplePath = path.join(__dirname, '..', 'sample.json');

const actions = [
    { action: 'register' },
    { action: 'visit', page: 'homepage' },
    { action: 'visit', page: 'product1' },
    { action: 'visit', page: 'product2' },
    { action: 'visit', page: 'product3' },
    { action: 'addToCart', page: 'product1' },
    { action: 'addToCart', page: 'product2' },
    { action: 'addToCart', page: 'product3' },
    { action: 'addToCart', page: 'product1' },
    { action: 'addToCart', page: 'product2' },
    { action: 'addToCart', page: 'product3' },
    { action: 'buy', page: 'product1' },
    { action: 'buy', page: 'product2' },
    { action: 'buy', page: 'product3' }
];

const dates = periodService.getRangeOfDates('2015-12-01', '2015-12-31', 'day').map(date => date.format('YYYY-MM-DD'));

const sources = ['google', 'facebook', 'email', 'direct', 'referral', 'none'];

const users = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const maxUsersPerDay = 2;

const data = [];

for (const date of dates) {
    const _users = faker.random.arrayElements(users, faker.random.number(maxUsersPerDay - 1) + 1);

    for (const userId of _users) {
        const actionParams = faker.random.arrayElement(actions);
        const source = faker.random.arrayElement(sources);

        data.push({ date, source, actionParams, userId });
    }
}

data.sort((a, b) => {
    if (a.date === b.date) {
        if (a.actionParams.action === 'register' && b.actionParams !== 'register') {
            return -1;
        }

        if (a.actionParams.action !== 'register' && b.actionParams === 'register') {
            return 1;
        }

        return 0;
    }

    return dayjs(a.date).isAfter(b.date) ? 1 : -1;
});

fs.writeFileSync(samplePath, JSON.stringify(data, null, 4).concat('\n'));
