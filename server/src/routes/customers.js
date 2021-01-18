const express = require('express');
const CustomersCohortIndexController = require('../controllers/Customers/CohortIndexController');
const CustomersProductIndexController = require('../controllers/Customers/ProductsIndexController');
const PeriodService = require('../services/PeriodService');
const RedisService = require('../services/RedisService');
const AnalyzerService = require('../services/event/AnalyzerService');
const router = express.Router();

module.exports = app => {
    const redisService = new RedisService();
    const periodService = new PeriodService();
    const analyzerService = new AnalyzerService('analytics', redisService);

    const cohortIndexController = new CustomersCohortIndexController(redisService, periodService, analyzerService);
    const productIndexController = new CustomersProductIndexController(redisService, periodService, analyzerService);

    router.get('/cohort', (...args) => cohortIndexController.invoke(...args));
    router.get('/products', (...args) => productIndexController.invoke(...args));

    return router;
};
