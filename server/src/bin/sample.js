const fs = require('fs');
const path = require('path');
const faker = require('faker');
const dayjs = require('dayjs');

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
    { action: 'buy', page: 'product1' },
    { action: 'buy', page: 'product2' },
    { action: 'buy', page: 'product3' }
];

const sources = ['google', 'facebook', 'email', 'direct', 'referral', 'none'];

const usersCount = 10;

const period = { from: '2015-12-01', to: '2015-12-31' };

const actionsCount = 10;

const data = [];

for (let i = 0; i < actionsCount; i++) {
    data.push({
        actionParams: faker.random.arrayElement(actions),
        date: dayjs(faker.date.between(period.from, period.to)).format('YYYY-MM-DD'),
        source: faker.random.arrayElement(sources),
        userId: faker.random.number(usersCount)
    });
}

fs.writeFileSync(samplePath, JSON.stringify(data, null, 4).concat('\n'));
