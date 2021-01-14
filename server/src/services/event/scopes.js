module.exports = {
    source: source => {
        return source;
    },

    action: (source, action) => {
        return action;
    },

    actionPage: (source, action, page) => {
        if (action !== 'visit') {
            return null;
        }

        return `${action}:${page}`;
    },

    sourceAction: (source, action) => {
        return `${source}:${action}`;
    },

    global: () => {
        return 'global';
    }
};
