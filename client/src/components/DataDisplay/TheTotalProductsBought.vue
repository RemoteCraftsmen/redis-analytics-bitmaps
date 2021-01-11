<template>
    <base-card title="Total Product Bought" :data="totalProductBought">
        <base-period-select @onSelect="fetchSalesData" />
    </base-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    components: {
        baseCard: () => import('@/components/UI/BaseCard'),
        basePeriodSelect: () => import('@/components/UI/BasePeriodSelect')
    },

    data() {
        return {
            totalProductBought: 0,
            period: null,
            loading: false
        };
    },

    methods: {
        ...mapActions({ fetchSales: 'sales/fetch' }),

        async fetchSalesData(period) {
            const { productsBought } = await this.fetchSales({ filter: { period } });

            this.totalProductBought = productsBought;
        }
    }
};
</script>
