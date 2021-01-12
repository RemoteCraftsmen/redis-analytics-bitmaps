const express = require('express');
const CustomerCohortIndexController = require('../controllers/Customers/CohortIndexController');
const PeriodService = require('../services/PeriodService');
const RedisService = require('../services/RedisService');
const router = express.Router();

module.exports = app => {
    const redisService = new RedisService();
    const periodService = new PeriodService();

    const cohortIndexController = new CustomerCohortIndexController(redisService, periodService);

    router.get('/cohort', (...args) => cohortIndexController.invoke(...args));

    return router;
};
