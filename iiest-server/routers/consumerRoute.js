const express = require('express');
const { consumerLogin,getComplianceStatistics,getShopLicenses,getAllEmployeeSales,getAllBusinessTypes,getAllCities,getLicensesByBusinessAndCity,getAllLicense } = require('../controllers/consumerControllers/consumer');


const router = express.Router();

router.post('/consumer-login', consumerLogin);
router.get('/compliance-statistics', getComplianceStatistics);
router.get('/shop-licenses', getShopLicenses);
router.get('/allSales', getAllEmployeeSales);
router.get('/businessTypes', getAllBusinessTypes);
router.get('/cities', getAllCities);
router.get("/licenses", getLicensesByBusinessAndCity);
router.get("/all-licenses", getAllLicense);

module.exports = router;