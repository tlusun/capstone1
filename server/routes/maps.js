var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/map', function(req, res, next) {
  request({
    uri: 'https://maps.googleapis.com/maps/api/geocode/json?address=toronto',
    
   }).pipe(res);
});

module.exports = router;