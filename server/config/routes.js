'use strict';

/** module dependencies */

// Note: We can require users, articles and other cotrollers because we have
// set the NODE_PATH to be ./app/controllers (package.json # scripts # start)

//const users = require('./app/controllers/users');
const auth = require('./middlewares/authorization');

/**
 * Route middlewares
 */

/** Route Middlewares */

const articleAuth = [auth.requiresLogin, auth.article.hasAuthorization];
const commentAuth = [auth.requiresLogin, auth.comment.hasAuthorization];

/** expose module */

module.exports = function (app, passport) {

    // user routes
 //   app.get('/login', users.login);
//    app.get('/signup', users.signup);
 //   app.get('/logout', users.logout);
//    app.post('/users', users.create);

};
