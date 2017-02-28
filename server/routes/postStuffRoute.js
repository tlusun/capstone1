var router = require('express').Router();
var Company = require('../app/models/company');
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
    if (error) response.send(error);
    res.status(201).json({person});
  });
});

module.exports = router;
