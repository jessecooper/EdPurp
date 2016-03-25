var express = require('express');
var router = express.Router();
// Mongo User Model
var Users = require('../models/user');

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
	/* User Management */
        //GET User list
        router.get('/usr_list', isAuthenticated, function(req, res){
        //router.get('/usr_list', function(req, res){
                Users.find({}, function (err, users) {
                if (!err) {
                        res.json(users);
                }else{
                        console.log(err);
                }
                });
        });

	return router;
}
