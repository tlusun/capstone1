var router = require('express').Router();
var User = require('../app/models/user'); // get the mongoose model for login user

router.post('/signup', function(req, res) {
  //console.log('req: ', req);
  console.log('req.body: ', req.body);

  console.log('email: ', req.body.email);
  console.log('password: ', req.body.password);

  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      console.log('save err: ', err); 
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

module.exports = router;
