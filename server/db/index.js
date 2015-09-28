var mysql = require('mysql');


// watsi db connect1ion
var connection = mysql.createConnection({
  user     : 'root',
  password : '',
  database : 'watsi'
});

// export the database
connection.connect();

// export the db connection
module.exports = connection;
