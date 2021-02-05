<template>
    <div>
       <v-card>
           <v-tabs v-model="tab">
               <v-tab>Traffic Analytics Data</v-tab>
               <v-tab>Sales Analytics Data</v-tab>
               <v-tab>Customer and Cohort Analysis</v-tab>
           </v-tabs>
       </v-card>

        <v-alert
                text
                dense
                color="info"
                class="mt-6 mb-0"
                border="left"
        >
            <v-row
                align="center"
                no-gutters
            >
                <v-col class="grow">
                    <h3 class="headline">
                        How it works?
                    </h3>
                </v-col>
                <v-col class="shrink">
                    <v-btn
                        color="info"
                        outlined
                        @click="alert = !alert"
                    >
                        {{ alert ? 'Collapse' : 'View more'}}
                    </v-btn>
                </v-col>
            </v-row>

            <v-divider v-show="alert"
                class="my-4 info"
                style="opacity: 0.22"
            ></v-divider>

            <div v-show="alert">
                <p>Maecenas nec odio et ante tincidunt tempus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci.</p>
                <ol>
                    <li>Proin viverra, ligula sit amet ultrices semper:</li>
                    <ul class="mb-5">
                        <li>ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Curabitur turpis.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Sed in odio eget orci convallis pellentesque eu ut felis</li>
                    </ul>

                    <li>Proin viverra, ligula sit ultrices accumsan:</li>
                    <ul class="mb-5">
                        <li>- ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Curabitur turpis.</li>
                        <li>- Sed in odio eget orci convallis pellentesque eu ut felis</li>
                    </ul>

                    <li>Proin viverra, ligula sit amet ultrices:</li>
                    <ul class="mb-5">
                        <li>- Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    </ul>
                </ol>
             </div>
        </v-alert>

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
            alert: false,
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
