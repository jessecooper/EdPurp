var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }// already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    }else if (req.body.password != req.body.password_comf){
                        console.log('Password and password_comf did not match');
                        return done(null, false, req.flash('message','Password did not match'));
                        // TODO - add function to test password strength with test case
                    } else {
                        // if there is no user
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username;
                        // TODO - Add password comf check
                        newUser.password = createHash(password);
                        newUser.admin = req.body.isAdmin;

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            console.log('User Registration succesful');    
                            //return done(null, newUser);
                            return done(null, false, req.flash('message','User Created Succesfully'));
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}
