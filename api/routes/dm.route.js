const express = require('express');
const router = express.Router();
const dmController = require('../controllers/dm.controller.js');

router.post('/dm',dmController.createDM);
router.post('/message', dmController.sendMsg);
router.post('/chats', dmController.getMsg);
router.post('/sidebar', dmController.sidebar);

module.exports = router;