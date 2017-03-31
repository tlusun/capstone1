var express = require('express');
var router = express.Router();

var config = require('../config/stripe');

var Order = require('../app/models/order');
var mongoose = require('mongoose');

router.delete('/delete-account', function (req, res) {
  //STRIPE API KEY
  var STRIPE_API_SECRET_KEY  = config.secret;
  var stripe     = require("stripe")(STRIPE_API_SECRET_KEY);

  stripe.accounts.del(req.body.account, function(err,account) {
    if (err) {
      res.send(err);
    } else {
      res.send(account);
    }
  });
});

router.post('/test-register', function (req, res){
    //STRIPE API KEY
    var STRIPE_API_SECRET_KEY  = config.secret;
    var stripe     = require("stripe")(STRIPE_API_SECRET_KEY);

    stripe.accounts.create({
      managed: false,
      country: 'CA',
      email: req.body.email
    }, function(err, account) {
      // asynchronously called
      if (err) {
        res.send(err);
      }
      else {
        res.send(account);
      }
    });
});

router.post('/charge', function(req, res) {
    //STRIPE API KEY
    var STRIPE_API_SECRET_KEY  = config.secret;
    var stripe     = require("stripe")(STRIPE_API_SECRET_KEY);

    stripe.tokens.create({
      card: {
        "number": req.body.number,
        "exp_month": req.body.exp_month,
        "exp_year": req.body.exp_year,
        "cvc": req.body.cvc
      }
    }, function(err, token) {
      if (err){
        res.send(err);
      } else {
        // asynchronously called
        console.log("token.id: ", token.id);
        console.log("PAY ATTENION HERE, ID OF ORDER: ", req.body.id);

        stripe.charges.create({
          amount: req.body.amountCents, //IN CENTS!
          currency: req.body.currency,
          source: token.id, // obtained with Stripe.js
          destination: req.body.destination,
          description: req.body.description
        }, function(err, charge) {
          // asynchronously called
          if (err){
            console.log("charge failed. err: ", err);
            //DON'T CHANGE THE STATUS OF THE ORDER
            res.send(err);
          } else{
            console.log("charge: ", charge);

            //TODO: CHANGE THE STATUS OF THE ORDER
            Order.findById(req.body.id, function (err, order) {
              if (err) return handleError(err);

              order.status = "Complete-Paid"; //TODO: HARDCODED?
              order.save(function (err, order) {
                if (err) {
                  response.send({
                      statusCode: "402",
                      message: "Payment succeeded, but database failed."
                  });
                } else {
                  res.send(charge);
                }
              });
            });


            //res.send(charge);
          }
        });
    }
    });
});

module.exports = router;
