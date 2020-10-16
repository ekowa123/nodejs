var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://4acccf3edee8431f9a5f4de77a86af84@o213929.ingest.sentry.io/5444280' });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var WebSocket = require('ws');
var http = require('http');

// tester untuk update
var app = express();
app.disable('x-powered-by');

var server = http.createServer(app);
var ws = new WebSocket.Server({ server, path: '/ws' });
ws.on('connection', sc => {
  sc.on('message', data => {
    ws.clients.forEach(client => {
      if(client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
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

module.exports = {app, server};
