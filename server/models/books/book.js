const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId:  {type: String, trim: true},
    userName: {type: String, trim: true},
    createAt: {type: Date, default: Date.now}
});


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
