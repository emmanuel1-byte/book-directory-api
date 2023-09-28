var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/*Third Party middleware */
var session = require('express-session');
var passport = require('passport');
var pg_session = require('connect-pg-simple')(session);
require('dotenv').config();
var cors = require('cors');


//Db connect
const db = require('../../BackendProjects/BookDirectory-Api/db/connection');

var authRouter = require('./routes/auth.route');
var booksRouter = require('./routes/book.route');


var app = express();


app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());


//Authentication middleware
// Session config
app.use(session({
  store : new pg_session({
  pgPromise : db
  }),

  secret : process.env.SECRET_KEY,
  resave : false,
  saveUninitialized : false,
  cookie : { maxAge : 30*24*60*60*1000 } // 30 days valid
}))

app.use(passport.authenticate('session'));

app.use('/', authRouter);
app.use('/', booksRouter);

/* 
CORS Enabled
resource from this server can be accessed by any origin 
*/
app.options('*', cors());
app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, "route does not exist "));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // erorr messages
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
