var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routing = require('./routes/routing');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');
const Constants = require('./shared/constants')
var app = express();

mongoose.connect(Constants.conString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('DB Connected'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routing);

// error handler
app.use(errorHandler);

module.exports = app;
