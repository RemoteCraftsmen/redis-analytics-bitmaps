<template>
    <v-btn
        depressed
        color="warning"
        large
        :loading="loading"
        :disabled="loading"
        @click="handleFlush"
        style="width: 100%"
    >
        Reset Data
        <v-icon right dark>mdi-restart</v-icon>
    </v-btn>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            loading: false
        };
    },

    methods: {
        ...mapActions({ reset: 'reset' }),
        ...mapMutations({ negateRefreshSignal: 'NEGATE_REFRESH_SIGNAL' }),

        async handleFlush() {
            this.loading = true;

            await this.reset();

            this.loading = false;

            this.negateRefreshSignal();

            this.$notify({
                group: 'main',
                title: 'Data',
                text: 'Data reseted!',
                type: 'success',
                duration: 400,
                speed: 400
            });
        }
    }
};
</script>
