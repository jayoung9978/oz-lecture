console.log("연산자- 논리 연산자, And 연산자 &&");

let math = 80;
let avg = 90;
let english = 100;

let isMathLowAvg = math < avg;
console.log("isMathLowAvg", isMathLowAvg);

let isEnglishLowAvg = english < avg;
console.log("isEnglishLowAvg", isEnglishLowAvg);

console.log(isMathLowAvg && isEnglishLowAvg); // 수학점수가 평균보다 낮고, 영어점수도 평균보다 낮은가? [AND]
console.log(isMathLowAvg || isEnglishLowAvg); // 수학점수가 평균보다 낮고, 영어점수도 평균보다 낮은가? [OR]

console.log("!false", false);
console.log("!true", true);

console.log(!true); // false
console.log(!false); // true
console.log(!true && false);
