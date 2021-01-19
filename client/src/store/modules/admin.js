import axios from '@/plugins/axios';

const namespaced = true;

const state = () => ({});

const getters = {};

const mutations = {};

const actions = {
    async flush() {
        await axios.delete('/api/admin/flush');
    }
};

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
