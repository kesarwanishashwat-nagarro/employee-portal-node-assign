const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('./db-models/userModel.js');

module.exports = () => {
    passport.use('login', new localStrategy({ usernameField: 'email' }, async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('no user');
            return done(null, false, { message: "User does not exists.", customField: 'customValue' })
        }

        const isPasswordValid = await user.isValidPassword(password);
        if (!isPasswordValid) {
            console.log('no match');
            return done(null, false, { message: "Username/Password do not match.", customField: 'customValue' });
        } else {
            console.log('matched');
            return done(null, user);
        }
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        User.findById(id, (err, user) => {
            cb(err, user);
        })
    });
};
