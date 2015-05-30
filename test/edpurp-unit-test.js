// TODO: Make each test a modular function
var page = require('webpage').create(),
  system = require('system'),
  t, address;

/* Test Functions */
/*function login(page) {
page.evaluate(function () {
        document.querySelector('input[name=username]').value = 'vesc';
        document.querySelector('input[name=password]').value = 'test';)
        document.querySelector('form').submit();
    });
}*/

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

t = Date.now();
address = system.args[1];
page.open(address, function(status) {
  if (status !== 'success') {
    console.log('FAIL to load the address');
  } else {
    t = Date.now() - t;
    console.log('Loading ' + system.args[1]);
    var title = page.evaluate(function() {
	return document.title;
    });
    // Test Page Title
    if (title == '') {
    	console.log('Error: No page title');
    }
    //Page interaction need to modify
    //page.uploadFile('input[name=image]', fname);
    // Login
    page.evaluate(function () {
        document.querySelector('input[name=username]').value = 'vesc';
        document.querySelector('input[name=password]').value = 'test';)
        document.querySelector('form').submit();
    });
    //login(page);
    /*page.evaluate(function() {
        document.getElementById('upload').click;
    });*/
    
    //Display title
    console.log('Page title is ' + title);
    //Take a screenshot of loaded page
    page.render(title + '.png');
    //Display load time
    console.log('Loading time ' + t + ' msec');
  }
  window.setTimeout(function () {
            phantom.exit();
  }, 3000);
});
