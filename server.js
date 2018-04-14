const express = require('express');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const createError = require('http-errors');
const debug = require('debug')('canapi-express:server');
const http = require('http');
const cookieParser = require('cookie-parser');
const config = require('./app/config');

const apiRouter = require('./app/routes/api');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

// View Engine Config
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.use(cookieParser());

// Connect to database
mongoose.connect(config.DB)

// Routes
app.use('/api', apiRouter);
app.get('/', function (req, res, next) {
  res.sendfile('./public/index.html')
})

// Static Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Access Control Middleware
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port)
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Pass to next layer of middleware
  next()
});

// 404 Middleware
app.use(function (req, res, next) {
  next(createError(404));
});

// Dev Error Middleware
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Server Init
var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}