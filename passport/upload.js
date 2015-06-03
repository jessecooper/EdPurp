/* Marked for removal */
var LocalStrategy   = require('passport-local').Strategy;
var Book = require('../models/book');
// TODO - Add models
//var Movie = require('../models/movie');
//var Music = require('../models/music');
//var App = require('../models/app');
//var Game = require('../models/game');

//var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('upload', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            uploadTorrent = function(){
                        var newBook = new Book();

                        newBook.title = req.param('title');
                        newBook.isbn = req.param('isbn');
                        newBook.description = req.param('description');
                        newBook.file_path = torrent.path;
                        // test
                        console.log(req.files);

                        // save the user
                        newBook.save(function(err) {
                            if (err){
                                console.log('Error in Saving torrent: '+err);  
                                throw err;  
                            }
                            console.log('Upload succesful');
                            return done(null, false, req.flash('message','Upload Succesfully'));
                        });
                    }
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(uploadTorrent);
        })
    );
    //Other functions
}
