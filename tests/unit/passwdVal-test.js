var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var passwdVal = require('./../../modules/passwdVal.js');

var badpass = "password"
var goodpass = "Th1s1s@G00dP@ssw0rd!"

describe('passwdVal', function() {
  
	it('passVal should return false if string passed is not >8 char and have special char and a number', function() {
		expect(passwdVal(badpass)).to.equal(false);
	});
	it('passVal should return true if string passed is >8 char and have special char and a number', function() {
                expect(passwdVal(goodpass)).to.equal(true);
        });
	
});
