<template>
    <form @submit.prevent="submitForm">
        <v-select v-model="form.date" :items="selectValues.date" item-text="text" item-value="value" label="Date" />

        <v-select
            v-model="form.cameFrom"
            :items="selectValues.cameFrom"
            item-text="text"
            item-value="value"
            label="Came From"
        />

        <v-select v-model="form.user" :items="selectValues.user" item-text="text" item-value="value" label="User" />

        <v-select
            v-model="form.action"
            :items="selectValues.action"
            item-text="text"
            item-value="value"
            label="Action"
        />

        <v-btn type="submit">Update</v-btn>
    </form>
</template>

<script>
import dayjs from 'dayjs';

export default {
    props: {
        maxUsers: {
            type: Number,
            required: false,
            default: 100
        },
        maxDaysInFuture: {
            type: Number,
            required: false,
            default: 30
        }
    },

    data() {
        return {
            form: {
                date: null,
                cameFrom: null,
                user: null,
                action: null
            },
            selectValues: {
                date: (() => {
                    const dates = [];

                    for (let i = 0; i < this.maxDaysInFuture; i++) {
                        const date = dayjs().add(i, 'day');

                        dates.push({
                            text: date.toString(),
                            value: date.toISOString()
                        });
                    }

                    return dates;
                })(),
                cameFrom: [
                    { text: 'Google Ads', value: 'google' },
                    { text: 'Email', value: 'email' },
                    { text: 'Direct', value: 'direct' },
                    { text: 'Referral', value: 'referral' },
                    { text: 'None', value: 'none' }
                ],
                user: (() => {
                    const users = [];

                    for (let i = 1; i <= this.maxUsers; i++) {
                        users.push({
                            text: `User${i}`,
                            value: `user${i}`
                        });
                    }

                    return users;
                })(),
                action: [
                    { text: 'Register', value: 'register' },
                    { text: 'Visit Product1 Page', value: 'product1page' },
                    { text: 'Visit Product2 Page', value: 'product2page' },
                    { text: 'Visit Product3 Page', value: 'product3page' },
                    { text: 'Add Product1 to Cart', value: 'product1cart' },
                    { text: 'Add Product2 to Cart', value: 'product2cart' },
                    { text: 'Add Product3 to Cart', value: 'product3cart' },
                    { text: 'Buy Product1', value: 'product1buy' },
                    { text: 'Buy Product2', value: 'product2buy' },
                    { text: 'Buy Product3', value: 'product3buy' }
                ]
            }
        };
    },

    methods: {
        submitForm() {
            console.log(this.form);
        }
    }
};
</script>
