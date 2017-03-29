var router = require('express').Router();
var Company = require('../app/models/company'); // get the mongoose model for company

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

router.post('/signupbusiness', function(req, res) {
  //console.log('req: ', req);
  console.log('req.body: ', req.body);

  console.log('email: ', req.body.email);
  console.log('name: ', req.body.name);
  console.log('owner: ', req.body.owner);
  console.log('number: ', req.body.number);
  console.log('address: ', req.body.address);
  console.log('service: ', req.body.service);
  //console.log('details: ', req.body.services.details);
  console.log('descriptions: ', req.body.descriptions);
  console.log('password: ', req.body.password);

  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {



var add = req.body.address; 
var late
var longe

request({
    uri: 'https://maps.googleapis.com/maps/api/geocode/json?address='+add,
    json: true
    
   }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
      //console.log(body.results[0].geometry.location.lat)
      late=body.results[0].geometry.location.lat; 
      longe=body.results[0].geometry.location.lng; 
      console.log('lat from map'+late);
      console.log('long from map' + longe);
    }
    });






    var newCompany = new Company({
      email: req.body.email,
      name: req.body.name,
      owner: req.body.owner,
      number: req.body.number,
      address: req.body.address,
      //not sure if we need to do it field by field
      /**/
      service: req.body.service,
      rating: "No reviews yet",
      /**/
      //services = req.body.services,
      descriptions: req.body.descriptions,

      location:{
          longitude: 123,
          latitude: 123
      },
      password: req.body.password
      
    });
    // save the user
    newCompany.save(function(err) {
      if (err) {
        console.log('save err: ', err);
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});





module.exports = router;
