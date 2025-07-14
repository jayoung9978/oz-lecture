const MAX_SCORE = 105;
const BONUS_SCORE = 5;

let score;
var grade;

// 사용자 입력
let inputStr = prompt("점수를 입력하세요.");
// console.log(inputStr);
// let input = parseInt(inputStr);
let input = Number(inputStr);
console.log("input:", input);

let isFinish = false;
if (input < 0 || input > 100 || isNaN(input)) {
	console.log("Invalid score! Please enter a number between 0 and 100.");
} else {
	// 최종점수 계산 (5점 추가)
	let finalScore = 0;
	finalScore++;
	finalScore = input + BONUS_SCORE;
	finalScore *= 1.1;
	// finalScore = !isNaN(finalScore);

	if (finalScore > 100) finalScore = 100;

	// 등급 결정 (if문)
	if (finalScore >= 100) grade = "S";
	else if (finalScore >= 90) grade = "A";
	else if (finalScore >= 80) grade = "B";
	else if (finalScore >= 70) grade = "C";
	else if (finalScore >= 60) grade = "D";
	else grade = "F";

	// 합격/불합격 여부 결정 (삼항연산자)
	const passStatus = finalScore >= 60 ? "PASS" : "FAIL";

	// 등급에 따른 console.log() 출력 (switch문)
	let message = "";
	switch (grade) {
		case "S":
			message = "Super!!";
			break;
		case "A":
			if (finalScore === 100) {
				message = "Perfect Score!";
				break;
			}
			message = "Excellent work!";
			break;
		case "B":
			message = "Good job!";
			break;
		case "C":
			message = "Satisfactory performance.";
			break;
		case "D":
			message = "Needs improvement.";
			break;
		case "F":
			message = "Please try harder!";
			break;
		default:
			break;
	}
	console.log(`#########
Final Score: ${finalScore}
Grade: ${grade}
Status: ${passStatus}
Message: ${message}
#########
`);
}
