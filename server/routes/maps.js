var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');

router.get('/map/:location', function(req, res, next) {
  var some= req.params.location; 
  var lat;
   var long;
  request({
    uri: 'https://maps.googleapis.com/maps/api/geocode/json?address='+some,
    json: true
    
   }, function(error, response, body) {
            if (!error && response.statusCode === 200) {
      console.log(body.results[0].geometry.location.lat) // Print the json response
    }
    });
res.send("Thanks!");




});



router.get('/paypal', function(req, res, next) {
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
});

module.exports = router;