<template>
    <base-card class="card" title="Share of Products bought" :loading="loading">
        <template #actions>
            <base-period-select @onSelect="fetchSalesData" />
        </template>

        <div class="chart">
            <base-pie-chart class="w65" :chart-data="chartData" />
        </div>
    </base-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        basePeriodSelect: () => import('@/components/UI/BasePeriodSelect'),
        basePieChart: () => import('@/components/UI/Charts/BasePieChart'),
        baseCard: () => import('@/components/UI/BaseCard')
    },

    data() {
        return {
            product1Bought: 0,
            product2Bought: 0,
            product3Bought: 0,
            period: null,
            loading: false
        };
    },

    computed: {
        ...mapGetters({ refreshSignal: 'refreshSignal' }),

        chartData() {
            return {
                labels: ['Product1', 'Product2', 'Product3'],
                datasets: [
                    {
                        data: [this.product1Bought, this.product2Bought, this.product3Bought],
                        backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(200, 250, 5, 90)'],
                        borderWidth: 0
                    }
                ]
            };
        }
    },

    watch: {
        refreshSignal() {
            this.fetchSalesData(this.period);
        }
    },

    methods: {
        ...mapActions({ fetchSales: 'fetchSales' }),

        async fetchSalesData(period) {
            this.period = period;
            this.loading = true;

            const data = await this.fetchSales({ period, filter: { products: ['product1', 'product2', 'product3'] } });

            this.product1Bought = data.find(obj => obj.value === 'product1').bought;
            this.product2Bought = data.find(obj => obj.value === 'product2').bought;
            this.product3Bought = data.find(obj => obj.value === 'product3').bought;
            this.loading = false;
        }
    }
};
</script>
