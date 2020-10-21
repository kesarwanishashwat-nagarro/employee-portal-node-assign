var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const passport = require('passport');
const BadRequestErrorHandler = require('../../middlewares/badRequestErrorHandler');
const userRepository = require('../../repositories/user-repository');
const authController = require('../../controllers/auth-controller');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/auth/login',
        successRedirect: '/',
        failureFlash: true
    })(req, res, next);
});


router.post('/register', [
    body('email')
        .exists()
        .isEmail().withMessage('email is not valid')
        .custom(async (value, { req }) => {
            const userEntity = await userRepository.getUserByEmail(value);
            return !userEntity || Promise.reject('E-mail already in use');
        }),
    body('password').exists().isLength({ min: 4 }),
    body('confirmpass').exists()
        .custom((value, { req }) => {
            return value === req.body.password || Promise.reject('Both the passwords do not match');
        }),
    body('role')
        .exists()
        .isIn(['Manager', 'Employee']).withMessage('Please provide a valid role')

], BadRequestErrorHandler, authController.registerUser);

module.exports = router;