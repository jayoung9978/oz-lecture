const maxStars = 10; // 최대 별 개수
const minStars = 1; // 최소 별 개수
let input; // 사용자 입력
var stars; // 별 문자열

// 기본 별 출력 함수 (매개변수 기본값 사용)
function printStars(count = 1) {
	// 0 또는 음수일 경우 기본값 1 사용
	if (count <= 0) {
		count = 1;
	}

	stars = "";
	for (let i = 0; i < count; i++) {
		stars += "*";
	}
	console.log(stars);
}

// 함수 표현식: 역순 별 출력
const printReverseStars = function (count) {
	if (count <= 0) count = 1;

	for (let i = count; i > 0; i--) {
		stars = "";
		for (let j = 0; j < i; j++) {
			stars += "*";
		}
		console.log(stars);
	}
};

// 화살표 함수: 사각형 패턴 출력
const printSquare = (count) => {
	if (count <= 0) count = 1;

	for (let i = 0; i < count; i++) {
		stars = "";
		for (let j = 0; j < count; j++) {
			stars += "*";
		}
		console.log(stars);
	}
};

// ...rest 사용: 여러 숫자를 받아 각 숫자에 대해 별 출력
const printMultipleStars = (...counts) => {
	for (let count of counts) {
		if (count > 0) {
			stars = "";
			for (let i = 0; i < count; i++) {
				stars += "*";
			}
			console.log(stars);
		}
	}
};

// 패턴 정보를 객체로 저장
const starPatterns = {};

// for...in으로 객체 속성을 순회하며 패턴 출력
function displayPatterns() {
	console.log("Saved patterns:");
	for (let key in starPatterns) {
		console.log(`${key}: ${starPatterns[key]}`);
	}
}

// 메인 프로그램
do {
	input = prompt("Enter the number of stars (1-10):");

	// 사용자가 취소를 누르면 프로그램 종료
	if (input === null) {
		console.log("Program terminated.");
		break;
	}

	const num = parseInt(input);

	// if/else로 입력값 검사 (숫자인지, 1~10 범위인지)
	if (!isNaN(num) && num >= minStars && num <= maxStars) {
		// 유효한 입력인 경우
		console.log("Basic stars:");
		printStars(num);

		console.log("\nReverse stars:");
		printReverseStars(num);

		console.log("\nSquare pattern:");
		printSquare(num);

		console.log("\nMultiple stars (demonstrating rest parameters):");
		printMultipleStars(1, 2, 3, num);

		// 패턴을 객체에 저장
		starPatterns[`pattern${num}`] = "*".repeat(num);
		starPatterns[`reverse${num}`] = `${num} stars in reverse`;
		starPatterns[`square${num}`] = `${num}x${num} square`;

		console.log("\nStored patterns:");
		displayPatterns();

		break; // 프로그램 종료
	} else {
		// 유효하지 않은 입력인 경우
		console.log("Invalid input! Enter a number between 1 and 10.");
		continue; // 다시 입력 받기
	}
} while (true);
