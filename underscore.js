var _ = require('underscore'); // 현 프로젝트엔 underscore가 필요하다는 것을 나타냄
// _ 는 underscore를 나타냄. 관습임, var아닌 const로 해도됨

var arr = [3,6,9,1,12];

//첫 배열 출력
console.log(arr[0]);
console.log(_.first(arr));

//마지막 배열 출력
console.log(arr[arr.length-1]);
console.log(_.last(arr));
