var express = require('express');
var router = express.Router();
// Needed for password reset
var bCrypt = require('bcrypt-nodejs');
var passVal = require('../modules/passwdVal');
// Mongoose models
var uPassword_c = require('../models/user');
// Inspect objects
var util = require('util')

// Check if user is authenticated with passport
var isAuthenticated = function (req, res, next) {
        // if user is authenticated in the session, call the next() to call the next request handler 
        // Passport adds this method to request object. A middleware is allowed to add properties to
        // request and response objects
        if (req.isAuthenticated())
                return next();
        // if the user is not authenticated then redirect him to the login page
        res.redirect('/');
}

// Create password hash that gets stored in the database
var createHash = function(password) {
                        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = function(passport) {

	/* Profile */
        // GET Profile
        router.get('/profile', isAuthenticated, function(req, res){
                res.render('profile',{user: req.user, message: req.flash('message')});
        });

	// POST Profile
        // TODO move password reset code some code to a module
        router.post('/profile', isAuthenticated, function(req, res){
                if (req.body.password != req.body.password_comf){
                        console.log('Password and password_comf did not match');
                        res.render('profile',{user: req.user, message: 'Passwords did not match'});
                } else if (!passVal(req.body.password)){
                        console.log('Password Validation Failed');
                        res.render('profile',{user: req.user, message: 'Passwords did not meet password strenght policy'});
                } else {

                        console.log('user: ' + req.user);
                        uPassword_c.update( { username: req.user.username}, {$set: { password: createHash(req.body.password) }}, { multi: 'false' }, function(err,update) {
                                if( err || !update ){
                                        res.render('profile',{user: req.user, message: 'Password Change error'});
                                        console.log('Error: ' + err + ' ' + update);
                                }else{
                                        res.render('profile',{user: req.user, message: 'Password Changed'});
                                }
                        });
                }
        });

	return router;
}
