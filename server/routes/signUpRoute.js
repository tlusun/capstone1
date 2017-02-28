var router = require('express').Router();
var User = require('../app/models/user'); // get the mongoose model for login user

router.post('/signup', function(req, res) {
  //console.log('req: ', req);
  console.log('req.body: ', req.body);

  console.log('email: ', req.body.email);
  console.log('password: ', req.body.password);
  console.log('firstName: ', req.body.firstName);
  console.log('lastName: ', req.body.lastName);
  console.log('number: ', req.body.number);
  console.log('address: ', req.body.address);

  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      number: req.body.number,
      address: req.body.address
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        console.log('save err: ', err);
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

module.exports = router;
