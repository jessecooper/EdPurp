var express = require('express');
var router = express.Router();
// Mongo Model
var Torrent_q = require('../models/torrent');

var isAuthenticated = function (req, res, next) {
        // if user is authenticated in the session, call the next() to call the next request handler 
        // Passport adds this method to request object. A middleware is allowed to add properties to
        // request and response objects
        if (req.isAuthenticated())
                return next();
        // if the user is not authenticated then redirect him to the login page
        res.redirect('/');
}

module.exports = function(passport) {
	/* GET file info */
        router.get('/file_info/:file_id', isAuthenticated, function(req, res){
                Torrent_q.findOne({ _id: req.params.file_id }, function (err, torrent) {
                if (!err) {
                        res.render('file_info', { user: req.user, torrent: torrent });
                }else{
                        console.log(err);
                }
                });
        });

        return router;
}
