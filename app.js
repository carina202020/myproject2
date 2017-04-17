
var express = require('express');
var path    = require("path");
var app = express();
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : '',
  port     : '' 
});

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }
    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }
    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}

//handleDisconnect(connection);


//放置靜態網頁
app.use('/public', express.static(__dirname + '/public'));


app.get('/page/emails/main', function (req, res) {
	res.sendFile(path.join(__dirname+'/public/main.html'));
});
app.get('/api/emails/all', function (req, res) {
 getSubListAll(req,res);
});
app.post('/api/emails/many',  function (req, res) {
  updateSubList(req, res);
})


function getSubListAll(req,res) {
connection.query('select * from mail_subscribe', function (error, results, fields) {
   if(!error) {
                res.json(results);
            }  
    if(error){
    var response={};
    response.Code=500;
    response.Error='DateBase 無回應';
    res.status(response.Code).send(response);
     }
    }

    );
}
function updateSubList(req,res){ //更新訂閱狀態
  var Str = '';
    req.on("data",function(chunk){
        Str += chunk.toString();
    var data=JSON.parse(Str);

    var query ="update mail_subscribe SET subscribed = (case " ;
    for(var i = 0; i < data.length; i++)
      {
        query += " when memNo = " + data[i].memNo + " then " + data[i].subscribed ;
      }
       query +=  " end)";       

  connection.query(query, function (error, results, fields) {
     if(!error) {
                var response={};
                response.Code=200;
                response.Message='系統更新完畢';
                res.status(response.Code).send(response);

               }  
      else{
        var response={};
                response.Code=500;
                response.error='系統更新失敗';
                res.status(response.Code).send(response);

          }         
      });   
  });

}

var server = app.listen(1234, function () {
  var host = server.address().address
  var port = server.address().port
})


