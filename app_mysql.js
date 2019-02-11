//1. 기초작업
var express_id = require('express');
var app = express_id();

app.listen(3000,function(){
    console.log('Connected, 3000 port!');
})

//2. 라우팅되는지 확인하는 작업. 사용자 요청을 컨트롤러와 연결시키는 작업 (라우팅)
//이작업은 작동유무만 확인하며 4.작업에서 확장응용함.
// app.get('/topic/new', function(req,res){
//     res.send('Hi');
// })

//3. 템플릿디렉터리 기존(views)과 다른 디렉터리지정(views_file). 이 디렉터리에서 만든 jade파일을 읽어서 가져온다
//3. 템플릿엔진은 jade
app.set('views', './views_file');
app.set('view engine', 'jade');

//4. 앞서 만든 new.jade파일을 특정 url(/topic/new)에 접속시 불러오도록 만든다
app.get('/topic/new', function(req,res){
    res.render('new'); // jade파일명 new
})

//5. new.jade파일에서 입력한 정보가 /topic으로 전송되도록 만들었기에 이 정보를 받도록 하자
//입력한 내용이 정상적으로 제출됐다면 6.작업인 body-parser에 활용한다.
// app.post('/topic', function(req,res){
//     res.send('I send your messaege. thank u for ur concern');
// })

//6. 사용자가 전송한 POST방식의 데이터 캐취하기 위해 body-parser사용
//기능 : 입력한 title내용이 출력된다.
//그리고 7.의 기능을 위해 app.post를 확장시킨다.
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false})); // req객체가 body속성을 만들어서 post데이터에 접근도움
// app.post('/topic', function(req,res){
//     var title = req.body.title;
//     var description = req.body.description;
//     res.send('You send messages title name : ' + req.body.title);
// })

//7. 위에서 입력한 값들을 파일로 저장하도록 만들자
//data디렉터리생성하고 파일을 제어하는 fs모듈을 이용한다
// 기능 : 입력한 정보(제목,내용)이 파일로 만들어진다.
var fs = require('fs');
app.post('/topic', function(req,res){
    var title = req.body.title;
    var description = req.body.description;
    // data/은 data디렉터리를 의미하고 파일이름은 title값, 파일내용은 description
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.send('You send messages that is title name : ' + req.body.title);
    })
})

//8. URL에서 /topic으로 접근하면 cannot get이 뜬다. get을 만들지 않았기 떄문.
//기능 : 이제 /topic주소에 접근하는 get을 만들어보자
// 새 jade인 view.jade를 만들어보자. 지금만드는 view.jade의 현 코드는 new.jade코드와 동일
// 하단 코드는 9.에서 활용
// app.get('/topic', function(req,res){
//     res.render('view'); //view.jade를 의미
// });

//9. 기능 : data디렉터리에 만들어 놓은 파일을 웹링크로 띄워보자
//new.jade와 동일했던 view.jade파일을 수정하여 제작한 파일(nodejs.txt)을 링크로 띄운다.
//세부기능 : /topic주소로 들어왔을때 data디렉터리에 있는 파일들을 이름으로 ul리스트생성하기.
//이 기능을 위해 필요한 것이 fs.readdir
app.get('/topic', function(req,res){
    fs.readdir('data', function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files}); //view.jade를 의미
    })
});

//10. 기능 : 파일들의 링크를 클릭하면 그 파일의 내용이 웹에 나타남
//id값에해당되는 파일을 가져와야하기에 fs모듈의 fs.readFile활용
//하단 코드는 11.에서 응용 확장한다.
// app.get('/topic/:id',function(req,res){
//     var id = req.params.id;
//     fs.readFile('data/'+id, 'utf8', function(err,data){
//         if(err){
//             console.log(err);
//             res.status(500).send('Internal Server Error');
//         }
//         res.render('view', {title:id});
//     })
// })

//11.이제는 /topic주소로 들어갔을 때, 파일들의 링크밑에 그 파일의 내용이 나타나도록 만들것이다.
//이 코드에는 9.에서 활용한 readdir을 활용하여 /topic/parameter를 입력하면 data디렉터리의 files목록을 가져오도록함
app.get('/topic/:id',function(req,res){
    var id = req.params.id;
    fs.readdir('data', function(err,files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        fs.readFile('data/'+id, 'utf8', function(err,data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics:files, title:id, description:data});
        })
    })
})