var router = require('express').Router();
var Company = require('../app/models/company');
var Order = require('../app/models/order');
var Review = require('../app/models/review');
//this function is not needed for now since signUpRoute will post the user to the db



router.post('/company', function (req, res) {

  var mycompany = new Company({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    owner: req.body.owner,
    number: req.body.number,
    address: req.body.address,
    services: req.body.services,
    descriptions: req.body.descriptions,
    rating: req.body.rating,
    password: req.body.password,
    reviews: req.body.reviews,
    orders: req.body.orders,
    location: req.body.location
  });

  mycompany.save(function(err) {
    if (err) {
      console.log('save err: ', err);
      return res.json({success: false, msg: 'Username already exists.'});
    }
    res.json({success: true, msg: 'Successful created new user.'});
  });
});


router.post('/contacts', function (req, res) {
  console.log(req.body);
  console.log('iam here');

  var person = new Contact({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number
  });

  person.save(function (error, person) {
    if (error) res.send(error);
    res.status(201).json({person});
  });
});

router.post('/order', function (req, res) {
  console.log('order', req.body);

  var order = new Order({
    userEmail: req.body.userEmail,
    amount: req.body.amount,
    service: req.body.service,
    date: req.body.date,
    businessEmail: req.body.businessEmail,
    status: req.body.status,
    invoice: req.body.invoice
  });

  order.save(function (error, order) {
    if (error) res.send(error);
    else
      res.status(201).json({success: true, order});
  });
});

router.post('/review/', function (req,res) {
  var review = new Review({
    companyEmail: req.body.companyEmail,
    customerEmail: req.body.customerEmail,
    review: req.body.review,
    rating: req.body.rating
  });

  review.save(function(err,review) {
    if (err) res.send(err);
    res.status(201).json({success: true});
  });
});

module.exports = router;
