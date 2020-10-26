const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const openingRouter = require('./opening');
const indexRouter = require('./index');
const checkAuthPage = require('../../middlewares/checkAuthPage');

router.use('/', indexRouter);
router.use('/auth', authRouter);
router.use('/opening',checkAuthPage, openingRouter);


router.use('*', indexRouter);

module.exports = router;