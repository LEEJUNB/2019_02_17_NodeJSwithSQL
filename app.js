var express = require('express');
var app = express();
app.use(express.static('public'));
app.set('view engine', 'jade'); // 6-1 jade템플릿 엔진과 express를 연결하는 코드
app.set('views','./views'); // 6-2.템플릿있는 디렉터리(./views) 알려줌
// jade express에선 template 파일의 이름은 views이다.
// 설령, 이 코드가 없어도 express는 기본적으로 views디렉터리를 찾음
app.locals.pretty = true; // 7-1 jade소스가 웹 페이지 소스에서 깔끔하게 출력
var bodyParser = require('body-parser');

app.post('/form_receiver',function(req,res){
    res.send('Hello POST');
});

//8-2 입력한 내용을 받는 Pass
app.get('/form_receiver', function(req,res){
    //var title = req.query.title;
    //var desc = req.query.description;
    //위에 주석처리한 소스와 동일한 기능을 하는 body-parser사용하기
    var title = req.body.title;
    var description = req.body.description;
    res.send(title+','+description);
});

//8-1 POST수업이지만 get방식임
app.get('/form', function(req,res){
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

// 6-3. jade 템플릿 파일 사용하기 
app.get('/template', function(req,res){
    res.render('temp',{time:Date(), _title:'Jade'}); // temp라는 템플릿 파일을 웹페이지로 렌더링해서 전송한다
    //views디렉터리 안에 temp.jade를 의미
    //우리가 6-1에서 템플릿엔진을 jade로 정의해놨기 때문에 jade의 확장자인 temp.jade를 찾아서 내부 소스를 jade문법에 맞춰 해석한 뒤 response해준다.
});

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

//앱은 URL('/') 혹은 라우트에 대해 'Hello Wolrd!'로 응답
app.get('/', function(req,res) {
    res.send('Hello World!');
});

//앱은 서버를 시작하며 3000번 포트에 연결 청취
app.listen(3000, function (req,res) {
    // 괄호 내부의 req,res는 삭제해도 무방. 사용하지 않기때문
    // res.send('3000!'); 이 기능을 입력할 시 send는 정의되지 않았단 오류발생
    console.log('Example port 3000!');
});