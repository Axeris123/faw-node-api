var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Books = require('./api/models/booksModel');
var Users = require('./api/models/usersModel');
var BooksReviews = require('./api/models/booksReviewsModel');
var booksRouter = require('./api/routes/booksRoutes');
var usersRouter = require('./api/routes/usersRoutes');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Booksdb', {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

booksRouter(app);
usersRouter(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({error: err});
});

app.listen(3000);
