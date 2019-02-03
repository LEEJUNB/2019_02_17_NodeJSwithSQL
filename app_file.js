var express_id = require('express');
var app = express_id();
var fs = require('fs'); // 이모듈을 통해 웹에 입력한 정보를 파일에 write할 수 있다.

app.set('views','./views_file'); // 템플릿폴더(views_file)생성
app.set('view engine','jade'); // 템플릿엔진은 jade

app.locals.pretty=true; // 템플릿 html소스를 깔끔하게

app.get('/topic/:id', function(req,res){
    var id = req.params.id;
    fs.readFile('data/'+id, 'utf8',function(err,data){
        if(err){
            console.log(err);
            res.status(500).send('Internal ServerError');
        }
        res.send(data);
    })
})

app.post('/topic',function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/'+title, description, function(err) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send('Hi, post');
    });  
});

app.get('/topic/new', function(req,res){
    res.render('new');
});

app.listen(3000,function() {
    console.log('Connected, 3000 port!');
});