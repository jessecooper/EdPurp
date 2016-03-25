var express = require('express');
var router = express.Router();

module.exports = function(passport){

	// GET login page
	router.get('/', function(req, res) {
    		// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});
	
	return router;
}
