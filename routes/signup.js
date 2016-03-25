var express = require('express');
var router = express.Router();

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
	// GET Registration Page 
        router.get('/signup', isAuthenticated, function(req, res){
                res.render('register',{user: req.user, message: req.flash('message')});
        });

        // Handle Registration POST 
        router.post('/signup', passport.authenticate('signup', {
                successRedirect: '/signup',
                failureRedirect: '/signup',
                failureFlash : true
        }));
	
	return router;
}
