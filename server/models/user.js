var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    email: String,
    address: String,
    gender: String,

    fb: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String
    },

    google: {
        id: String,
        access_token: String,
        firstName: String,
        lastName: String,
        email: String
    }

});
