var router = require('express').Router();
var Company = require('../app/models/company');
var Order = require('../app/models/order');
var User = require('../app/models/user');
var request = require('request');
var Promises = require('promise');


var mongoose = require('mongoose');

router.put('/order/status/:id', function (req, res) {
  console.log("what is in this req: ", req.body.status);
  var id = req.params.id;

  Order.findById(id, function (err, order) {
    if (err) return handleError(err);

    order.status = req.body.status; //TODO: MAKE SURE THIS WORKS
    order.save(function (err, order) {
      if (err) response.send(err);
    res.status(201).json({success: true});
    });
  });

});


router.put('/company/services/:id', function (req, res) {
  console.log("what is in this req: ", req.body.services);
  var id = req.params.id;

  Company.findById(id, function (err, company) {
    if (err) return handleError(err);

    company.services = req.body.services; //TODO: MAKE SURE THIS WORKS
    company.save(function (err, company) {
      if (err) res.send(error);
      res.status(201).json({success: true});
    });
  });

});


router.put('/company/rating/:id', function (req, res) {
  console.log("what is in this req: ", req.body.rating);
  var id = req.params.id;

  Company.findById(id, function (err, company) {
    if (err) return handleError(err);

    company.rating = req.body.rating; //TODO: MAKE SURE THIS WORKS
    company.save(function (err, company) {
      if (err) res.send(error);
      res.status(201).json({success: true});
    });
  });

});


router.put('/company/:id', function (req, res) {
  console.log("what is in this req: ", req.body.company);
  var id = req.params.id;
var late;
var longe;
  Company.findById(id, function (err, company) {
    if (err) return handleError(err);
    var promise = new Promises(function (resolve, reject) {
      company.descriptions = req.body.company.descriptions;
      company.address = req.body.company.address;
      company.number = req.body.company.number;
      company.service = req.body.company.service;//TODO: MAKE SURE THIS WORKS

      request({
        uri: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + company.address,
        json: true

      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          //console.log(body.results[0].geometry.location.lat)
          console.log("addre                                              ss", company.address);
          late = body.results[0].geometry.location.lat;
          longe = body.results[0].geometry.location.lng;
          console.log('lat1 from map' + late);
          console.log('long1 from map' + longe);
          company.location.longitude = longe;
          company.location.latitude = late;
          console.log('lat1 from map2222222222222222222222222', company.location);
          console.log('long1 from map2222222222222222222222222222', company.location.longitude);
          resolve();
        }

      });

      console.log('lat1 from map222222222222222222223333333333322222', company.location);
      console.log('long1 from map222222222222222222222222222333333333333332', company.location.longitude);

    });
    promise.then(function (data) {
      company.save(function (err, company) {
        if (err) res.send(error);
        res.status(201).json({success: true});
      });
    });
    });


});

router.put('/user/:id', function (req, res) {
  console.log("what is in this req: ", req.body.user);
  var id = req.params.id;

  User.findById(id, function (err, user) {
    if (err) return handleError(err);

    user.firstName = req.body.user.firstName;
    user.address = req.body.user.address;
    user.number = req.body.user.number;
    user.save(function (err, user) {
      if (err) res.send(error);
      res.status(201).json({success: true});
    });
  });

});

module.exports = router;
