<template>
    <base-card :title="title" :loading="loading">
        <template #actions>
            <slot name="actions" />
        </template>

        <div>
            <slot />
            <ul>
                <li v-for="item of data" :key="item">{{ item }}</li>
            </ul>
        </div>
    </base-card>
</template>

<script>
export default {
    components: {
        baseCard: () => import('@/components/UI/BaseCard')
    },

    props: {
        title: {
            type: String,
            required: true
        },
        data: {
            type: Array,
            required: false,
            default: () => []
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        }
    }
};
</script>
