var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql')

//POST방식을 사용하기 위해서는 아래의 코드가 필요함//
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded ({
  extended: true
}));
app.use(bodyParser.json());
////////////////////////////여기까지//////////////////////////

var connection = mysql.createConnection({
  host: 'localhost'
  , port: 3306
  , user: 'root'
  , password: 'root'
  , database: 'webUI'
});

app.get('/select', function(req, res) {
  var no = req.query.no;
  var selectQuery = `select * from news`;
  //함수를 실행(데이터베이스에 실행할 쿼리, 실행되고나서 처리될 함)
  connection.query(selectQuery, function (err, rows, fields) { //row가 실행될 값
      console.log(rows);
      // res.send(rows);
    });
});

app.get('/form', function (req, res) {
  res.sendfile("html.html");
});

app.get('/dbSelectTest', function (req, res) {
  var selectQuery = `select title from news`;

  connection.query(selectQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/form2', function (req, res) {
  res.sendfile("newList.html");
});

app.get('/newList', function (req, res) {
  var selectQuery = `select * from news`; //출력할 내용이 담긴 쿼리

//위에서 connection 변수에 담아준 db정보에 접속하여 여기서 작성한 쿼리를 담아줌
  connection.query(selectQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/form3', function (req, res) {
  res.sendfile("insert.html");
});

app.post('/insert', function (req, res) { //get 대신에 post로 변경가능
  // var title = req.query.title //.html에서 받아온 title을 변수 title에 넣어줄거야
  // var text = req.query.text
  //POST 방식 사용하려면 query. 대신 body.으로 바꿔야함
  var user = req.body.user
  var title = req.body.title
  var text = req.body.text
  var insertQuery = `insert into news(title, text, user) values ("${title}", "${text}", "${user}")`;
  connection.query(insertQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/form4', function (req, res) {
  res.sendfile("newDelete.html");
});

app.get('/newDelete', function (req, res) { //get 대신에 post로 변경가능
  // var title = req.query.title //.html에서 받아온 title을 변수 title에 넣어줄거야
  // var text = req.query.text
  //POST 방식 사용하려면 query. 대신 body.으로 바꿔야함
  var deleteQuery = `truncate table news`;
  connection.query(deleteQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/deleteOneNews', function (req, res) { //한개씩 삭제하도록 하는 라우터
  var number = req.query.number;
  var deleteQuery = `delete from news where no='${number}';`;
  connection.query(deleteQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.post('/changeOneNews', function (req, res) { //수정하는 라우터
  var changeQuery = `update news set title =
  '${req.body.title}' , text = '${req.body.text}', user = '${req.body.user}'
  where no = '${req.body.no}';`;
  console.log(changeQuery)
  connection.query(changeQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/updateNewsForm', function (req, res) {
  res.sendfile("updateNewsForm.html");
});

app.get('/getInforForUpdateNews', function (req, res) {
  var no = req.query.no;
  var selectQuery = `select * from news where no=${no}`
  connection.query(selectQuery, function(err, rows, fields) {
    res.send(rows);
  })
});
