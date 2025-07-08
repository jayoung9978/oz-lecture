console.log(`[기본과제]`);
const myName = "조자영";

const myBirthDate = `1993-10-14`; //생년월일을 문자열로 저장
const today = new Date(); //현재날짜 (Date 객체)
const birthDate = new Date(myBirthDate); // 생년월일 (Date객체)로 변환)

let myAge; // 나이를 저장할 변수
myAge = today.getFullYear() - birthDate.getFullYear(); // 현재 연도에서 태어난 연도를 빼서 기본 나이 계산

// 생일이 지났는지 확인하여 나이 조정
// 현재 월이 생일 월보다 작거나,
// 월은 같지만 현재 일이 생일 일보다 작으면 아직 생일이 안 지남
if (
	today.getMonth() < birthDate.getMonth() ||
	(today.getMonth() === birthDate.getMonth() &&
		today.getDate() < birthDate.getDate())
) {
	myAge--; // 생일이 아직 안 지났다면 나이에서 1을 뺌
}

let address = `청주`;
var myHobbies = [`YoutubeWatct`, `League of Legends`, `coding`];
let mbti = ["ENFJ", "ENFP", "ESTJ", "ENTP", "INFT", "INFP", "INTT", "INTP"];

let personal_information = {
	name: "조자영",
	age: "33",
	isStudent: true,
};

console.log(
	`안녕하세요.\n저는 ${address}에 살고 있는,` +
		` ${myName}입니다. \n${birthDate.getFullYear()}년생으로 올해 만 ${myAge}세 이고, \nMBTI는 [${
			mbti[7]
		}] 성향을 가졌습니다. \n취미는 \n \t${myHobbies[0]}\n \t${
			myHobbies[1]
		}\n \t${myHobbies[2]}을 즐기고 있습니다.`
);
console.log(
	`- 객체 리터럴: 객체를 선언하여 개인 정보 저장:\n`,
	personal_information
);

console.log(
	`- typeof로 최소 2개의 변수타입 출력 \n- 최소 3가지 데이터 타입 사용`,
	"\n\t1.이름:",
	typeof myName,
	"\n\t2.생일:",
	typeof myBirthDate,
	"\n\t3.나이:",
	typeof myAge,
	"\n\t4.주소:",
	typeof address,
	"\n\t5.취미:",
	typeof myHobbies
);
