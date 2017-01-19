/**
 * Created by Tommy on 1/18/2017.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.set('port', process.env.PORT || 8080);
app.use(express.static("www")); // Our Ionic app build is in the www folder (kept up-to-date by the Ionic CLI using 'ionic serve')


// Initialize database connection and then start the server.


// Initialize the app.
  app.listen(app.get('port'), function () {
    console.log("You're a wizard, Harry. I'm a what? Yes, a wizard, on port", app.get('port'));
  });

