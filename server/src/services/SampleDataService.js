class SampleDataService {
    generate() {
        try {
            const data = require('../sample.json');

            console.log(data);
        } catch (err) {}
    }
}

module.exports = SampleDataService;
