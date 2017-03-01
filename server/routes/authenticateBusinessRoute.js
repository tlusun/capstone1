var router = require('express').Router();
var Company = require('../app/models/company'); // get the mongoose model for login user
var jwt = require('jwt-simple');

//get db config file
var config = require('../config/database');

router.post('/authenticate-business', function(req, res) {
  Company.findOne({
    email: req.body.email
  }, function(err, company) {
    if (err) throw err;

    if (!company) {
      res.send({success: false, msg: 'Authentication failed. Company not found.'});
    } else {
      // check if password matches
      company.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if company is found and password is right create a token
          var token = jwt.encode(company, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

module.exports = router;
