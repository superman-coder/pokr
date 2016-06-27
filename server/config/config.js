'use strict';

const path = require('path');
const extend = require('util')._extend;

const development = require('./env/development');
const test = require('./env/test');
const production = require('./env/production');

const notifier = {
    service: 'postmark',
    APN: false,
    email: true, // true
    actions: ['comment'],
    tplPath: path.join(__dirname, '..', 'app/mailer/templates'),
    key: 'POSTMARK_KEY'
};

const defaults = {
    root: path.join(__dirname, '..')
//    notifier: notifier
};

module.exports = {
    development: extend(development, defaults),
    test: extend(test, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];


module.exports.facebook = {
    clientID: "1721549544801336",
    clientSecret: "3de7d7e48503d4b738668699e7b87c5b",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
};

// currently is Pakr project
module.exports.google = {
    clientID: "803921065829-ukp14bumdkqg244k5omrbqv1jor6c4nn.apps.googleusercontent.com",
    clientSecret: "BI0lFmQ_8ahh139WhUUFveh-",
    callbackURL: "http://localhost:3000/auth/google/callback"
};
