// const fruits = ["사과", "바나나", "오렌지"];
const fruits = new Array("사과", "바나나", "오렌지");
console.log(fruits);
// console.log(fruits[1]);
// console.log(fruits.length);

const mixed = [1, "Hello", true, { name: "홍길동" }];
// console.log(mixed);

// Array.push() 배열 요소 마지막 인덱스에 추가
fruits.push("딸기");
console.log(fruits);
console.log(fruits.length);

// Array.pop() 배열 마지막 요소 삭제, 삭제된 요소 반환
const removed = fruits.pop();
console.log(fruits);
console.log(fruits.length);
console.log("removed :", removed);

// Array.shift() 배열 첫번째 요소 삭제, 삭제된 요소 반환
const removedByShift = fruits.shift();
console.log(fruits);
console.log(fruits.length);
console.log("removedByShift :", removedByShift);

// Array.unshift() 배열 요소 첫번째 인덱스에 추가
fruits.unshift("파인애플");
console.log(fruits);
console.log(fruits.length);
