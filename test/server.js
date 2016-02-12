
var server; 

var express        = require('express');
// var morgan         = require('morgan');
// var bodyParser     = require('body-parser');
var app            = express();
var http           = require('http');

var port = 8091;

// app.use(morgan(envVars.logging)); 					// log every request to the console
app.use(express.static(__dirname + '/public'));   // set the static files location /public/img will be /img for users
// app.use(express.static(__dirname + '/')); 	// set the static files location /public/img will be /img for users
// app.use(bodyParser.json()); // parse application/json 
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

// default routing.  needed for page refresh to reroute to index to handle all angular requests
app.get('*', function(req, res) {
  // res.sendFile(__dirname + '/public/index.html'); // load our public/index.html file
  res.sendFile(__dirname + '/public/index.html'); // load our public/index.html file
	// res.sendFile(__dirname + '/test.html'); // load our public/index.html file
	});

  server = http.createServer(app).listen(port); 

console.log('Magic happens on port ' + port); 			// shoutout to the user

