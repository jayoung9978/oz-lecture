console.log("---후치연산방법---");
// 후치연산
let increment = 10;
console.log("1", increment); // 10
increment++;
console.log("2", increment); // 11
console.log("3", increment++); // 11
console.log("4", increment); // 12

let decrement = 10;
console.log("dec1", decrement); // 10
decrement--;
console.log("dec2", decrement); // 9
console.log("dec3", decrement--); // 9
console.log("dec4", decrement); // 8

console.log("\n---전치 연산---");
// 전치연산
let incFirst = 10;
console.log("incFirst 1", incFirst); // 10
++incFirst;
console.log("incFirst 2", incFirst); // 11
console.log("incFirst 3", ++incFirst); // 12
console.log("incFirst 4", incFirst); // 12

let decFirst = 10;
console.log("decFirst 1", decFirst); // 10
--decFirst;
console.log("decFirst 2", decFirst); // 9
console.log("decFirst 3", --decFirst); // 8
console.log("decFirst 4", decFirst); // 8

// 불가
// let c = c++;
// console.log(c);

console.log("\n---단항 부정 연산자---");
let num = -10;
num = -num;
console.log(num);

let num2 = 10;
num2 = num2;
console.log(num2);

let num3 = 10;
-num3;
console.log(num3);
