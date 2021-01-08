<template>
    <v-container fluid>
        <v-row>
            <v-col cols="3">
                <v-card>
                    <v-card-title>Analytics Demo Form</v-card-title>

                    <v-card-text>
                        <the-analytics-demo-form :max-users="5" />
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="9">
                <v-card>
                    <v-card-title>Analytics Data</v-card-title>

                    <v-card-text>
                        <the-analytics-data />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    components: {
        theAnalyticsDemoForm: () => import('@/components/TheAnalyticsDemoForm'),
        theAnalyticsData: () => import('@/components/TheAnalyticsData')
    }
};
</script>
