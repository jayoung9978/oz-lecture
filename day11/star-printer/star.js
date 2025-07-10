const maxStars = 10; // 최대 별 개수
const minStars = 1; // 최소 별 개수
let input; // 사용자 입력
var stars; // 별 문자열

// 별 출력 함수 (매개변수 기본값 사용)
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
		printStars(num);
		break; // 프로그램 종료
	} else {
		// 유효하지 않은 입력인 경우
		console.log("Invalid input! Enter a number between 1 and 10.");
		continue; // 다시 입력 받기
	}
} while (true);
