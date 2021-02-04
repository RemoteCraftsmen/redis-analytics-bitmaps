<template>
    <div>
       <v-card>
           <v-tabs v-model="tab">
               <v-tab>Traffic Analytics Data</v-tab>
               <v-tab>Sales Analytics Data</v-tab>
               <v-tab>Customer and Cohort Analysis</v-tab>
           </v-tabs>
       </v-card>

        <v-tabs-items v-model="tab" style="background:none;" class="pb-6 mb-6">
            <v-tab-item>
                <v-row class="mt-3">
                    <v-col cols="12" lg="6">
                        <the-traffic-per-page />
                    </v-col>

                    <v-col cols="12" lg="6">
                        <the-trend />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <the-traffic-per-source />
                    </v-col>
                </v-row>
            </v-tab-item>

            <v-tab-item>
                <v-row class="mt-3">
                    <v-col cols="12" lg="12">
                        <the-total-products-bought />
                    </v-col>

                    <v-col cols="12" lg="6">
                        <the-abandoned-cart />
                    </v-col>

                    <v-col cols="12" lg="6">
                        <the-share-of-products-bought />
                    </v-col>
                </v-row>
            </v-tab-item>

            <v-tab-item>
                <v-row class="mt-3">
                    <v-col cols="12" lg="8">
                        <the-cohort />
                    </v-col>

                    <v-col cols="12" lg="4">
                        <the-customers-per-product />
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" lg="6">
                        <the-customers-with-both-products />
                    </v-col>

                    <v-col cols="12" lg="6">
                        <the-customer-retention />
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tab: null,
        };
    },
    components: {
        theTrafficPerPage: () => import('@/components/DataDisplay/TheTrafficPerPage'),
        theTrafficPerSource: () => import('@/components/DataDisplay/TheTrafficPerSource'),
        theTrend: () => import('@/components/DataDisplay/TheTrend'),
        theTotalProductsBought: () => import('@/components/DataDisplay/TheTotalProductsBought'),
        theAbandonedCart: () => import('@/components/DataDisplay/TheAbandonedCart'),
        theShareOfProductsBought: () => import('@/components/DataDisplay/TheShareOfProductsBought'),
        theCohort: () => import('@/components/DataDisplay/TheCohort'),
        theCustomersPerProduct: () => import('@/components/DataDisplay/TheCustomersPerProduct'),
        theCustomersWithBothProducts: () => import('@/components/DataDisplay/TheCustomersWithBothProducts'),
        theCustomerRetention: () => import('@/components/DataDisplay/TheCustomerRetention')
    }
};
</script>
