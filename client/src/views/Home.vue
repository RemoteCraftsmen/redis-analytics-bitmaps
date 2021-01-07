<template>
    <v-container fluid>
        <v-row>
            <v-col cols="3">
                <the-analytics-demo-form />
            </v-col>

            <v-col cols="9">
                <the-analytics-charts />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    components: {
        theAnalyticsDemoForm: () => import('@/components/TheAnalyticsDemoForm'),
        theAnalyticsCharts: () => import('@/components/TheAnalyticsCharts')
    }
};
</script>
