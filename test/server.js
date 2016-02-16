
var server; 

var express        = require('express');
var app            = express();
var http           = require('http');

var port = 8091;

app.use(express.static(__dirname + '/public'));   

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html'); 
});

server = http.createServer(app).listen(port); 

console.log('Magic happens on port ' + port); 			

