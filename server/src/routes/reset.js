const express = require('express');
const router = express.Router();

module.exports = di => {
    const resetController = di.get('controllers.reset');

    router.delete('/', (...args) => resetController.invoke(...args));

    return router;
};
