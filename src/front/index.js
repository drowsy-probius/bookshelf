const express = require('express');
const createError = require('http-errors');
const session = require('express-session')
const path = require('path')

const morganLogger = require('morgan');
const {loggerStream} = require('../log');


const expressApp = express();

const router = require('./route');

expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'ejs');

expressApp.use(morganLogger('combined', {stream: loggerStream}));
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended: false}));

expressApp.use(session({
  secret: 'some_secret_value_this_is_test_value',
  resave: false,
  saveUninitialized: true,
}));

expressApp.use('/', router);

expressApp.use((req, res, next) => {
  next(createError(404));
});

expressApp.use((err, req, res, next) => {
  /** set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /** error page */
  res.status(err.status || 500);
  res.send(`${err.message} ${err.status}<br>${err.stack}`);
});

/**
 * front test code
 */
expressApp.listen(1234, '0.0.0.0', (req, res) => {
  console.log(`server listening on 0.0.0.0:1234`);
})

module.exports = expressApp;
