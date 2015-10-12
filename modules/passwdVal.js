var validator = require('validator');

var passVal = function(password){
	if(validator.matches(password, "(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{8,}"))
	{
		console.log("Password Passed Validation");
		return true;
	}
        else
        {
                return false;
        }
};

module.exports = passVal;
