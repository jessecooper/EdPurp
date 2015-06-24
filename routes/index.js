var express = require('express');
var router = express.Router();
var uploader = require('../modules/upload')
//var books = require('../modules/books')
// Mongoose models
var uPassword_c = require('../models/user');
var Torrent_q = require('../models/torrent');

// Inspect objects
var util = require('util')

//Needed for password reset
var bCrypt = require('bcrypt-nodejs');

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

	// GET login page
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	// Handle Login POST 
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));
	// TODO: check req.user.admin to see if page should be displayed.
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
	
	/* Profile */
	// GET Profile
        router.get('/profile', isAuthenticated, function(req, res){
                res.render('profile',{user: req.user, message: req.flash('message')});
        });

	// POST Profile
	// TODO move password reset code some code to a module
	router.post('/profile', isAuthenticated, function(req, res){
		if (req.param('password') != req.param('password_comf')){
                        console.log('Password and password_comf did not match');
                        // TODO - add function to test password strength with test case
			res.render('profile',{user: req.user, message: 'Passwords did not match'});
		} else {
			
			console.log('user: ' + req.user);
			uPassword_c.update( { username: req.user.username}, {$set: { password: createHash(req.param('password')) }}, { multi: 'false' }, function(err,update) {
				if( err || !update ){
					res.render('profile',{user: req.user, message: 'Password Change error'});
					console.log('Error: ' + err + ' ' + update);
				}else{
					res.render('profile',{user: req.user, message: 'Password Changed'});
				}
			});
		}
        });
	var createHash = function(password){
                        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
        }

	// GET Home Page 
	// TODO: Query homepage results
	router.get('/home', isAuthenticated, function(req, res){
		Torrent_q.find({}, function (err, torrent) {
    		if (!err) {
      			res.render('home', { user: req.user, torrent: torrent });
    		}else{
      			console.log(err);
    		}
  		});
	});
	/* GET Search */
	// GET Search
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
	
	// Handle Logout 
        router.get('/signout', function(req, res) {
                req.logout();
                res.redirect('/');
        });

	// Download torrent handler
    	router.get('/:file(*)', isAuthenticated, function(req, res, next){
  		var file = req.params.file
    		, path = file;

  		res.download(path);
	});
	
	return router;
}
