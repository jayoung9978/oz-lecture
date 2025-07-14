// 0부터 4까지 콘솔찍는 코드
// for (let i = 0; i < 5; i++) {
// 	console.log(i);
// }
// console.log(`----`);

// // 1부터 5까지 콘솔찍는 코드
// for (let i = 1; i <= 5; i++) {
// 	console.log(i);
// }
// console.log(`----`);

// // 1부터 10까지 홀수만 찍는 코드
// for (let i = 1; i <= 10; i += 2) {
// 	console.log(i);
// }
// console.log(`----`);

// for (let i = 0; i < 2; i++) {
// 	console.log(`i: ${i}`);

// 	for (let j = 0; j < 2; j++) {
// 		console.log(`j: ${j}`);
// 	}
// }
// console.log(`----`);

// for문 안에 들어가는 if문
// 1부터 10까지 짝수 찍기
// i는 반드시 0부터 시작해야함
for (let i = 0; i <= 10; i += 2) {
	if (i === 0) {
		continue;
	}
	console.log(i);
}

// break문과 continue문
for (let i = 0; i < 10; i++) {
	if (i === 5) break;
	if (i === 5) continue;
	console.log(i);
}

// for문과 array배열
let arr = ["a", "b", "c"];
for (let i = 0; i < arr.length; i++) {
	console.log(arr[i]);
}

// for in 배열
for (idx in arr) {
	console.log(arr[idx]);
}
console.log("//////////////////");

// for in 배열
for (item of arr) {
	console.log(item);
}
