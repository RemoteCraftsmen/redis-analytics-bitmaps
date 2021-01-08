import axios from '@/plugins/axios';

const namespaced = true;

const state = () => ({});

const getters = {};

const mutations = {};

const actions = {
    save(vuexContext, data) {
        return axios.post('/data', data);
    }
};

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
