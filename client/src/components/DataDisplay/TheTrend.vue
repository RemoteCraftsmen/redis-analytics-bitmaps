<template>
    <v-card :height="650" :loading="loading">
        <v-card-title>Trend chart (pages)</v-card-title>

        <v-card-actions>
            <base-period-select @onSelect="fetchTrafficData" />
        </v-card-actions>

        <v-card-text>
            <the-trend-chart :chart-data="chartData" />
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        theTrendChart: () => import('@/components/DataDisplay/Charts/TheTrendChart'),
        basePeriodSelect: () => import('@/components/UI/BasePeriodSelect')
    },

    data() {
        return {
            chartData: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [
                    {
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }
                ]
            },
            period: null,
            loading: false
        };
    },

    computed: {
        ...mapGetters({ refreshSignal: 'data/refreshSignal' })
    },

    watch: {
        refreshSignal() {
            this.fetchTrafficData(this.period);
        }
    },

    methods: {
        ...mapActions({ fetchTraffic: 'traffic/fetch' }),

        async fetchTrafficData(period) {
            this.period = period;
            this.loading = true;

            console.log(period);

            const periods = {
                dec_week_1: ['dec_week_1'],
                dec_week_2: ['dec_week_2', 'dec_week_1'],
                dec_week_3: ['dec_week_3', 'dec_week_2', 'dec_week_1'],
                dec_week_4: ['dec_week_4', 'dec_week_3', 'dec_week_2', 'dec_week_1'],
                dec_week_5: ['dec_week_5', 'dec_week_4', 'dec_week_3', 'dec_week_2', 'dec_week_1']
            };

            const _period = !period
                ? ['dec_week_5', 'dec_week_4', 'dec_week_3', 'dec_week_2', 'dec_week_1']
                : periods[period];

            console.log(_period);

            const {
                homepageTraffic,
                product1pageTraffic,
                product2pageTraffic,
                product3pageTraffic
            } = await this.fetchTraffic({
                filter: {
                    period: _period,
                    search: ['homepage', 'product1page', 'product2page', 'product3page'],
                    type: 'page'
                }
            });

            this.loading = false;
            this.homepageTraffic = homepageTraffic;
            this.product1pageTraffic = product1pageTraffic;
            this.product2pageTraffic = product2pageTraffic;
            this.product3pageTraffic = product3pageTraffic;
        }
    }
};
</script>
