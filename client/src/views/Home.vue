<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" lg="3">
                <the-analytics-demo-form />
            </v-col>

            <v-col cols="12" lg="9">
                <the-analytics-data>
                    <v-icon @click="negateRefreshSignal">mdi-refresh</v-icon>
                </the-analytics-data>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    components: {
        theAnalyticsDemoForm: () => import('@/components/TheAnalyticsDemoForm'),
        theAnalyticsData: () => import('@/components/TheAnalyticsData')
    },

    methods: {
        ...mapMutations({ negateRefreshSignal: 'NEGATE_REFRESH_SIGNAL' })
    }
};
</script>
