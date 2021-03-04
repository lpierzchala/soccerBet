const mongoose = require('mongoose');
const passport = require('passport');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

// setup middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(passport.initialize());
app.use(cors())

// Configure Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/exa3',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set('debug', true);
// Init model and passport
require('./models/user.model');
require('./models/types.model');
require('./models/match.model');
require('./config/passport');

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const matchesRouter = require('./routes/matches');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/matches', matchesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
