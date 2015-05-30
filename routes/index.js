var express = require('express');
var router = express.Router();
var uploader = require('../modules/upload')
//var books = require('../modules/books')
// Mongoose models
//var Book_q = require('../models/book');
var Torrent_q = require('../models/torrent');

// Inspect objects
var util = require('util')

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}


module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));
	// TODO: check req.user.admin to see if page should be displayed.
	/* GET Registration Page */
	router.get('/signup', isAuthenticated, function(req, res){
		res.render('register',{user: req.user, message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/signup',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	// TODO: Query homepage results
	router.get('/home', isAuthenticated, function(req, res){
		Torrent_q.find({}, function (err, torrent) {
    		if (!err) {
      			res.render('home', { user: req.user, torrent: torrent });
    		}else{
      			console.log(err);
    		}
  		});
		//res.render('home', { user: req.user, books: books.books });
	});

	/* GET Upload Page */
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

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}