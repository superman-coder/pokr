'use strict';

const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../config');
const User = mongoose.model('User');

module.exports = new GoogleStrategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL
    },

	// after login from google server successfully
	// 1. refreshToken can be used for access new token and maybe undefined if server issue new token
	// 2. Passport normalized profile information to the extend possible
    function (accessToken, refreshToken, profile, done) {
        const options = {
            criteria: {'google.id': profile.id}
        };

		// find user. if not exist. create one
        User.load(options, function (err, user) {
            if (err) return done(err);
            if (!user) {
				// create user model
                user = new User({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    username: profile.username,
                    provider: 'google',
					// convert profile information into google tag
                    google: profile._json
                });

				// save to database
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
