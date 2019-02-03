var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine','jade');
app.set('views','./views');
app.locals.pretty=true;

var bodyParser = require('body-parser');

app.post('/form_receiver',function(req,res){
    res.send('Hello POST');
});

app.get('/form_receiver', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
})

app.get('/form',function(req,res){
    res.render('form');
});

app.get('/topic/:id/:mode', function(req,res){
    res.send(req.params.id+''+req.params.mode)
})

//쿼리스트링편.
//function에는 두개의 매개변수(req,res)가있다. 이 함수는 express가 호출한다.
app.get('/topic/:name', function(req,res){
    //배열
    var topics = [
        'JBK_ENG',
        'JBK_GLOBAL',
        'JBK_ASIA'
    ];
    
    var output = `
    <a href="/topic/0"> language </a> <br>
    <a href="/topic/1"> World </a><br>
    <a href="/topic/2"> Asia Region </a><br>
    ${topics[req.params.name]}
    ` // pass방식으로 들어오는 Semantic URL을 사용하기위해  params사용
    res.send(output);
});

app.get('/template',function(req,res){
    res.render('temp2', {
        name_jdid:'my website',
        time_jdid:Date(),
        title_jdid:'Made by Jade'
    });
})

app.get('/dynamic',function(req,res){
    var book = '';
    var idea = '';
    for (var i = 0; i<5; i++){
        book = book + '<li> book to expert </li>';
        lis_id = idea + '<li> lis_id~ea!! </li>';
        idea = idea + '<li> catch the idea </li>';
        i = i;
    }

    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            Hello bodytime static!
            this is my study list.
            ${book}
            ${lis_id}
            ${idea}
            ${i}
        </body>
    </html>
    `;
    res.send(output);
});

app.get('/static',function(req,res){
    res.send('Hello Router I had input the img file, <img src="/BurnKing.jpg">');
});

app.get('/login',function(req,res){
    res.send('<h1> Login please </h1>');
})

app.get('/', function(req,res) {
    res.send('Hello World!');
});

app.listen(3000,function(req,res){
    console.log('Connected 3000 port');
});