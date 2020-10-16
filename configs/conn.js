var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'my.icademy.dev.kelola.co.id',
  port 		 : '8000',
  user     : 'kelola',
  password : 'kelola123',
  database : 'restfull'
});
 
connection.connect(() => console.log('Connected to database'));
 
module.exports = connection;