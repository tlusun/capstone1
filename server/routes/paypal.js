var paypal = require('paypal-rest-sdk');
var config = {};
var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');

/*
 * SDK configuration
 */

exports.init = function(c){
  config = c;
  paypal.configure(c.api);
}	

router.get('/cal' ,function(req,res,next) {
    var i =08909; 
    res.send(i);
});


router.get('/create', function(req, res, next) {
	exports.create = function (req, res) {
  var method = req.param('method');

  var payment = {
    "intent": "sale",
    "payer": {
    },
    "transactions": [{
      "amount": {
        "currency": req.param('currency'),
        "total": req.param('amount')
      },
      "description": req.param('description')
    }]
  };

  if (method === 'paypal') {
    payment.payer.payment_method = 'paypal';
    payment.redirect_urls = {
      "return_url": "http://yoururl.com/execute",
      "cancel_url": "http://yoururl.com/cancel"
    };
  } else if (method === 'credit_card') {
    var funding_instruments = [
      {
        "credit_card": {
          "type": req.param('type').toLowerCase(),
          "number": req.param('number'),
          "expire_month": req.param('expire_month'),
          "expire_year": req.param('expire_year'),
          "first_name": req.param('first_name'),
          "last_name": req.param('last_name')
        }
      }
    ];
    payment.payer.payment_method = 'credit_card';
    payment.payer.funding_instruments = funding_instruments;
  }

  paypal.payment.create(payment, function (error, payment) {
    if (error) {
      console.log(error);
      res.render('error', { 'error': error });
    } else {
      req.session.paymentId = payment.id;
      res.render('create', { 'payment': payment });
    }
  });
};
});

router.get('/execute', function(req, res, next) {
	exports.execute = function(req, res){
	  var paymentId = req.session.paymentId;
	  var payerId = req.param('PayerID');

	  var details = { "payer_id": payerId };
	  paypal.payment.execute(paymentId, details, function (error, payment) {
	    if (error) {
	      console.log(error);
	    } else {
	      res.send("Hell yeah!");
	    }
	  });
	};
});


router.get('/cancel', function(req, res, next) {
	exports.cancel = function(req, res){
	  res.send("The payment got canceled");
	};
});
module.exports = router;