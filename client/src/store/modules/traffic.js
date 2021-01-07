import axios from '@/plugins/axios';

const namespaced = true;

const state = () => ({
    entries: []
});

const getters = {
    total: state => state.entries.length,
    perPage: state => page => state.entries.filter(entry => entry.page === page).length,
    perSource: state => source => state.entries.filter(entry => entry.source === source).length
};

const mutations = {
    SET_ENTRIES: (state, entries) => (state.entries = entries)
};

const actions = {
    async fetchEtriesByTime({ commit }, between) {
        const params = {
            'filter[between][from]': between.from,
            'filter[between][to]': between.to
        };

        const { data } = await axios.get('/traffic', { params });

        commit('SET_ENTRIES', data);
    }
};

export default {
    namespaced,
    state,
    getters,
    mutations,
    actions
};
