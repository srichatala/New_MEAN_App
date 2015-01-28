var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.port || 1337;

var app = express();
app.use(bodyParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function (request, response) {
    response.sendfile('index.html');
});
app.listen(port);