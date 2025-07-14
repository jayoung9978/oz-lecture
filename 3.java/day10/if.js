let num = 0;

if (num > 0) {
	console.log("양수");
} else if (num === 0) {
	console.log("0");
} else {
	console.log("음수");
}

const LIMIT = 80;
let score = 90;

if (score < LIMIT) {
	console.log("낙제");
	if (score === 0) {
		console.log("점수 0 : 검토필요");
	}
} else {
	if (score > 90) {
		console.log("A");
	} else if (score > 80) {
		console.log("B");
	} else {
		console.log("C");
	}
}
