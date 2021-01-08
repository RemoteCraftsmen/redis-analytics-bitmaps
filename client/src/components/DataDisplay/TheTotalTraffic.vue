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
        ...mapActions({ fetchTraffic: 'traffic/fetch' }),

        async onSelect(period) {
            const { totalTraffic } = await this.fetchTraffic({ filter: { period } });

            this.totalTraffic = totalTraffic;
        }
    }
};
</script>
