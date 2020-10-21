var express = require('express');
var router = express.Router();

const authController = require('../../controllers/auth-controller');

router.get('/login', authController.loginView);

router.get('/register', authController.registerView);

router.get('/logout', authController.logoutUser);


module.exports = router;