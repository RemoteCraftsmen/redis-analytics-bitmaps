<template>
    <v-select v-model="periodId" :items="values" item-text="text" item-value="value" label="Time Period" />
</template>

<script>
export default {
    data() {
        return {
            periodId: 0,
            periods: [
                {
                    from: '2015-12-01',
                    to: '2015-12-07'
                },
                {
                    from: '2015-12-08',
                    to: '2015-12-14'
                },
                {
                    from: '2015-12-15',
                    to: '2015-12-21'
                },
                {
                    from: '2015-12-22',
                    to: '2015-12-28'
                },
                {
                    from: '2015-12-29',
                    to: '2015-12-31'
                },
                {
                    from: '2015-12-01',
                    to: '2015-12-31'
                }
            ],
            values: [
                { text: '1st week of December', value: 0 },
                { text: '2nd week of December', value: 1 },
                { text: '3rd week of December', value: 2 },
                { text: '4th week of December', value: 3 },
                { text: '5th week of December', value: 4 },
                { text: 'December', value: 5 }
            ]
        };
    },

    watch: {
        periodId(id) {
            const period = this.periods[id];

            this.$emit('onSelect', period);
        }
    },

    created() {
        this.$emit('onSelect', this.periods[this.periodId]);
    }
};
</script>
