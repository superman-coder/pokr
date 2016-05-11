const fs = require('fs');
const join = require('path').join;
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/config');

const models = join(__dirname, 'models');
const port = process.env.PORT || 3000;
const app = express();

module.exports = app;

// Bootstrap models
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));

// Bootstrap routes
require('./config/passport')(passport);
require('./config/express')(app, passport);
require('./config/routes')(app, passport);

// connect to database before start server
connect()
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);

function listen () {
    if (app.get('env') === 'test') return;
    app.listen(port);
    console.log('Express app started on port ' + port);
}

function connect () {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    return mongoose.connect(config.db, options).connection;
}

//mongoose.connect('mongodb://localhost:27017/pokr', function(err) {
//    if (err) {
//       console.log('connection error', err);
//    } else {
//       console.log('connection successfully !!!');
//       var bookSchema = mongoose.Schema({
//           name: String,
//           isbn: {type: String, index: true},
//           author: String,
//           pages: Number
//       });
//
//       var Book = mongoose.model('Book', bookSchema);
//
//       var book1 = new Book({
//           name: "Mongoose",
//           isbn: "12345",
//           author: "thao",
//           pages: 123
//       });
//
//       book1.save(function(err) {
//           if (err) throw err;
//           console.log("book saved successfully");
//       });
//
//    }
//});
//
//
//app.get('/', function(req, res) {
//    res.send('hello world')
//});
//
//
//app.listen(3000, function() {
//    console.log('app starts at port 3000')
//});
