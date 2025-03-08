const express = require('express');
const { consumerLogin,getComplianceStatistics,getShopLicenses } = require('../controllers/consumerControllers/consumer');


const router = express.Router();

router.post('/consumer-login', consumerLogin);
router.get('/compliance-statistics', getComplianceStatistics);
// router.get('/shop-licenses', getShopLicenses);
router.get('/shop-licenses', getShopLicenses);
//eporting router
module.exports = router;