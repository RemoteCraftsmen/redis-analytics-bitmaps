// const EventService = require('./src/services/event/EventService');
// const RedisService = require('./src/services/RedisService');
const dayjs = require('dayjs');

const AnalyzerService = require('./src/services/event/AnalyzerService');
const RedisService = require('./src/services/RedisService');

// const eventService = new EventService('test', new RedisService());

// // userId, date, source, action, page;
// eventService.store(0, '2015-01-01', ['google', 'visit', 'homepage']).then(() => console.log('OK'));
// eventService.store(1, '2015-01-08', ['email', 'visit', 'product2']).then(() => console.log('OK'));
// eventService.store(0, '2015-01-20', ['facebook', 'visit', 'product1']).then(() => console.log('OK'));
// eventService.store(1, '2015-01-01', ['facebook', 'register']).then(() => console.log('OK'));

// const test = ['abc', 'def'];

// const testFunc = test => {
//     return typeof test === 'object' && Array.isArray(test) ? test.join(':') : test;
// };

// console.log(testFunc(test));

const analyzerService = new AnalyzerService('analytics', new RedisService());

const results = async () => {
    return {
        totalTrafficDec: await analyzerService.analyze('increment', 'month', '2015-12', 'action', [null, 'visit']),
        totalTrafficDec1: await analyzerService.analyze('increment', 'weekOfMonth', '2015-12/1', 'action', [
            null,
            'visit'
        ]),
        homepageTrafficDec: await analyzerService.analyze('increment', 'month', '2015-12', 'actionObject', [
            null,
            'visit',
            'homepage'
        ]),
        homepageTrafficDec1: await analyzerService.analyze('increment', 'weekOfMonth', '2015-12/1', 'actionObject', [
            null,
            'visit',
            'homepage'
        ])
    };
};

results().then(results => {
    console.log(results);

    process.exit(0);
});
