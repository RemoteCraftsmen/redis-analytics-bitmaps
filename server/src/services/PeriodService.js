class PeriodService {
    constructor() {
        this.periods = [
            {
                from: '2015-12-01',
                to: '2015-12-07',
                name: 'dec_week_1'
            },
            {
                from: '2015-12-08',
                to: '2015-12-14',
                name: 'dec_week_2'
            },
            {
                from: '2015-12-15',
                to: '2015-12-21',
                name: 'dec_week_3'
            },
            {
                from: '2015-12-22',
                to: '2015-12-28',
                name: 'dec_week_4'
            },
            {
                from: '2015-12-29',
                to: '2015-12-31',
                name: 'dec_week_5'
            }
        ];
    }

    getRangeOfDates(start, end, key, arr = []) {
        if (start.isAfter(end)) {
            throw new Error('start must precede end');
        }

        const next = start.add(1, key).startOf(key);

        if (next.isAfter(end, key)) {
            return arr;
        }

        return this.getRangeOfDates(next, end, key, arr.concat(next));
    }
}

module.exports = PeriodService;
