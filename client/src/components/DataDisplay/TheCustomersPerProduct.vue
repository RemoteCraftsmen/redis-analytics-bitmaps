<template>
    <v-card class="card" :loading="loading">
        <v-card-title> Customers who bought only </v-card-title>

        <v-card-actions>
            <v-select v-model="product" :items="values" item-text="text" item-value="value" label="Product" />
        </v-card-actions>

        <v-card-text>
            <ul>
                <li v-for="customer of customers" :key="customer">{{ customer }}</li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            customers: [],
            product: 'product1',
            values: [
                { text: 'Product1', value: 'product1' },
                { text: 'Product2', value: 'product2' },
                { text: 'Product3', value: 'product3' }
            ],
            loading: false
        };
    },

    computed: {
        ...mapGetters({ refreshSignal: 'data/refreshSignal' })
    },

    watch: {
        product() {
            this.fetchProductsData();
        },

        refreshSignal() {
            this.fetchProductsData();
        }
    },

    created() {
        this.fetchProductsData();
    },

    methods: {
        ...mapActions({ fetchProducts: 'customers/fetchProducts' }),

        async fetchProductsData() {
            this.loading = true;

            const data = await this.fetchProducts({ filter: { search: [this.product] } });

            this.loading = false;
            this.customers = data[this.product];
        }
    }
};
</script>

<style></style>
