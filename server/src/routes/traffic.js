const express = require('express');
const TrafficIndexController = require('../controllers/Traffic/IndexController');
const RedisService = require('../services/RedisService');
const router = express.Router();

module.exports = app => {
    const indexController = new TrafficIndexController(new RedisService());

    router.get('/', (...args) => indexController.invoke(...args));

    return router;
};
