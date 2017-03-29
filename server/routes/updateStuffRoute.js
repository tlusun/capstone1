var router = require('express').Router();
var Company = require('../app/models/company');
var Order = require('../app/models/order');
var User = require('../app/models/user');


var mongoose = require('mongoose');

router.put('/order/status/:id', function (req, res) {
  console.log("what is in this req: ", req.body.status);
  var id = req.params.id;

  Order.findById(id, function (err, order) {
    if (err) return handleError(err);

    order.status = req.body.status; //TODO: MAKE SURE THIS WORKS
    order.save(function (err, order) {
      if (err) response.send(error);
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
router.put('/company/:id', function (req, res) {
  console.log("what is in this req: ", req.body.company);
  var id = req.params.id;

  Company.findById(id, function (err, company) {
    if (err) return handleError(err);

    company.descriptions = req.body.company.descriptions;
    company.address = req.body.company.address;
    company.number = req.body.company.number;
    company.service = req.body.company.service;//TODO: MAKE SURE THIS WORKS
    company.save(function (err, company) {
      if (err) res.send(error);
      res.status(201).json({success: true});
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
