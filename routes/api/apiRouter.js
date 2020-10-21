var express = require('express');
var router = express.Router();
const authRouter = require('./auth');
const openingRouter = require('./opening');

// router.get('/login', authController.loginView);

router.use('/auth', authRouter);
router.use('/opening', openingRouter);

router.use('*', (req, res) => res.status(404).send());

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

module.exports = router;