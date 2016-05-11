'use strict';

/** production */

module.exports = {
    //db: process.env.MONGOHQ_URL,
    db: 'mongodb://localhost:27017/pokr',
    facebook: {
        clientID: process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: 'http://nodejs-express-demo.herokuapp.com/auth/facebook/callback'
    },
   google: {
        clientID: process.env.GOOGLE_CLIENTID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: 'http://nodejs-express-demo.herokuapp.com/auth/google/callback'
    }
};
