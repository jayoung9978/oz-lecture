// 배열 뒤에 원소를 넣음
// const arrPush = [1, 2, 3];
// arr.push(4); // = [1,2,3,4]
// console.log(arrPush);
// arr.push(5);
// console.log(arrPush);
// console.log(arrPush.push(6));

// // 배열 앞에 원소를 넣음
// const arrUnshift = [1, 2, 3]; // 배열=[0,1,2,3,4] 값이 몇개있는지.
// arr.unshift(4); // 원소=값, = [4,1,2,3]
// console.log(arrUnshift);
// arr.unshift(5);
// console.log(arrUnshift);
// console.log(arrUnshift.unshift(6));

var x = 5,
	result;

console.log(`선할당 후증가`);
result = x++;
console.log(result, x);

console.log(`선증가 후할당`);
result = ++x;
console.log(result, x);
