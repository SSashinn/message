const express = require('express');
const router = express.Router();
const friendController = require('../controllers/friend.controller.js');

router.post('/addfriend',friendController.addFriend);
router.post('/all',friendController.allFriends);

module.exports = router;