//mysql을 위한 기본설정
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '000000',
    database : 'o2'
});

connection.connect();

var sql = 'SELECT * FROM topic';
connection.query(sql,function(err,rows,fields){
    if(err){
        console.log(err);
    } else { 
        console.log('rows',rows);
        console.log('fields',fields);
    }
});
connection.end(); 