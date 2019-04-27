require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var app = express();
var debug = require('debug')('lpg:app.js');

//Local imports
var { database } = require('./config/env');
var indexRouter = require('./routes/index');

var port = process.env.PORT || 5000;

mongoose.Promise = require('bluebird');

//Configure database
mongoose.connect(database.url, {
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
    useNewUrlParser: true,
    useFindAndModify: false
});

// MONGOOSE DEFAULTS
mongoose.connection.on('connected', function() {
    debug('Mongoose default connection connected');
});
mongoose.connection.on('error', function(err) {
    debug('Mongoose default connection error:' + err);
});
mongoose.connection.on('disconnected', function() {
    debug('Mongoose default connection disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected on app termination');
        debug('Mongoose default connection disconnected on app termination');
        process.exit(0);
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Middleware setup 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);

app.get('/test', function(req, res) {
    res.send('Hello World!')
})

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

// app.listen(port, () => console.log(`Instafarm app listening on port ${port}!`))

module.exports = app;