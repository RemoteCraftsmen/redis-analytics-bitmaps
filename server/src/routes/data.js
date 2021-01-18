const express = require('express');
const DataStoreController = require('../controllers/Data/StoreController');
const AnalyzerService = require('../services/event/AnalyzerService');
const EventService = require('../services/event/EventService');
const RedisService = require('../services/RedisService');
const router = express.Router();

module.exports = app => {
    const redisService = new RedisService();

    const storeController = new DataStoreController(
        redisService,
        new EventService('analytics', redisService),
        new AnalyzerService('analytics', redisService)
    );

    router.post('/', (...args) => storeController.invoke(...args));

    return router;
};
