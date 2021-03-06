var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var passport = require('passport');

var indexRouter = require('./routes/index');
var meRouter = require('./routes/me');
var citizensRouter = require('./routes/citizens');
var sessionRouter = require('./routes/session');
var sampleRouter = require('./routes/sample');
var registerRouter = require('./routes/registration');
var fileLawsuitRouter = require('./routes/lawsuit/fileLawsuit');
var displayLawsuitRouter = require('./routes/lawsuit/displayLawsuit');
var personalStatementRouter = require('./routes/lawsuit/personalStatement');
var dataRouter = require('./routes/data');

var paymentRouter = require('./routes/payment');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter);
app.use('/me', meRouter);
app.use('/citizens', citizensRouter);
app.use('/session', sessionRouter);
app.use('/sample', sampleRouter);
app.use('/registration', registerRouter);
app.use('/fileLawsuit' , fileLawsuitRouter);
app.use('/displayLawsuit' , displayLawsuitRouter);
app.use('/personalStatement' , personalStatementRouter);
app.use('/payment' , paymentRouter);
app.use('/data' , dataRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
