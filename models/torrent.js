// torrent book model
var mongoose = require('mongoose');
 
module.exports = mongoose.model('Torrent',{
    type: String,
    title: String,
    description: String,
    file_path: String,
    file_name: String,
    properties: [],
    //image_path: String
    date: Date,
});
