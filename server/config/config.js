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
    root: path.join(__dirname, '..'),
//    notifier: notifier
};

module.exports = {
    development: extend(development, defaults),
    test: extend(test, defaults),
    production: extend(production, defaults)
}[process.env.NODE_ENV || 'development'];


module.exports.facebook = {
    clientID: "abc",
    clientSecret: "abc",
    callbackURL: "abc"
};

module.exports.google = {
    clientID: "abc",
    clientSecret: "abc",
    callbackURL: "abc"
};
