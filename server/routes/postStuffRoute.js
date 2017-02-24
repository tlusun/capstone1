var router = require('express').Router();

//this function is not needed for now since signUpRoute will post the user to the db
/*
router.post('/user', function (req, res){

  var myuser = new User({
  		username:req.body.username,
	    name: req.body.name,
	    email: req.body.email,
	    number: req.body.number,
	   	address: req.body.address,
	   	password:req.body.password
  });

  myuser.save(function (error, myuser) {
      if (error) response.send(error);
      res.status(201).json({myuser});
  });
});
*/


router.post('/company', function (req, res){

  var mycompany = new Company({
  		username:req.body.username,
	    name: req.body.name,
	    email: req.body.email,
	    owner:req.body.owner,
	    number: req.body.number,
	   	address: req.body.address,
	   	service:req.body.service,
	   	descriptions:req.body.descriptions,
	   	rating:req.body.rating,
	   	password:req.body.password,
	   	price:req.body.price
  });

  mycompany.save(function (error, mycompany) {
      if (error) response.send(error);
      res.status(201).json({mycompany});
  });
});


router.post('/contacts', function (req, res){
  console.log(req.body);
  console.log('iam here');

  var person = new Contact({
    name: req.body.name,
    email: req.body.email,
    number: req.body.number
  });

  person.save(function (error, person) {
      if (error) response.send(error);
      res.status(201).json({person});
  });
});

module.exports = router;
