var mysql = require('mysql'); // node-mysql module
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '000000',
    database : 'o2'
});