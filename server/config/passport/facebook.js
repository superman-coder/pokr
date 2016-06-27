'use strict';

const mongoose = require('mongoose');
const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('../config');
const User = mongoose.model('User');

module.exports = new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
        enableProof: true
    },

    // facebook will send back user profile and access token
	// 1. refreshToken can be used for access new token and maybe undefined if server issue new token
	// 2. Passport normalized profile information to the extend possible
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
                    // create facebook information for facebook tag
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

