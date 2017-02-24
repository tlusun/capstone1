/**
 * Created by Tommy on 1/18/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')
var mongoose = require('mongoose');
mongoose.connect('mongodb://rishabh:rishabh123@ds139869.mlab.com:39869/rcapstone');

var contactSchema = mongoose.Schema({
	    name: String, 
	    email: String, 
	    number: String
	});


var companySchema = mongoose.Schema({
	    username:String,
	    name: String, 
	    email: String,
	    owner:String, 
	    number: String, 
	   	address: String, 
	   	service:String, 
	   	descriptions:String,
	   	rating:String, 
	   	password:String,
	   	price:Number
	});


var userSchema = mongoose.Schema({
	    username:String, 
	    name: String, 
	    email: String, 
	    number: String, 
	   	address: String,
	   	password:String
	});

var invoiceSchema = mongoose.Schema({
		customer:String, 
	    amount: String, 
	    service: String, 
	    date: String, 
	   	businessName: String,
	   	password:String
});

var reviewSchema  = mongoose.Schema({
		company:String, 
		customer:String,
		review:String, 
		reviewTitle:String
}); 


var Contact = mongoose.model('Contact', contactSchema);
var Company = mongoose.model('Company', companySchema);
var User = mongoose.model('User', userSchema);
var Invoice = mongoose.model('Invoice', invoiceSchema);
var Review = mongoose.model('Review', reviewSchema);

//var person = new Contact({name: 'riskhabh', email: 'rishabh@gmail.com', number:'8392840' });

app.get('/company', function(req, res){
  mongoose.model('Company').find(function (err, companys){
    res.send(companys);
  })
});

app.get('/user', function(req, res){
  mongoose.model('User').find(function (err, users){
    res.send(users);
  })
});

app.get('/invoice', function(req, res){
  mongoose.model('Invoice').find(function (err, invoices){
    res.send(invoices);
  })
});

app.get('/review', function(req, res){
  mongoose.model('Review').find(function (err, reviews){
    res.send(reviews);
  })
});

app.get('/contacts', function(req, res){
  mongoose.model('Contact').find(function (err, contacts){
    res.send(contacts);
  })
});

////

app.post('/user', function (req, res){

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


app.post('/company', function (req, res){

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


app.post('/contacts', function (req, res){
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

app.delete('/contacts/:id', function (req, res) {
        var id = req.params.id;
        console.log(id);

        
        Contact.remove({ _id: req.params.id}, function(error, id) {
            if (error) response.send(err);
            res.status(201).json({contacts: id});
        });

});

// Initialize database connection and then start the server.


// Initialize the app.
  app.listen(app.get('port'), function () {
    console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
  });

