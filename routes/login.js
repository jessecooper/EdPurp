var express = require('express');
var router = express.Router();

module.exports = function(passport){
	
	/* POST Login */
	router.post('/login', passport.authenticate('login', {
                successRedirect: '/home',
                failureRedirect: '/',
                failureFlash : true
        }));
	
	return router;
}

//module.exports = router;
