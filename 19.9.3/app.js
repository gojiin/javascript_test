var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var request = require('request');

//mysql 연결
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost'
  , port: 3306
  , user: 'root'
  , password: 'root'
  , database: 'webUI'
});

// post방식 사용
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded ({
  extended: true
}));
app.use(bodyParser.json());

//postList 페이지 불러오기
app.get('/postList', function (req, res) {
  res.sendfile("postList.html");
});

// app.get('/database', function (req, res) {
//   var selectQuery = `select * from post`;
// // db와 연결해주는 형식일뿐 그냥 외우자
//   connection.query(selectQuery, function(err, rows, fields){
//     if (err) throw err;
//     console.log(rows)
//     res.send(rows) //rows가 결과값으로 옴
//   });
// // 여기까지
// });

// post DB 내용 select
app.get('/getPost', function(req, res){
  // var number = req.query.number;
  var selectNoQuery = `select no,title from post`
  connection.query(selectNoQuery, function(err, rows, fields){
    if (err) throw err;
    console.log(rows)
    res.send(rows)
  });
});


app.get('/postDetail', function(req, res){
  var q = req.query.no;
  var selectNoQuery2 = `select * from post where no=${q}`;
  connection.query(selectNoQuery2, function(err, rows, fields){
    if (err) throw err;
    console.log(rows)
    res.send(rows)
  });

});

app.get('/postLink', function(req, res){
    res.sendfile("details.html")
});

app.get('/modify', function(req, res){
    res.sendfile("modify.html")
});

app.get('/modifyDetails', function(req, res){
  var title = req.query.title
  var content = req.query.content
    res.send(rows)
});

app.post('/updatePost', function(req, res){
  var title = req.body.title
  var content = req.body.content
  var no = req.body.no
  var updateQuery = `update post set title = "${title}", content="${content}" where no = "${no}" `;
  connection.query(updateQuery, function(err, rows, fields){
    if (err) throw err;
    res.send(rows)
  })
});

app.get('/newPost', function(req, res){
    res.sendfile("newPost.html")
});

app.post('/insert', function(req, res){
  var title = req.body.title
  var content = req.body.content
  var insertQuery = `insert into post(title, content) values("${title}","${content}")`;
  connection.query(insertQuery, function(err, rows, fields){
    if (err) throw err;
    res.send(rows)
  });
});

app.get('/delete', function(req, res){
  var no = req.query.no;
  var deleteQuery = `delete from post where no="${no}"`;
  connection.query(deleteQuery, function(err, rows, fields){
    if (err) throw err;
    res.send(rows)
  });
});
