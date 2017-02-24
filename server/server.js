var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
const port = process.env.PORT || 8080;
var jwt = require('jwt-simple');

//get db config file
var config = require('./config/database');

//get schemas for mongoose from models folder
var User = require('./app/models/user'); // get the mongoose model for login user
var Company = require('./app/models/company'); //get the mongoose model for Company
var Contact = require('./app/models/contact'); //get the mongoose model for Contact
var Invoice = require('./app/models/invoice'); //get the mongoose model for Invoice
var Review = require('./app/models/review'); //get the mongoose model for Review

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passport package in our application
app.use(passport.initialize());
app.use(passport.session());

//CONFIG database
// connect to database
mongoose.connect(config.database);
// pass passport for configuration
require('./config/passport')(passport);

//ROUTES
//TODO: make life easier by putting the routes in separate files
var demoRoute = require('./routes/demoRoute.js');
var signUpRoute = require('./routes/signUpRoute.js');
var authenticateRoute = require('./routes/authenticateRoute.js');
var memberInfoRoute = require('./routes/memberInfoRoute.js');
var getStuffRoute = require('./routes/getStuffRoute.js');
var postStuffRoute = require('./routes/postStuffRoute.js');
var deleteStuffRoute = require('./routes/deleteStuffRoute.js');

///////////////
app.use('/', demoRoute);
app.use('/api', signUpRoute);
app.use('/api', authenticateRoute);
app.use('/api', memberInfoRoute);
app.use('/api', getStuffRoute);
app.use('/api', postStuffRoute);
app.use('/api', deleteStuffRoute);

// Start the server
app.listen(port);
console.log('Blip server has started on: http://localhost:' + port);
