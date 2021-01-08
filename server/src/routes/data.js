const express = require('express');
const DataStoreController = require('../controllers/Traffic/IndexController');
const RedisService = require('../services/RedisService');
const router = express.Router();

module.exports = app => {
    const storeController = new DataStoreController(new RedisService());

    router.get('/', (...args) => storeController.invoke(...args));

    return router;
};
