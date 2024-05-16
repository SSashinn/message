const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller.js');

router.post('/signup',userController.signup_post);
router.post('/signin',userController.signin_post);
router.get('/signout',userController.signOut);

module.exports = router;