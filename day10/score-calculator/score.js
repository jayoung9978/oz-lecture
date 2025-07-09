// let inputStr = prompt("점수를 입력하세요.");
// console.log(inputStr);
// let input = parseInt(inputStr);
// console.log(input);

//학생이 입력한 시험점수를 받아 최종 점수를 계산하고, 등급을 부여하며 합격/불합격 여부를 판단하고, 등급별 메세지를 출력한다.
let input = 70;
// 합격여부 먼저확인. 합격일 경우 등급부여 등급별 메세지 출력(switch문)
let grade;
if (input > 60 ? "Fail" : "Pass") {
	grade = "F";
	console.log("불합격입니다");
} else if (input > 100) {
	grade = "S";
	console.log("합격입니다");
	// } else if (input >= 90 && input < 100) {
	// 	grade = "A";
	// 	console.log("합격입니다");
	// } else if (input >= 80 && input < 90) {
	// 	grade = "B";
	// 	console.log("합격입니다");
	// } else if (input >= 70 && input < 80) {
	// 	grade = "C";
	// 	console.log("합격입니다");
}
