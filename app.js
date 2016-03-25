var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// File Upload 
var multer  = require('multer');

// Mongo
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.url);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Init Multer
app.use(multer({ 
    dest: './public/uploads/',
    putSingleFilesInArray: true,
    rename: function (fieldname, filename) {
        return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
    },
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' is starting ...')
    },
    onFileUploadComplete: function (file) {
        console.log(file.fieldname + ' uploaded to  ' + file.path)
        //done=true;
    }
}))

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport setup
var passport = require('passport');
var session = require('express-session');
app.use(session({
	secret: 'dklafjeiohiase',
	resave: false,
	saveUninitialized: false,
	cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

// Setup routes
// Init routes
// when adding route it will append the first arg to the one defined in the file
// i.e. ('app', test) will be /app/... whatever route is defined in the file
app.use('/', require('./routes/index')(passport));
app.use(require('./routes/login')(passport));
app.use(require('./routes/signup')(passport));
app.use(require('./routes/profile')(passport));
app.use(require('./routes/usr_list')(passport));
app.use(require('./routes/usr_del')(passport));
app.use(require('./routes/home')(passport));
app.use(require('./routes/search')(passport));
app.use(require('./routes/file_info')(passport));
app.use(require('./routes/upload')(passport));
app.use(require('./routes/signout')(passport));
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Must be the last route for some unknow reason. 
// This route will be changed so the file goes directly
// to MongoDB as a blob. This will make the app more
// Scaleable. 
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
app.use('/', require('./routes/download')(passport));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
