const express = require('express');
const CustomersCohortShowController = require('../controllers/Customers/CohortShowController');
const CustomersProductIndexController = require('../controllers/Customers/ProductsIndexController');
const RedisService = require('../services/RedisService');
const AnalyzerService = require('../services/event/AnalyzerService');
const CustomersRetentionShowController = require('../controllers/Customers/RetentionShowController');
const router = express.Router();

module.exports = app => {
    const analyzerService = new AnalyzerService('analytics', new RedisService());

    const cohortShowController = new CustomersCohortShowController(analyzerService);
    const productIndexController = new CustomersProductIndexController(analyzerService);
    const retentionShowControlelr = new CustomersRetentionShowController(analyzerService);

    router.get('/cohort', (...args) => cohortShowController.invoke(...args));
    router.get('/products', (...args) => productIndexController.invoke(...args));
    router.get('/retention', (...args) => retentionShowControlelr.invoke(...args));

    return router;
};
