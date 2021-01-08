<template>
    <base-traffic-card title="Total Traffic" :traffic="totalTraffic">
        <base-period-select @onSelect="fetchTrafficData" />
    </base-traffic-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        baseTrafficCard: () => import('@/components/UI/BaseTrafficCard'),
        basePeriodSelect: () => import('@/components/UI/BasePeriodSelect')
    },

    data() {
        return {
            totalTraffic: 0,
            period: null
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

            const { totalTraffic } = await this.fetchTraffic({ filter: { period } });

            this.totalTraffic = totalTraffic;
        }
    }
};
</script>
