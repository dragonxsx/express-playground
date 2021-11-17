var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');

const session = require('express-session');
// ================= Passport files =================
const passport = require('passport');
const GithubStrategy = require('passport-github2').Strategy;
const githubConfig = require('./github.config');
// ================= Passport files =================

var indexRouter = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "https:", "'unsafe-inline'"],
      fontSrc: ["'self'", "https:", "data:"],
      imgSrc: ["'self'", "https://image.tmdb.org"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'maxcdn.bootstrapcdn.com', 'ajax.googleapis.com'],
      blockAllMixedContent: [],
      upgradeInsecureRequests: [],
      baseUri: ["'self'"],
      frameAncestors: ["'self'"],
    }
  }
}));

app.use(session({ 
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
  secret: 'Passport application secret' 
}));

// ================= Passport config =================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GithubStrategy(githubConfig, 
  function(accessToken, refreshToken, profile, cb){
    // console.log(profile);

    // Trying to find the user and verify them by using cb
    cb(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
  done(null, user);
});
// ================= Passport config =================

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
