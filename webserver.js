const http = require('http');
const hostname = '127.0.0.1';
const port = 1337;

// http.createServer((req,res) => {
//     res.writeHead(200, {'Content-Type' : 'text/plain'});
//     res.end('Hello world \n');
// }).listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });

// 위의 기존 소스를 다른 소스로 동일한 기능을 만들어 보겠다.
// createServer를 통해 서버를 생성
var server = http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.end('Hello world \n');
});

// listen작업은 시간이 걸릴 수 있는 작업이므로 콜백으로 비동기적으로 작동함
// listen이 실행됐을때 callback이 완료되도록
server.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});


