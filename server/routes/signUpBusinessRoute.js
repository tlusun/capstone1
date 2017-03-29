var router = require('express').Router();
var Company = require('../app/models/company'); // get the mongoose model for company

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var Promises = require('promise');

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

    var some =req.body.address;
    var late;
    var longe;
    console.log('some',some);

  var promise = new Promises(function (resolve,reject){
    request({
          uri: 'https://maps.googleapis.com/maps/api/geocode/json?address='+some,
          json: true


        }, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            //console.log(body.results[0].geometry.location.lat)
            late=body.results[0].geometry.location.lat;
            longe=body.results[0].geometry.location.lng;
            console.log('lat1 from map'+late);
            console.log('long1 from map' + longe);
            resolve(late);
          }
          else
            reject("Fail1");
        });

  });

  promise.then(function (data) {
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
          longitude: late,
          latitude: longe
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


      },function(reason){

  });

  }




});



module.exports = router;
