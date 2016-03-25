var express = require('express');
var router = express.Router();
// Mongo User Model
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
	/* POST Search */
        // POST Search
        router.post('/search', isAuthenticated, function(req, res){
                console.log(req.body.search);
                var re = new RegExp(req.body.search, 'i'); //see about using req.params.search for get request
                console.log(re);
                // TODO: Setup More advanced search query
                //Torrent_q.find([ { title: { $regex: re }}, { file_name: { $regex: re }} ], function (err, torrent) {
                Torrent_q.find({ title: { $regex: re }}, function (err, torrent) {
                if (!err) {
                        res.render('search', { user: req.user, torrent: torrent });
                }else{
                        console.log(err);
                }
                });
        });

        return router;
}
