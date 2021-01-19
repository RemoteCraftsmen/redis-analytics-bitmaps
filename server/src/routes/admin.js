const express = require('express');
const AdminClearRedisController = require('../controllers/Admin/ClearRedisController');
const RedisService = require('../services/RedisService');
const router = express.Router();

module.exports = app => {
    const clearRedisController = new AdminClearRedisController(new RedisService());

    router.delete('/flush', (...args) => clearRedisController.invoke(...args));

    return router;
};
