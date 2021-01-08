<template>
    <base-traffic-card title="Total Traffic" :traffic="totalTraffic">
        <base-period-select @onSelect="onSelect" />
    </base-traffic-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    components: {
        baseTrafficCard: () => import('@/components/UI/BaseTrafficCard'),
        basePeriodSelect: () => import('@/components/UI/BasePeriodSelect')
    },

    data() {
        return {
            totalTraffic: 0
        };
    },

    methods: {
        ...mapActions({ fetchEtriesByTime: 'traffic/fetchEtriesByTime' }),

        async onSelect(between) {
            const data = await this.fetchEtriesByTime(between);

            this.totalTraffic = data.length;
        }
    }
};
</script>
