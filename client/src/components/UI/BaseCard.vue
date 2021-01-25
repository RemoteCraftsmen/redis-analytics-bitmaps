<template>
    <v-card tile elevation="0" class="gray--text text--darken-3 card" :loading="loading">
        <v-card-title class="subtitle-1 pa-3">
            <slot name="title">
                {{ title }}
            </slot>
        </v-card-title>

        <v-card-text class="display-1 font-weight-black pa-3">
            <slot>
                {{ data }}
            </slot>
        </v-card-text>

        <v-card-actions class="pa-3">
            <slot name="actions" />
        </v-card-actions>

        <template #progress>
            <v-progress-linear indeterminate />
        </template>
    </v-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: false,
            default: ''
        },
        data: {
            type: [Number, String],
            required: false,
            default: 0
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        height: {
            type: Number,
            required: false,
            default: null
        }
    }
};
</script>
