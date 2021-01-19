const express = require('express');
const router = express.Router();

module.exports = di => {
    const clearRedisController = di.get('controllers.admin.clearRedis');

    router.delete('/flush', (...args) => clearRedisController.invoke(...args));

    return router;
};
