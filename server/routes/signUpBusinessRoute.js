var router = require('express').Router();
var Company = require('../app/models/company'); // get the mongoose model for company

router.post('/signupbusiness', function(req, res) {
  //console.log('req: ', req);
  console.log('req.body: ', req.body);

  console.log('email: ', req.body.email);
  console.log('name: ', req.body.name);
  console.log('owner: ', req.body.owner);
  console.log('number: ', req.body.number);
  console.log('address: ', req.body.address);
  console.log('services: ', req.body.services);
  console.log('service: ', req.body.services.service);
  console.log('details: ', req.body.services.details);
  console.log('price: ', req.body.services.price);
  console.log('descriptions: ', req.body.descriptions);
  console.log('password: ', req.body.password);

  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    var newCompany = new Company({
      email: req.body.email,
      name: req.body.name,
      owner: req.body.owner,
      number: req.body.number,
      address: req.body.address,
      //not sure if we need to do it field by field
      /**/
      services: {
        service: req.body.services.service,
        details: req.body.services.details,
        price: req.body.services.price
      },
      /**/
      //services = req.body.services,
      descriptions: req.body.descriptions,
      password: req.body.password,
    });
    // save the user
    newCompany.save(function(err) {
      if (err) {
        console.log('save err: ', err);
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

module.exports = router;
