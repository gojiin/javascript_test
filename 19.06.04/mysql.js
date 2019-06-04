var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(80);
var mysql = require('mysql')
var request = require('request');

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

app.get('/t', function (req, res) {
  res.sendfile("t.html");
});

app.get('/timeFunction', function (req, res) {
  res.sendfile("timeFunction.html");
});

app.get('/flightList', function (req, res) {
  res.sendfile("flightList.html");
});

app.get('/aircraft', function (req, res) {
  res.sendfile("aircraft.html");
});

app.get('/flightPage', function (req, res) {
  res.sendfile("flightPage.html");
});

app.post('/flightDB', function (req, res) {
  var flightName = req.body.flightName
  var aircraftCode = req.body.aircraftCode
  var departure = req.body.departure
  var arrival = req.body.arrival
  var departTime = req.body.departTime
  var arrivalTime = req.body.arrivalTime
  var insertQuery = `insert into flight(flightName, aircraftCode, departure, arrival, departTime, arrivalTime)
  values ("${flightName}", "${aircraftCode}", "${departure}", "${arrival}", "${departTime}", "${arrivalTime}")`;
  connection.query(insertQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/selectFlight', function (req, res) {
  var selectQuery = `select * from flight`;

  connection.query(selectQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/deleteFlight', function (req, res) { //한개씩 삭제하도록 하는 라우터
  var number = req.query.number;
  var deleteQuery = `delete from flight where no='${number}';`;
  connection.query(deleteQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.post('/aircraftDB', function (req, res) {
  var inputAircraftCode = req.body.inputAircraftCode
  var inputAircraftName = req.body.inputAircraftName
  var inputSeat = req.body.inputSeat
  var insertQuery = `insert into aircraft (aircraftCode, aircraftName, seats)
  values ("${inputAircraftCode}", "${inputAircraftName}", "${inputSeat}")`;
  connection.query(insertQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/selectAircraft', function (req, res) {
  var selectQuery = `select * from aircraft`;
  connection.query(selectQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/deleteAircraft', function (req, res) { //한개씩 삭제하도록 하는 라우터
  var number = req.query.number;
  var deleteQuery = `delete from aircraft where no='${number}';`;
  connection.query(deleteQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/joinData', function (req, res) {
  var selectQuery = `select * from aircraft a, flight b where a.aircraftCode = b.aircraftCode`;
  connection.query(selectQuery, function(err, rows, fields) {
    res.send(rows);
  });
});

app.get('/requestTest', function (req, res) {
  res.send("메롱") //res.send는 그냥 html창에 띄어주는것뿐
  setInterval(function(){
    request.get('https://polling.finance.naver.com/api/realtime.nhn?query=SERVICE_ITEM:005930|SERVICE_RECENT_ITEM:005930', function(err, response, body) {
      body = JSON.parse(body) //응답이 텍스트로 와서 객체로 받음
      var price = body.result.areas[1].datas[0].nv;
      console.log(price)
      var insertQuery = `insert into time(price) values(${price})`;
      console.log(insertQuery)
      // console.log(body.result.areas[1].datas[0].nv+"")
      connection.query(insertQuery, function(err, rows, fields) {
        if (err) throw err;
    })
  });
  }, 1000);
});

app.get('/ajax', function (req, res) {
  res.sendfile("ajax.html")
});

app.get('/googleChart', function (req, res) {
  res.sendfile("googleChart.html")
});

app.get('/googleChart2', function (req, res) {
  res.sendfile("googleChart2.html")
});
