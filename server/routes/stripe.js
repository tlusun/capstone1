var express = require('express');
var router = express.Router();

var config = require('../config/stripe');

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

        stripe.charges.create({
          amount: req.body.amount,
          currency: "cad",
          source: token.id, // obtained with Stripe.js
          destination: req.body.destination,
          description: "Test charge :)"
        }, function(err, charge) {
          // asynchronously called
          if (err){
            res.send(err);
          } else{
            res.send(charge);
          }
        });
    }
    });
});

module.exports = router;
