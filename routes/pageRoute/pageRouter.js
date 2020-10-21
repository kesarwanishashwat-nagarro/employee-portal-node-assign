var express = require('express');
var router = express.Router();
// const passport = require('passport');
const authRouter = require('./auth');
const openingRouter = require('./opening');
// const authController = require('../controllers/auth-controller');
const indexRouter = require('./index');

// router.get('/login', authController.loginView);
router.use('/', indexRouter);
router.use('/auth', authRouter);
router.use('/opening', openingRouter);

// router.post('/login', (req, res, next) => {
//     passport.authenticate('local', {
//         failureRedirect: '/auth/login',
//         successRedirect: '/',
//         failureFlash: true
//     })(req, res, next);
// });

// router.get('/logout', authController.logoutUser);

// router.get('/register', authController.registerView);

// router.post('/register', authController.registerUser);

router.use('*', indexRouter);

module.exports = router;