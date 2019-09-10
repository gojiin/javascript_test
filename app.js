var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var request = require('request');
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({limit:'50mb', extended: false}));
app.use(bodyParser.json({limit:'50mb'}));

var cheerio = require('cheerio');

//mysql 연결
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost'
  , port: 3306
  , user: 'root'
  , password: 'root'
  , database: 'webUI'
});

//postList 페이지 불러오기
app.get('/home', function (req, res) {
  res.sendfile("home.html");
});

app.get('/getMenu', function (req, res) {
  var menu = []
  request({
    uri: "http://www.kopo.ac.kr/kangseo/content.do?menu=262",
  }
  ,function(err, response, body) {
    let $ = cheerio.load(body);
    // console.log("============메뉴================")
    // console.log($("td")[2].children[1].children[0].data.replace(/,/gi, "").replace(/\n/gi,"").split(" "));
    // console.log(($("td").length));
    // var td_length = $("td").length

    for (var i =0; i < 5; i++) {
      menu.push($("td")[i*4+2].children[1].children[0].data.replace(/,/gi, "").replace(/\n/gi,"").split(" "));
    }
    res.send(menu);
  });

});
