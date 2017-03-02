var router = require('express').Router();
var mongoose = require('mongoose');

router.get('/company', function(req, res){
  mongoose.model('Company').find(function (err, companys){
    res.send(companys);
  })
});

router.get('/user', function(req, res){
  mongoose.model('User').find(function (err, users){
    res.send(users);
  })
});

router.get('/invoice', function(req, res){
  mongoose.model('Invoice').find(function (err, invoices){
    res.send(invoices);
  })
});

router.get('/review', function(req, res){
  mongoose.model('Review').find(function (err, reviews){
    res.send(reviews);
  })
});

router.get('/contacts', function(req, res){
  mongoose.model('Contact').find(function (err, contacts){
    res.send(contacts);
  })
});

router.get('/user/:email', function(req, res){
mongoose.model('User').findOne({email: req.params.email}, function(err, doc){
  console.log('doc', doc);
  res.send(doc);
  })
});

router.get('/company/:email', function(req, res){
  mongoose.model('Company').findOne({email: req.params.email}, function(err, doc){
    console.log('doc', doc);
    res.send(doc);
  })
});

router.get('/ordersforcustomer/:userEmail', function(req, res){
mongoose.model('Order').find({userEmail: req.params.userEmail}, function(err, orders){
  console.log('doc', orders);
  res.send(orders);
  })
});

router.get('/ordersforbusiness/:businessEmail', function(req, res){
mongoose.model('Order').find({businessEmail: req.params.businessEmail}, function(err, orders){
  console.log('doc', orders);
  res.send(orders);
  })
});

router.get('/review/:companyEmail', function(req, res){
  mongoose.model('Review').find({companyEmail: req.params.companyEmail}, function(err, reviews){
    console.log('reviews by companyEmail: ', reviews);
  res.send(reviews);
  })
});

module.exports = router;
