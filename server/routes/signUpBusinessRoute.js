var router = require('express').Router();
var Company = require('../app/models/company'); // get the mongoose model for company

var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var Promises = require('promise');

var config = require('../config/stripe');

router.post('/signupbusiness', function(req, res) {
  //console.log('req: ', req);
  console.log('req.body: ', req.body);

  console.log('email: ', req.body.email);
  console.log('name: ', req.body.name);
  console.log('owner: ', req.body.owner);
  console.log('number: ', req.body.number);
  console.log('address: ', req.body.address);
  console.log('service: ', req.body.service);
  //console.log('details: ', req.body.services.details);
  console.log('descriptions: ', req.body.descriptions);
  console.log('password: ', req.body.password);

  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass email and password.'});
  } else {
    //STRIPE API KEY
    var STRIPE_API_SECRET_KEY  = config.secret;
    var stripe     = require("stripe")(STRIPE_API_SECRET_KEY)

    stripe.accounts.create({
      managed: false,
      country: 'CA',
      email: req.body.email
    }, function(err, account) {
      // asynchronously called
      if (err) {
        console.log("error in creating stripe business account: ", err); //most likely error is caused as user is already created
      }
      else {
        console.log("stripe business account: ", account);
        //get account.id, account.keys.secret, and account.keys.publishable
        var account_id = account.id;
        var key_secret = account.keys.secret;
        var key_publishable = account.keys.publishable;

        var some =req.body.address;
        var late;
        var longe;
        console.log('some',some);

        var promise = new Promises(function (resolve,reject){
          request({
                uri: 'https://maps.googleapis.com/maps/api/geocode/json?address='+some,
                json: true


              }, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                  //console.log(body.results[0].geometry.location.lat)
                  late=body.results[0].geometry.location.lat;
                  longe=body.results[0].geometry.location.lng;
                  console.log('lat1 from map'+late);
                  console.log('long1 from map' + longe);
                  resolve(late);
                }
                else
                  reject("Fail1");
              });

        }); //END OF PROMISE 1

        promise.then(function (data) {
          var newCompany = new Company({
            email: req.body.email,
            account_id_stripe : account.id,
            keys_stripe: {
              secret : account.keys.secret,
              publishable : account.keys.publishable
            },
            name: req.body.name,
            owner: req.body.owner,
            number: req.body.number,
            address: req.body.address,
            //not sure if we need to do it field by field
            /**/
            service: req.body.service,
            rating: "No reviews yet",
            /**/
            //services = req.body.services,
            descriptions: req.body.descriptions,

            location:{
                longitude: longe,
                latitude: late
            },
            password: req.body.password

          });
          // save the user
          newCompany.save(function(err) {
            if (err) {
              console.log('save err: ', err);
              return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
          }); //end of newCompany.save


        },function(reason){

        }); //end of promise.then

      }//end of else after account creation on Stripe
    });


  } //end of else




});



module.exports = router;
