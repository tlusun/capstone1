var express = require('express');
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');
var Promises = require('promise');


router.get('/map/new/:location', function(req,res,next) {
  var some= req.params.location;
  var late;
  var longe;
  var add;
  var newlat;
  var newlong;
  var array = [];

  var promise = new Promises(function (resolve,reject){

    request({
      uri: 'https://maps.googleapis.com/maps/api/geocode/json?address='+some,
      json: true

    }, function(error, response, body) {

        //console.log(body.results[0].geometry.location.lat)

      if (!error && response.statusCode === 200 && body.status!="ZERO_RESULTS") {

        console.log(body.results[0].geometry.location.lat);
        late=body.results[0].geometry.location.lat;
        longe=body.results[0].geometry.location.lng;
        console.log('lat1 from map'+late);
        console.log('long1 from map' + longe);
        resolve(late);
      }
      else{
        reject("Fail1");
        res.send('fail');}
    });


  });

  promise.then(function (data){
    return new Promises(function (resolve,reject){
      console.log("data", data);
      request({
        uri: 'http://localhost:8080/api/company',
        json: true

      }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var count = 0;
          var proms = [];
          for (count = 0; count < body.length; count++) {


            function dothing(count, body) {

              return new Promises(function (resolve, reject) {
            //    console.log("BODY", body[count]);
                add = body[count].address;
                console.log("address", add);
                request({
                  uri: 'https://maps.googleapis.com/maps/api/geocode/json?address=' + add,
                  json: true

                }, function (error, response, body) {
                  if (!error && response.statusCode === 200) {
                    //console.log(body.results[0].geometry.location.lat)

                      newlat = body.results[0].geometry.location.lat;
                      newlong = body.results[0].geometry.location.lng;


                    console.log(newlat);
                    console.log(newlong);
                  }
                  resolve(data);
                });


              }, function (reason) {

              }).then(function (data) {
                console.log('this is London Lat' + newlat);
                console.log('this is London Long' + newlong);
                console.log('this NewYork Late' + late);
                console.log('this NewYork Long' + longe);
                console.log('this is late' + late);
                var lat2 = newlat;
                var lon2 = newlong;
                var lat1 = late;
                var lon1 = longe;

                var input1 = Math.cos((90 - lat1) * Math.PI / 180);
                var input2 = Math.cos((90 - lat2) * Math.PI / 180);
                var input3 = Math.sin((90 - lat1) * Math.PI / 180);
                var input4 = Math.sin((90 - lat2) * Math.PI / 180);
                var input5 = Math.cos((lon2 - lon1) * Math.PI / 180);

                var ans = Math.acos(input1 * input2 + input3 * input4 * input5) * 6371;




               var R = 6371; // km
               //has a problem with the .toRad() method below.
               var x1 = lat2-lat1;
               var dLat = x1*Math.PI / 180;
               var x2 = lon2-lon1;
               var dLon = x2*Math.PI / 180;

               var gg= lat1*Math.PI / 180;
               var ff= lat2*Math.PI / 180;

               var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                               Math.cos(gg) * Math.cos(ff) *
                               Math.sin(dLon/2) * Math.sin(dLon/2);
               var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
               var d = R * c;
              console.log("distance",d);


                var num = Math.floor(lat1);
                var chicken = Math.cos(num);

                if (d < 25){
                  array.push(body[count]);

                }

                resolve(chicken);
              });
            }

            proms.push(dothing(count, body));


          }







            Promise.all(proms)
              .then(function (data) {
                res.send(array);
              })
              .catch(function (err) {
              });
          }

          resolve(array);
        });


      });
    }, function(reason){
      console.log("fail");

    }).then(function(data){
      console.log("array", data);
      resolve();
    },function(reason){

    });




});









router.get('/map/:location', function(req, res, next) {
  var some= req.params.location;
  var late;
  var longe;
  var add;
  var newlat;
  var newlong;


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
    }
  });

  next();

  console.log('this came first');
  request({
    uri: 'http://localhost:8080/api/company',
    json: true

  }, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var count=0;
      for(count = 0; count < body.length; count++){
        //console.log(body)
        add = body[count].address
        console.log(add);
        request({
          uri: 'https://maps.googleapis.com/maps/api/geocode/json?address='+add,
          json: true

        }, function(error, response, body) {
          if (!error && response.statusCode === 200) {
            //console.log(body.results[0].geometry.location.lat)
            newlat=body.results[0].geometry.location.lat;
            newlong=body.results[0].geometry.location.lng;
            console.log(newlat);
            console.log(newlong);
          }
        })


        console.log('this is late' + late);
        var lat2 = newlat;
        var lon2 = newlong;
        var lat1 = late;
        var lon1 = longe;

        var input1 = Math.cos((90-lat1)*Math.PI / 180);
        var input2 = Math.cos((90-lat2)*Math.PI / 180);
        var input3 = Math.sin((90-lat1)*Math.PI / 180);
        var input4 = Math.sin((90-lat2)*Math.PI / 180);
        var input5 = Math.cos((lon2-lon1)*Math.PI / 180);

        var ans = Math.acos(input1*input2 +input3*input4 * input5)*6371

// var R = 6371; // km
// //has a problem with the .toRad() method below.
// var x1 = lat2-lat1;
// var dLat = x1*Math.PI / 180;
// var x2 = lon2-lon1;
// var dLon = x2*Math.PI / 180;

// var gg= lat1*Math.PI / 180;
// var ff= lat2*Math.PI / 180;

// var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//                 Math.cos(gg) * Math.cos(ff) *
//                 Math.sin(dLon/2) * Math.sin(dLon/2);
// var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// var d = R * c;

        var num = Math.floor(lat1);
        var chicken = Math.cos(num);

        console.log('this is ans: ', chicken);

        if (ans<25)
          console.log('ye');





      }
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
