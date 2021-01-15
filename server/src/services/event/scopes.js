module.exports = {
    source: ({ source }) => {
        return source;
    },

    action: ({ action }) => {
        return action;
    },

    actionObject: ({ action, object }) => {
        if (action === 'register') {
            return null;
        }

        return `${action}:${object}`;
    },

    sourceAction: ({ source, action }) => {
        return `${source}:${action}`;
    },

    global: () => {
        return 'global';
    }
};
