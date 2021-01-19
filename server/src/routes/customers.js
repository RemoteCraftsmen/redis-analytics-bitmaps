const express = require('express');
const CustomersCohortShowController = require('../controllers/Customers/CohortShowController');
const CustomersProductIndexController = require('../controllers/Customers/ProductsIndexController');
const PeriodService = require('../services/PeriodService');
const RedisService = require('../services/RedisService');
const AnalyzerService = require('../services/event/AnalyzerService');
const router = express.Router();

module.exports = app => {
    const redisService = new RedisService();
    const periodService = new PeriodService();
    const analyzerService = new AnalyzerService('analytics', redisService);

    const cohortShowController = new CustomersCohortShowController(redisService, analyzerService);
    const productIndexController = new CustomersProductIndexController(redisService, periodService, analyzerService);

    router.get('/cohort', (...args) => cohortShowController.invoke(...args));
    router.get('/products', (...args) => productIndexController.invoke(...args));

    return router;
};
