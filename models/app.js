// torrent book model
var mongoose = require('mongoose');
 
module.exports = mongoose.model('App',{
    title: String,
    description: String,
    file_path: String,
    file_name: String,
    //image_path: String
    date: Date,
});
