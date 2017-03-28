var init = function()
{
  connection = mysql.createConnection({
    host     : 'insighteye.gptt.com.tw',
    user     : 'root',
    password : 'sandy19891031',
    database : 'interview',
    port     : '6603' 
  });

  handleDisconnect(connection);

  this.handleDisconnect = function(connection)
  {
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
}


var connection;
module.exports = init;