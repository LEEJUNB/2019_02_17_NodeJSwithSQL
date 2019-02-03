var express = require('express');
var app = express();

app.get('/', function(req,res){
    res.send('hello this is the start');
});

app.listen(3000,function(req,res){
    console.log('welcome to listen express');
})

