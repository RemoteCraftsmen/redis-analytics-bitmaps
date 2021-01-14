const Event = require('./src/services/event/Event');

const event = new Event('test');

// userId, date, source, action, page;
event.store(0, '2015-01-01', 'google', 'visit', 'homepage').then(() => console.log('OK'));
event.store(1, '2015-01-08', 'email', 'visit', 'product2').then(() => console.log('OK'));
event.store(0, '2015-01-20', 'facebook', 'visit', 'product1').then(() => console.log('OK'));
event.store(1, '2015-01-01', 'facebook', 'register', 'product1').then(() => console.log('OK'));

const test = ['abc', 'def'];

const testFunc = test => {
    return typeof test === 'object' && Array.isArray(test) ? test.join(':') : test;
};

console.log(testFunc(test));
