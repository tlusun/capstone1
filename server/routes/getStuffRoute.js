var router = require('express').Router();

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

module.exports = router; 
