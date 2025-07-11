// String.lsngth
const pw = "1233";
console.log(pw.length);
if (pw.length < 4) {
	console.log("최소 4자리를 입력하세요.");
}

// Srting.ludes()
const email = "test!naver.com";
console.log(email.includes("@")); // @문자가 포함되어 있는지 확인
if (!email.includes("@")) {
	console.log("이메일 형식 확인하세요.");
}

console.log(email[0]); // 문자열 자체를 배열로 출력이 가능하다
console.log(email[1]);
console.log(email[2]);
console.log(email.indexOf("@")); // @가 몇번째에 있는지 확인, 없으면 -1을 출력한다

if (email.indexOf("@") < 0) {
	// @가 포함되어 있지 않으면,
	console.log("이메일 형식 확인하세요");
}
// String.trim()
const textarea = `     배고프다!      `;
console.log("textarea", textarea);
console.log("textarea", textarea.trim());

// String.replace()
// String.replaceAll()
// regex
const needToDelDot = "안녕하세요. 나는 태구와 함께 삽니다.";
console.log("needToDelDot", needToDelDot);
console.log("needToDelDot", needToDelDot.replace(".", ""));
console.log("needToDelDot", needToDelDot.replaceAll(".", "|"));
