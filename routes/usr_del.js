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
	//DELETE User
        router.delete('/usr_del/:usr_id', isAuthenticated, function(req, res){
        //router.delete('/usr_del/:usr_id', function(req, res){
                console.log(req.params.usr_id);
                Users.remove({ "_id": req.params.usr_id }, function (err, users) {
                if (!err) {
                        console.log("User Deleted");
                        //res.render('register',{user: req.user, message: "user deleted"});
                }else{
                        console.log("User not found");
                        //res.render('register',{user: req.user, message: "Err removing user"});
                }
                });
        });

        return router;
}

