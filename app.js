var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
require('dotenv').config();
// const stripe = require("stripe")("sk_test_51JJDzRSGMn7poZZ91emL5SwJlVM1lfQ1mTjKd8uI9iZ4loUdddiemaE4HqmwylaVqi5iR8TnNx6BP2Hhqp0cjeGI00S9ls2p2R");
// const uuid = require("uuid/v4");
// app.use(express.json());
// app.use(cors());

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var cartRouter = require('./routes/cart');
var wishlistRouter = require('./routes/wishlist');
var checkoutRouter = require('./routes/checkout');

var testAPIRouter = require('./routes/testAPI');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const URL = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@sandbox.wrvbj.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`;
mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to Database'); // connecting to mongodb database using mongoose
    })
    .catch((err) => {
        console.log('Not Connected to Database ERROR! ', err);
    });
require('./routes/users')(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);
app.use('/checkout', checkoutRouter);

// error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
module.exports = app;
