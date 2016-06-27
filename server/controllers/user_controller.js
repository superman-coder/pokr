'use strict';


/** module dependencies */

const mongoose = require('mongoose');
const crypto = require('crypto');
const wrap = require('co-express');
const logger = require('winston');
const User = mongoose.model('User');

/** constants. global variables */
var TAG = 'user_controller'

/** export module */

/** load */
exports.load = wrap(function* (req, res, next, _id) {
  const criteria = { _id };
  req.profile = yield User.load({ criteria });
  if (!req.profile) return next(new Error('User not found'));
  next();
});

/** create user. using for local registration */
exports.create = wrap(function* (req, res) {
  const user = new User(req.body);
  user.provider = 'local';
  yield user.save();
  req.logIn(user, err => {
    if (err) req.flash('info', 'Sorry! We are not able to log you in!');
    return res.redirect('/');
  });
});

/** show profile */
exports.show = function (req, res) {
  const user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
};


exports.signin = function () {
    logger("sign in");
};

/**
 * Auth callback
 */

exports.authCallback = login;

/** login screen: /login */
exports.login = function (req, res) {
    logger.log(TAG, 'login form');
    res.render('users/login', {
        title: 'Login into Social Book Networking'
    });
};

/** signup screen: /signup */
exports.signup = function (req, res) {
    logger.log(TAG, "sign up form");
    res.render('users/signup', {
        title: 'Sign up',
        user: new User()
    });
};

/** log out: /logout */
exports.logout = function (req, res) {
    logger.log(TAG, "log out");
    req.logout();
    res.redirect('/login');
};

/** session */
exports.session = login;

/** create login */
function login(req, res) {
    const redirectTo = req.session.returnTo
        ? req.session.returnTo
        : '/';
    delete req.session.returnTo;
    res.redirect(redirectTo);
}

/** create user */
exports.create = wrap(function* (req, res) {
    const user = new User(req.body);
    user.provider = 'local';
    yield user.save();
    req.logIn(user, err => {
        if (err) req.flash('info', 'Sorry! We are not able to log you in!');
        return res.redirect('/');
    });
});
