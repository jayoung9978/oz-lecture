const person1 = {
	name: "taem",
	age: 33,
};
const person2 = {
	name: "taegu",
	age: 3,
};
const person3 = {
	name: "sh",
	age: 33,
};

// 생성자
function Person(name, age) {
	this.name = name;
	this.age = age;
	this.greet = function () {
		console.log(`안녕하세요. 저는 ${this.name}입니다.`);
	};
}

// 생성자로 만들어진 객체
const personA = new Person("taem", 33);
const personB = new Person("taegu", 3);

console.log("personA.name", personA.name);
console.log("personA.age", personA.age);
personA.greet();

personB.greet();

// OOP
