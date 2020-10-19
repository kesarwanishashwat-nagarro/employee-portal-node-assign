const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const user = require('./db-models/userModel.js');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new localStrategy({usernameField: 'email' }, (email, password, done) => {
        try{
            user.findOne({ email: email}, (err, data) => {
                if(!data){
                    console.log('no data');
                    return done(null, false, { message: "User does not exists."})
                }
                bcrypt.compare(password, data.password, (err, match) => {
                    if(!match){
                        console.log('no match');
                        return done('Not authenticated', false, { message: "Username/Password do not match."})
                    } else {
                        console.log('matched');
                        return done(null, data);
                    }
                })
            })
        } catch(err){
            done(null, false)
        }
    }));

    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });

    passport.deserializeUser((id, cb) => {
        user.findById(id, (err, user) => {
            cb(err, user);
        })
    });
};
