const express = require('express');
const router = express.Router();

//Controllers
const authController = require('./authController')

router.post('/login',authController.postLogin);
router.get('/check',authController.getCheckSession);
router.get('/logout',authController.getLogout);

module.exports = router;
