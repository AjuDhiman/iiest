const express = require('express');
const { consumerLogin,getComplianceStatistics,getShopLicenses,getAllEmployeeSales,getShopsByBoId,getAllBusinessTypes,getAllCities,getLicensesByBusinessAndCity,getAllLicense } = require('../controllers/consumerControllers/consumer');
const { getChatMessages,saveMessage,getMessagesBySender } = require('../controllers/chatControllers/chat');
const { uploadChatFile } = require('../config/s3Bucket');


const router = express.Router();

router.post('/consumer-login', consumerLogin);
router.get('/compliance-statistics', getComplianceStatistics);
router.get('/shop-licenses', getShopLicenses);
router.get('/allSales', getAllEmployeeSales);
router.get('/businessTypes', getAllBusinessTypes);
router.get('/cities', getAllCities);
router.get("/licenses", getLicensesByBusinessAndCity);
router.get("/all-licenses", getAllLicense);
// router.get("/chat", getChatMessages);
// router.post('/save-chat', saveMessage);
router.post(
    '/save-chat',
    uploadChatFile.fields([{ name: 'file', maxCount: 1 }]),
    saveMessage
  );
router.get('/get-chat-by-sender', getMessagesBySender); 
router.get("/shops-By-BoId", getShopsByBoId);

module.exports = router;