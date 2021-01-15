module.exports = {
    set: async key => {
        return [1, 2, 3];
    },

    increment: async key => {
        return 5;
    },

    bitmap: async key => {
        return 2;
    },

    key: key => {
        return key;
    }
};
