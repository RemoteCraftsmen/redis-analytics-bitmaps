<template>
    <v-card>
        <v-card-title>Traffic per Source</v-card-title>

        <v-card-actions>
            <base-period-select @onSelect="onSelect" />
        </v-card-actions>

        <v-card-text>
            <v-row>
                <v-col cols="6">
                    <base-traffic-card title="Google Ads" :traffic="googleTraffic" />
                </v-col>

                <v-col cols="6">
                    <base-traffic-card title="Facebook Ads" :traffic="facebookTraffic" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6">
                    <base-traffic-card title="Email" :traffic="emailTraffic" />
                </v-col>

                <v-col cols="6">
                    <base-traffic-card title="Direct" :traffic="directTraffic" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6">
                    <base-traffic-card title="Referral" :traffic="referralTraffic" />
                </v-col>

                <v-col cols="6">
                    <base-traffic-card title="None" :traffic="noneTraffic" />
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
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
            googleTraffic: 0,
            facebookTraffic: 0,
            emailTraffic: 0,
            directTraffic: 0,
            referralTraffic: 0,
            noneTraffic: 0
        };
    },

    methods: {
        ...mapActions({ fetchEtriesByTime: 'traffic/fetchEtriesByTime' }),

        countEntriesBySource(entries, source) {
            return entries.filter(entry => entry.source === source).length;
        },

        async onSelect(between) {
            const data = await this.fetchEtriesByTime(between);

            this.googleTraffic = this.countEntriesBySource(data, 'google');
            this.facebookTraffic = this.countEntriesBySource(data, 'facebook');
            this.emailTraffic = this.countEntriesBySource(data, 'email');
            this.directTraffic = this.countEntriesBySource(data, 'direct');
            this.referralTraffic = this.countEntriesBySource(data, 'referral');
            this.noneTraffic = this.countEntriesBySource(data, 'none');
        }
    }
};
</script>
