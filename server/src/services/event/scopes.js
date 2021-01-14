module.exports = {
    source: source => {
        return source;
    },

    action: (source, action) => {
        return action;
    },

    actionPage: (source, action, object) => {
        if (action === 'register') {
            return null;
        }

        return `${action}:${object}`;
    },

    sourceAction: (source, action) => {
        return `${source}:${action}`;
    },

    global: () => {
        return 'global';
    }
};
