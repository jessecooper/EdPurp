var Book = require('../models/book');

/*var books = function(req){

  return Book.find({}, function (err, books) {
    if (!err) {
      //return res.send(products);
      //console.log(x);
      //return JSON.stringify(x);
    //} else {
      //return console.log(err);
      return books;
    }else{
      console.log(err);
      //return books;
    }
  });
}*/
// Test query only
var books = Book.find({}, function (err, books) {
    if (!err) {
      //return res.send(products);
      //console.log(x);
      //return JSON.stringify(x);
    //} else {
      //return console.log(err);
      return books;
    }else{
      console.log(err);
      //return books;
    }
  });
console.log(books);

module.exports.books = books;