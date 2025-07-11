console.log("--- 기본과제 ---\n");

let inputStr = prompt("점수를 입력하세요.");
console.log();
let input = parseInt(inputStr);
// let input = Number(inputStr);
console.log(input);
// prompt는 문자열을 반환하므로 parseInt()를 사용해 정수형 숫자로 변환한다.

//학생이 입력한 시험점수를 받아 최종 점수를 계산하고, 등급을 부여하며 합격/불합격 여부를 판단하고, 등급별 메세지를 출력한다.

let score = (input += 5);

var grade;
let passStatus = score >= 60 ? "Pass" : "Fail";

if (score > 100) {
	grade = "S";
} else if (input >= 90) {
	grade = "A";
} else if (input >= 80) {
	grade = "B";
} else if (input >= 70) {
	grade = "C";
} else if (input >= 60) {
	grade = "D";
} else if (input < 60) {
	grade = "F";
}

switch (grade) {
	case "S":
		message = "Super!!";
		break;
	case "A":
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

		defailt: message = "null";
		break;
}
console.log(
	`--- 시험 결과 ---\n최종 점수: ${score}\n등급: ${grade}\n합격/불합격 여부: ${passStatus}\n메시지: ${message}`
);

alert(
	`--- 시험 결과 ---\n최종 점수: ${score}\n등급: ${grade}\n합격/불합격 여부: ${passStatus}\n메시지: ${message}`
);
// 사용자에게 바로 결과를 보여주기 위해 alert을 설정 (팝업창)
