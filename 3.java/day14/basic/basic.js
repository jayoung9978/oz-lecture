// console.log("이미지 로딩 시작");
// setTimeout(() => {
// 	console.log("이미지 로딩");
// }, 2000);
// console.log("다른 작업 수행1");
// console.log("다른 작업 수행2");
// console.log("다른 작업 수행3");

// 콜백함수
function sayHello(name, callback) {
	console.log(`안녕하세요, ${name}님!`);
	callback();
}
sayHello("학생", () => {
	console.log("콜백함수가 호출되었습니다.");
});
