<template>
    <v-card>
        <v-card-title>Traffic per Page</v-card-title>

        <v-card-actions>
            <base-period-select @onSelect="onSelect" />
        </v-card-actions>

        <v-card-text>
            <v-row>
                <v-col cols="6">
                    <base-traffic-card title="Homepage" :traffic="homepageTraffic" />
                </v-col>

                <v-col cols="6">
                    <base-traffic-card title="Product 1 Page" :traffic="product1pageTraffic" />
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="6">
                    <base-traffic-card title="Product 2 Page" :traffic="product2pageTraffic" />
                </v-col>

                <v-col cols="6">
                    <base-traffic-card title="Product 3 Page" :traffic="product3pageTraffic" />
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
            homepageTraffic: 0,
            product1pageTraffic: 0,
            product2pageTraffic: 0,
            product3pageTraffic: 0
        };
    },

    methods: {
        ...mapActions({ fetchEtriesByTime: 'traffic/fetchEtriesByTime' }),

        countEntriesByPage(entries, page) {
            return entries.filter(entry => entry.page === page).length;
        },

        async onSelect(between) {
            const data = await this.fetchEtriesByTime(between);

            this.homepageTraffic = this.countEntriesByPage(data, 'homepage');
            this.product1pageTraffic = this.countEntriesByPage(data, 'product1page');
            this.product2pageTraffic = this.countEntriesByPage(data, 'product2page');
            this.product3pageTraffic = this.countEntriesByPage(data, 'product3page');
        }
    }
};
</script>
