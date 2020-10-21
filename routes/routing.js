const express = require('express');
var createError = require('http-errors');
const router = express.Router();
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const indexRouter = require('./pageRoute/index');
const pageRouter = require('./pageRoute/pageRouter');
const apiRouter = require('./api/apiRouter');
// const authRouter = require('./auth');
// const openingRouter = require('./opening');
const authStrategy = require("../shared/authStrategy");
// const checkAuth = require('../middlewares/checkAuth');
const flashCallback = require('../middlewares/flashCallbackHandler');

router.use(session({
    secret: 'secret',
    maxAge: 3600000,
    resave: true,
    saveUninitialized: true
  }));
router.use(passport.initialize());
router.use(passport.session());
router.use(flash());
authStrategy();
router.use(flashCallback);

// Parent routes
// router.use('/', indexRouter);
// router.use('/auth', authRouter);
// router.use('/opening',checkAuth, openingRouter);
router.use('/', pageRouter);
router.use('/api', apiRouter);
router.use('*', pageRouter);


// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});

module.exports = router;