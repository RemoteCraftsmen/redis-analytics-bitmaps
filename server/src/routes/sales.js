const express = require('express');
const SalesIndexController = require('../controllers/Sales/IndexController');
const RedisService = require('../services/RedisService');
const AnalyzerService = require('../services/event/AnalyzerService');
const router = express.Router();

module.exports = app => {
    const analyzerService = new AnalyzerService('analytics', new RedisService());

    const indexController = new SalesIndexController(analyzerService);

    router.get('/', (...args) => indexController.invoke(...args));

    return router;
};
