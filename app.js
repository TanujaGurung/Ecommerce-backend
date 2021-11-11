var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
require('dotenv').config();

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
require('./routes/order.route')(app);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);
app.use('/checkout', checkoutRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
module.exports = app;
