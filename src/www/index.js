const express = require('express');
const createError = require('http-errors');
const session = require('express-session');
const path = require('path');

const morganLogger = require('morgan');
const {loggerStream} = require('../log');

const router = require('./router');


const expressApp = express();

expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'ejs');

expressApp.use(morganLogger('combined', {stream: loggerStream}));
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended: false}));

expressApp.use(session({
  secret: 'somesecretvaluethisistest!@#!$',
  resave: false,
  saveUninitialized: true,
}));

expressApp.use('/api', router);

expressApp.use((req, res, next) => {
  next(createError(404))
});

expressApp.use((err, req, res, next) => {
  /** set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /** error page */
  res.status(err.status || 500);
  res.send(`${err.message} ${err.status}<br>${err.stack}`);
})

module.exports = expressApp;