const express = require('express');
const router = express.Router();
const dmController = require('../controllers/dm.controller.js');

router.post('/dm',dmController.createDM);

module.exports = router;