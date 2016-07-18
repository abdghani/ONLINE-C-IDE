var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var auth = require('./bin/auth.js')
var routes = require('./routes/index');
var session = require('express-session');

//mongoose configuration
var mongoose = require('mongoose')
var connectionString = auth.mongooseUrl;
var db = mongoose.connect(connectionString);


var db_connection = mongoose.connection;
db_connection.on('error',console.error.bind(console,'connection error:'));
db_connection.once('open',function(){
  console.log("connected correctly to server")
})


//passport requirements
var passport = require('passport');
var passport_config = require('./passport/config.js');

//express app creation
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//passport part
passport.use(passport_config.newpassportfacebook)
passport.use(passport_config.newpassportgoogle)
passport.serializeUser(passport_config.serialize)
passport.deserializeUser(passport_config.deserialize)
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({secret:'secret_key'}))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize())
app.use(passport.session())


app.use('/', routes);
app.use('/code',require('./routes/code'))
app.use('/login',require('./routes/login'))
app.use('/usercode',require('./routes/usercode.js'))
//passport configuration
/*
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
*/

module.exports = app;
