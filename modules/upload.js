//var Book = require('../models/book');
var Torrent = require('../models/torrent');

var upload = function(req, done){
    /* Book model
    var newBook = new Book();
    // TODO: express deprecated req.param(name): Use req.params, req.body, or req.query instead
    newBook.title = req.param('title');
    newBook.isbn = req.param('isbn');
    newBook.description = req.param('description');
    // Get Upload Path
    var chunk = req.files;
    newBook.file_path = chunk.torrent[0].path;
    newBook.file_name = chunk.torrent[0].name;
    newBook.date = new Date();
    // test
    //console.log(req.files);
    //console.log(chunk.torrent[0].name);
    // save the book

    newBook.save(function(err) {
    	if (err){
    		console.log('Error in Saving torrent: '+err);  
     		throw err;  
    	}
    	console.log('Upload succesful');
    });
    */
    // Torrent Model
    var newTorrent = new Torrent();
    // TODO: express deprecated req.param(name): Use req.params, req.body, or req.query instead
    newTorrent.title = req.param('title');
    newTorrent.isbn = req.param('isbn');
    newTorrent.description = req.param('description');
    // Get Upload Path
    var chunk = req.files;
    newTorrent.file_path = chunk.torrent[0].path;
    newTorrent.file_name = chunk.torrent[0].name;
    newTorrent.date = new Date();
    // test
    //console.log(req.files);
    //console.log(chunk.torrent[0].name);
    // save the book

    newTorrent.save(function(err) {
        if (err){
            console.log('Error in Saving torrent: '+err);  
            throw err;  
        }
        console.log('Upload succesful');
    });
};

module.exports.upload = upload;

