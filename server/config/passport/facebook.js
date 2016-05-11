'use strict';

const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');
const User = mongoose.model('User');

module.exports = new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL
    },
    // facebook will send back the tokens and profile
    function (accessToken, refreshToken, profile, done) {
        const options = {
            criteria: {'facebook.id': profile.id}
        };
        // find user in database. if not exist. create on
        User.load(options, function (err, user) {
            if (err) return done(err);
            if (!user) {
                // create user
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider: 'facebook',
                    facebook: profile._json
                });
                // save user to database
                user.save(function (err) {
                    if (err) console.log(err);
                    return done(err, user);
                });
            } else {
                return done(err, user);
            }
        });
    }
);

