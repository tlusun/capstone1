
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
var Item = require('./app/models/image');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log to console
app.use(morgan('dev'));

// Use the passpor	t package in our application
app.use(passport.initialize());
app.use(passport.session());

//CONFIG database
// connect to database
mongoose.connect(config.database);
// pass passport for configuration
require('./config/passport')(passport);

///paypall stuff
var fs = require('fs');

try {
  var configJSON = fs.readFileSync("./config.json");
  var config = JSON.parse(configJSON.toString());
} catch (e) {
  console.error("File config.json not found or is invalid: " + e.message);
  process.exit(1);
}



//ROUTES
//TODO: make life easier by putting the routes in separate files
var demoRoute = require('./routes/demoRoute.js');
var signUpRoute = require('./routes/signUpRoute.js');
var signUpBusinessRoute = require('./routes/signUpBusinessRoute.js');
var authenticateRoute = require('./routes/authenticateRoute.js');
var authenticateBusinessRoute = require('./routes/authenticateBusinessRoute.js');
var memberInfoRoute = require('./routes/memberInfoRoute.js');
var getStuffRoute = require('./routes/getStuffRoute.js');
var postStuffRoute = require('./routes/postStuffRoute.js');
var deleteStuffRoute = require('./routes/deleteStuffRoute.js');
var updateStuffRoute = require('./routes/updateStuffRoute.js');
var maps = require('./routes/maps.js');
var imageUpload = require('./routes/imageupload.js');
//var paypal = require('./routes/paypal.js');
var stripe = require('./routes/stripe.js');

///////////////
app.use('/', demoRoute);
app.use('/api', signUpRoute);
app.use('/api', authenticateRoute);
app.use('/api', memberInfoRoute);
app.use('/api', getStuffRoute);
app.use('/api', postStuffRoute);
app.use('/api', deleteStuffRoute);
app.use('/api', updateStuffRoute);
app.use('/api', maps);
app.use('/api', signUpBusinessRoute);
app.use('/api', authenticateBusinessRoute);
app.use('/api', imageUpload);
//app.use('/api', paypal);
app.use('/api/stripe/', stripe); 

// Start the server
app.listen(port);
console.log('Blip server has started on: http://localhost:' + port);
