<template>
    <base-traffic-card title="Total Traffic" :traffic="totalTraffic">
        <base-period-select />
    </base-traffic-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    components: {
        baseTrafficCard: () => import('@/components/UI/BaseTrafficCard'),
        basePeriodSelect: () => import('@/components/UI/BasePeriodSelect')
    },

    computed: {
        ...mapGetters({ totalTraffic: 'traffic/total' })
    }
};
</script>
