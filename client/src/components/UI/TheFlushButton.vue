<template>
    <div class="btn">
        <v-btn @click="handleFlush">Flush Redis <v-icon>mdi-delete</v-icon></v-btn>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions({ flush: 'admin/flush' }),

        async handleFlush() {
            if (!window.confirm('Are you sure, you want to flush redis? It cannot be undone.')) {
                return;
            }

            await this.flush();
        }
    }
};
</script>

<style scoped>
.btn {
    position: fixed;
    top: 90%;
    left: 1%;
}

@media screen and (max-width: 1263px) {
    .btn {
        position: static;
        padding: 1%;
    }
}
</style>
