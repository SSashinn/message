const express = require('express');
const router = express.Router();
const pendingController = require('../controllers/pending.controller.js');

router.post('/pending',pendingController.pendingRequest);
router.post('/reject',pendingController.rejectRequest);

module.exports = router;