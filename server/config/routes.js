'use strict';

/** module dependencies */

// Note: We can require users, articles and other controllers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

const users = require('../controllers/user_controller.js');
//const auth = require('./middlewares/authorization');

/** Route Middlewares */

//const articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
//const commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

/** expose module */
module.exports = function (app, passport) {

	user_route(app, passport);

    // book routes
    // admin routes
    // question routes
};

var user_route = function(app, passport) {
    app.get('/login', users.login);
    app.get('/signup', users.signup);
    app.get('/logout', users.logout);
    app.post('/users/session', passport.authenticate('local', {
                                        failureRedirect: '/login',
                                        failureFlash: 'Invalid email or password.' }),
                                        users.session);
    //app.get('/users/:userId', users.show);

	// passport authentication getting authenticate method
	// OAuth2 required 2 routes:
	// 		1. redirect user to sservice provider
	// 		2. is the URL which user will the user will be redirected after authenticating with provider

	// facebook login using two information email and user_about_me
     app.get('/auth/facebook', passport.authenticate('facebook', {
                                             scope: [ 'email', 'public_profile'],
                                             failureRedirect: '/login'}),
                                             users.signin);
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
                                             failureRedirect: '/login'}),
                                             users.authCallback);

	// google login getting email and profile
    app.get('/auth/google', passport.authenticate('google', {
                                             failureRedirect: '/login',
                                             scope: [
                                               'https://www.googleapis.com/auth/userinfo.profile',
                                               'https://www.googleapis.com/auth/userinfo.email'
                                             ]}), users.signin);
    app.get('/auth/google/callback', passport.authenticate('google', {
                                            failureRedirect: '/login'}), users.authCallback);

    //app.param('userId', users.load);
};
