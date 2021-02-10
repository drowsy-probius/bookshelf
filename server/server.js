import express from 'express';
import createError from 'http-errors';
import * as httpLogger from 'morgan';
import session from 'express-session';
import path from 'path';

import router from './router';


const expressApp = express();

expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'ejs');

expressApp.use(httpLogger('dev'));
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended: false}));

expressApp.use(session({
  secret: 'somesecretvaluethisistest!@#!$',
  resave: false,
  saveUninitialized: true,
}));

expressApp.use('/', router);

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

export default expressApp;