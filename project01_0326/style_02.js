var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);

app.get('/style_02', function (req, res) {
  res.sendfile("style_02.html");
});

app.get('/javascript', function (req, res) {
  res.sendfile("javascript.html");
});

app.get('/javascript_02', function (req, res) {
  res.sendfile("javascript_02.html");
});
