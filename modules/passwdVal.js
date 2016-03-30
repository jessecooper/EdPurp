var validator = require('validator');

var passVal = function(password){
	if(validator.matches(password, "(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^a-zA-Z]).{8,}"))
	{
		return true;
	}
        else
        {
                return false;
        }
};

module.exports = passVal;
