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

const analyzerService = new AnalyzerService('analytics', new RedisService());

const results = async () => {
    return {
        totalTrafficDec: await analyzerService.analyze('increment', 'month:2015-12', 'action', {
            args: { action: 'visit' }
        }),
        totalTrafficDec1: await analyzerService.analyze('increment', 'weekOfMonth:2015-12/1', 'action', {
            args: { action: 'visit' }
        }),
        homepageTrafficDec: await analyzerService.analyze('increment', 'month:2015-12', 'actionObject', {
            args: { action: 'visit', object: 'homepage' }
        }),
        homepageTrafficDec1: await analyzerService.analyze('increment', 'weekOfMonth:2015-12/1', 'actionObject', {
            args: { action: 'visit', object: 'homepage' }
        })
    };
};

results().then(results => {
    console.log(results);

    process.exit(0);
});
