import axios from '@/plugins/axios';

const namespaced = true;

const state = () => ({});

const getters = {};

const mutations = {};

const actions = {
    async fetchEtriesByTime(vuexContext, between) {
        const { data } = await axios.get('/traffic', { params: { filter: { between } } });

        return data;
    }
};

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
