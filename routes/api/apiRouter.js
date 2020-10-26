const express = require('express');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const router = express.Router();
const authRouter = require('./auth');
const openingRouter = require('./opening');

// router.get('/login', authController.loginView);

router.use('/auth', authRouter);
router.use('/opening', isAuthenticated, openingRouter);

router.use('*', (req, res) => res.status(404).send());

module.exports = router;