var express = require('express');
var router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const user = require('../shared/models/userModel.js');



router.get('/login', function (req, res, next) {
    res.render('index',
        { pageName: './pages/login.ejs', pageObj: {}, title: 'Employee portal | Login', hideNavbar: true }
    );
});


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        failureRedirect: '/auth/login',
        successRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', function (req, res, next) {
    req.logOut();
    res.redirect('/');
});

router.get('/register', function (req, res, next) {
    res.render('index',
        {
            pageName: './pages/register.ejs', pageObj: {
                error: false
            }, title: 'Employee portal | Signup', hideNavbar: true
        }
    );
});

router.post('/register', function (req, res, next) {
    let { email, name, password, role } = req.body;
    console.log(req.body);
    user.findOne({ email: email }, (err, data) => {
        if (data) {
            console.log('user exists');
            res.render('index',
                {
                    pageName: './pages/register.ejs', pageObj: {
                        error: 'User already Exists'
                    }, title: 'Employee portal | Signup', hideNavbar: true
                }
            );
        } else {
            try {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        password = hash;
                        user({ email, name, password, role }).save((err, data) => {
                            req.flash('success', 'Registered succesfully');
                            res.redirect('/auth/login');
                        })
                    })
                })
            } catch (err) {
                res.render('index',
                    {
                        pageName: './pages/register.ejs', pageObj: {
                            error: err
                        }, title: 'Employee portal | Signup', hideNavbar: true
                    }
                );
            }
        }
    })
});

module.exports = router;