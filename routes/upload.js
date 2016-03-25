var express = require('express');
var router = express.Router();
// Custom Modules
var uploader = require('../modules/upload')

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
	/* Torrent Handler */
        // GET Upload Page
        router.get('/upload', isAuthenticated, function(req, res){
                res.render('upload', { user: req.user, message: req.flash('message') });
        });

        // Post upload
        router.post('/upload', isAuthenticated, function(req,res){
                //if(done==true){
                //console.log(req.files);
                uploader.upload(req);
                res.render('upload', { user: req.user, message: "File Uploaded" });
        //}
        });

        return router;
}
