//var Book = require('../models/book');
var Torrent = require('../models/torrent');

var upload = function(req, done){
    // Torrent Model
    var newTorrent = new Torrent();
    newTorrent.title = req.body.title; 
    // Check special properties
    if (req.body.book == "book")
    {
    	newTorrent.properties = "{ t_type : " + req.body.book + " }";
    	newTorrent.properties = "{ isbn : " + req.body.isbn + " }";
    }
    else if (req.body.movie == "movie")
    {
    	newTorrent.properties = "{ t_type : " + req.body.movie + " }";
	// Place Holder for uniq properties
    }
    else if (req.body.music == "music")
    {
    	newTorrent.properties = "{ t_type : " + req.body.music + " }";
	// Place Holder for uniq properties
    }
    else if (req.body.app == "app")
    {
    	newTorrent.properties = "{ t_type : " + req.body.app + " }";
	// Place Holder for uniq properties
    }
    else if (req.body.game == "game")
    {
    	newTorrent.properties = "{ t_type : " + req.body.game + " }";
	// Place Holder for uniq properties
    }
    newTorrent.description = req.body.description;
    // Get Upload Path
    var chunk = req.files;
    newTorrent.file_path = chunk.torrent[0].path;
    newTorrent.file_name = chunk.torrent[0].name;
    newTorrent.date = new Date();
    // test
    //console.log(req.files);
    //console.log(req.body.movie);
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

