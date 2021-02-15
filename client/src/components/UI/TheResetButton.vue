<template>
    <v-btn
        depressed
        color="warning"
        large
        :loading="loading"
        :disabled="loading"
        style="width: 100%"
        @click="handleFlush"
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

            try {
                await this.reset();

                this.negateRefreshSignal();

                this.$notify({
                    group: 'main',
                    title: 'Data',
                    text: 'Data reseted!',
                    type: 'success',
                    duration: 400,
                    speed: 400
                });
            } catch (err) {
                console.error(err);

                this.$notify({
                    group: 'main',
                    title: 'Error',
                    text: 'Unexpected error occured.',
                    type: 'error',
                    duration: 400,
                    speed: 400
                });
            }

            this.loading = false;
        }
    }
};
</script>
