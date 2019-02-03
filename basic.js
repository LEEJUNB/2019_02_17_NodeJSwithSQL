const http = require('http'); // 하단이 구동되려면 http라는 부품,모듈이 요구된다는 말. http를 가져와서 사용하도록한다.
// const는 js최신버전에서 포함되는 것
// http는 변수가 아닌 상수다. 왜냐하면 변수이긴 하지만 한번할당되면 그 값을 변경할 수 없기에 항상의 '상'이란 한자를 사용한 상수라 부른다.
 
const hostname = '127.0.0.1'; // 이 컴터의 IP
const port = 1337; // 포트번호

//createServer라는 함수,메소드는 서버를 만든다 의미
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n'); // 최종응답결과로 출력하는 것
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); // 127.0.0.1에 대해 접속한 사용자에 대해 응답하라