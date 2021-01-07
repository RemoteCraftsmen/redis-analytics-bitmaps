<template>
    <v-select v-model="period" :items="values" item-text="text" item-value="value" label="Time Period" />
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            period: 1,
            values: [
                { text: '1st week of January', value: 1 },
                { text: '2nd week of January', value: 2 },
                { text: '3rd week of January', value: 3 },
                { text: '4th week of January', value: 4 },
                { text: '5th week of January', value: 5 }
            ]
        };
    },

    watch: {
        period() {
            this.fetchTrafficByTime();
        }
    },

    methods: {
        ...mapActions({ fetchTrafficEntriesByTime: 'traffic/fetchEtriesByTime' }),

        async fetchTrafficByTime() {
            let between;

            switch (this.period) {
                case 1:
                    between = {
                        from: '2021-01-01',
                        to: '2021-01-07'
                    };
                    break;
                case 2:
                    between = {
                        from: '2021-01-08',
                        to: '2021-01-14'
                    };
                    break;
                case 3:
                    between = {
                        from: '2021-01-15',
                        to: '2021-01-21'
                    };
                    break;
                case 4:
                    between = {
                        from: '2021-01-22',
                        to: '2021-01-28'
                    };
                    break;
                case 5:
                    between = {
                        from: '2021-01-29',
                        to: '2021-01-31'
                    };
                    break;
            }

            await this.fetchTrafficEntriesByTime(between);
        }
    },

    created() {
        this.fetchTrafficByTime();
    }
};
</script>
