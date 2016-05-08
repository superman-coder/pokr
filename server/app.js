var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost:27017/pokr', function(err) {
    if (err) {
       console.log('connection error', err);
    } else {
       console.log('connection successfully !!!');
       var bookSchema = mongoose.Schema({
           name: String,
           isbn: {type: String, index: true},
           author: String,
           pages: Number
       });

       var Book = mongoose.model('Book', bookSchema);

       var book1 = new Book({
           name: "Mongoose",
           isbn: "12345",
           author: "thao",
           pages: 123
       });

       book1.save(function(err) {
           if (err) throw err;
           console.log("book saved successfully");
       });

    }
});


app.get('/', function(req, res) {
    res.send('hello world')
});


app.listen(3000, function() {
    console.log('app starts at port 3000')
});
