var Torrent = require('../models/torrent');

var upload = function(req, done){
    // Torrent Model
    var newTorrent = new Torrent();
    newTorrent.title = req.body.title; 
    // Check special properties
    if (req.body.book == "book")
    {
    	newTorrent.type = req.body.book;
    	newTorrent.properties = JSON.parse('{ "isbn" : ' + req.body.isbn + ' }');
    }
    else if (req.body.movie == "movie")
    {
    	newTorrent.type = req.body.movie;
	// Place Holder for uniq properties
    }
    else if (req.body.music == "music")
    {
    	newTorrent.type = req.body.music;
	// Place Holder for uniq properties
    }
    else if (req.body.app == "app")
    {
    	newTorrent.type = req.body.app;
	// Place Holder for uniq properties
    }
    else if (req.body.game == "game")
    {
    	newTorrent.type = req.body.game;
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
    
    // save the file
    newTorrent.save(function(err) {
        if (err){
            console.log('Error in Saving File: '+err);  
            throw err;  
        }
        console.log('Upload succesful');
    });
};

module.exports.upload = upload;

