
var express = require('express');
var url = require('url');
var path    = require("path");
var app = express();
var fs = require("fs");
var mysql      = require('mysql');


//var db_config = require("./public/dbconfig");
//db_config.init;
var connection = mysql.createConnection({
  host     : 'insighteye.gptt.com.tw',
  user     : 'root',
  password : 'sandy19891031',
  database : 'interview',
  port     : '6603' 
});

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection: ' + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}

handleDisconnect(connection);

//放置靜態網頁
app.use('/public', express.static(__dirname + '/public'));

app.get('/page/emails/main', function (req, res) {
	res.sendFile(path.join(__dirname+'/public/cc.html'));
});
app.get('/api/emails/sub', function (req, res) {
 getSubList(req,res);
});
app.get('/api/emails/notsub', function (req, res) {
 getNotSubList(req,res);
});
app.post('/api/emails/many',  function (req, res) {
     var Str = '';
     req.on("data",function(chunk){
        Str += chunk.toString();
        var data=JSON.parse(Str);;
       // updateSubList(data,res);
         var query=''; 
  for (var i = 0; i < data.length; i++) {
      query = "UPDATE mail_subscribe SET " +
               " subscribed = "+data[i].subscribed +
               " where memNo = "+data[i].memNo;
     connection.query(query, function (error, results, fields) {
     if(!error) {
             // res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
                 //res.json(results);
               }  
      });         
               

 }


    });

})


function getSubList(req,res) {

connection.query('select * from mail_subscribe where subscribed=1', function (error, results, fields) {
   if(!error) {
                res.json(results);
            }  
    });
}

function getNotSubList(req,res) {
   connection.query('select * from mail_subscribe where subscribed=0', function (error, results, fields) {
     if(!error) {
                  res.json(results);
              }  
  });

}

function updateSubList(data){ //更新訂閱狀態
  // var query=''; 
  // for (var i = 0; i < data.length; i++) {
  //     query = "UPDATE mail_subscribe SET " +
  //              " subscribed = "+data[i].subscribed +
  //              " where memNo = "+data[i].memNo;
  //    connection.query(query, function (error, results, fields) {
  //    if(!error) {
  //             res.writeHead(200, "OK", {'Content-Type': 'text/plain'});
  //                //res.json(results);
  //              }  
  //     });         
               

 // }
 


}

var server = app.listen(1234, function () {
  var host = server.address().address
  var port = server.address().port
})


// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'insighteye.gptt.com.tw',
//   user     : 'root',
//   password : 'sandy19891031',
//   database : 'interview',
//   port     : '6603' 
// });

// connection.connect();
// connection.query('SELECT * FROM mail_subscribe;', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results);
// });



// connection.end();
