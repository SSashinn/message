const express = require('express');
const router = express.Router();
const pendingController = require('../controllers/pending.controller.js');

router.post('/pending',pendingController.pendingRequest);
router.post('/reject',pendingController.rejectRequest);
router.post('/accept',pendingController.acceptRequest);

module.exports = router;