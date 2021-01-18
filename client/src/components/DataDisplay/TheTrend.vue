<template>
    <v-card class="card" :loading="loading">
        <v-card-title>Trend chart (pages)</v-card-title>

        <v-card-actions>
            <base-period-select @onSelect="fetchTrafficData" />
        </v-card-actions>

        <v-card-text>
            <base-line-chart :chart-data="chartData" />
        </v-card-text>
    </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        baseLineChart: () => import('@/components/UI/Charts/BaseLineChart'),
        basePeriodSelect: () => import('@/components/UI/BasePeriodSelect')
    },

    data() {
        return {
            period: null,
            loading: false,
            datasets: [],
            labels: []
        };
    },

    computed: {
        ...mapGetters({ refreshSignal: 'data/refreshSignal' }),

        chartData() {
            const backgroundColor = [
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)',
                'rgba(0, 0, 0, 0)'
            ];

            const borderColorGenerator = borderColor => {
                const colors = [];

                for (let i = 0; i < 31; i++) {
                    colors.push(borderColor);
                }

                return colors;
            };

            const boderColors = [
                borderColorGenerator('rgba(255, 99, 132, 1)'),
                borderColorGenerator('rgba(54, 162, 235, 1)'),
                borderColorGenerator('rgba(255, 206, 86, 1)'),
                borderColorGenerator('rgba(75, 192, 192, 1)')
            ];

            const borderWidth = 1;

            const labels = ['Homepage', 'Product1 Page', 'Product2 Page', 'Product3 Page'];

            const chartData = {
                labels: this.labels,
                datasets: []
            };

            this.datasets.forEach((dataset, index) => {
                chartData.datasets.push({
                    backgroundColor,
                    borderWidth,
                    data: dataset,
                    borderColor: boderColors[index],
                    label: labels[index]
                });
            });

            return chartData;
        }
    },

    watch: {
        refreshSignal() {
            this.fetchTrafficData(this.period);
        }
    },

    methods: {
        ...mapActions({ fetchTrend: 'traffic/fetchTrend' }),

        async fetchTrafficData(period) {
            this.period = period;
            this.loading = true;

            const filter = {
                search: ['homepage', 'product1', 'product2', 'product3'],
                type: 'page',
                trend: true
            };

            if (period) {
                filter.period = period;
            }

            const { homepageTraffic, product1Traffic, product2Traffic, product3Traffic } = await this.fetchTrend({
                filter
            });

            this.loading = false;
            this.datasets = [];
            this.labels = [];

            const homepageData = [];
            const product1pageData = [];
            const product2pageData = [];
            const product3pageData = [];

            const dates = Object.keys(homepageTraffic);

            dates.forEach(date => {
                homepageData.push(homepageTraffic[date]);
                product1pageData.push(product1Traffic[date]);
                product2pageData.push(product2Traffic[date]);
                product3pageData.push(product3Traffic[date]);

                this.labels.push(date);
            });

            this.datasets.push(homepageData, product1pageData, product2pageData, product3pageData);
        }
    }
};
</script>
