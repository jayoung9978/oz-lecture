console.log("\n---삼항 연산자---");

// x가 참이면 y를 반환하고, z가

//삼합연산자
// let score = 80;
// let  = ;
// let  = ;

let math = 80;
let avg = 90;
let english = 100;

let isMathLowAvg = math < avg;
console.log("isMathLowAvg", isMathLowAvg);

let isEnglishLowAvg = english < avg;
console.log("isEnglishLowAvg", isEnglishLowAvg);

let AvgMathGrade = isMathLowAvg ? "수학점수 평균 이하" : "수학점수 평균 이상";
console.log("AvgMathGradewAvg", AvgMathGrade);

let AvgEnglishGrade = isEnglishLowAvg
	? "영어점수 평균 이하"
	: "영어점수 평균 이상";
console.log("AvgEnglishGrade", AvgEnglishGrade);
