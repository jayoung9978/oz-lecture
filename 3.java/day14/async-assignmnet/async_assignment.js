// 숫자 입력 시 시작 버튼(#startTimer) 활성화
document.getElementById("timerInput").addEventListener("input", function () {
	const inputValue = document.getElementById("timerInput").value.trim();
	const startButton = document.getElementById("startTimer");
	const timerDisplay = document.getElementById("timerDisplay");

	// 입력값이 숫자이고 1~MAX_TIME 사이일 때만 활성화
	if (
		!isNaN(inputValue) &&
		inputValue !== "" &&
		Number(inputValue) >= 1 &&
		Number(inputValue) <= MAX_TIME
	) {
		startButton.disabled = false;
		timerDisplay.textContent = "";
		timerDisplay.classList.remove("error");
	} else if (inputValue === "") {
		startButton.disabled = true;
		timerDisplay.textContent = "";
		timerDisplay.classList.remove("error");
	} else {
		startButton.disabled = true;
		timerDisplay.textContent = "유효하지 않은 입력입니다.";
		timerDisplay.classList.add("error");
	}
});

// 타이머 시작 함수 (기본값: 10초)
function startTimer(seconds = 10) {
	const timerDisplay = document.getElementById("timerDisplay");
	const startButton = document.getElementById("startTimer");
	const secondHand = document.getElementById("secondHand");

	if (isNaN(seconds) || seconds < 1 || seconds > MAX_TIME) {
		timerDisplay.textContent = "에러 메세지";
		timerDisplay.classList.add("error");
		return;
	}

	startButton.disabled = true;
	timerDisplay.classList.remove("error");
	timerDisplay.textContent = `타이머 시작: ${seconds}초`;

	const totalMs = seconds * 1000;
	const startTime = Date.now();
	secondHand.style.transform = "translate(-50%, -100%) rotate(0deg)";

	const timerInterval = setInterval(function () {
		const elapsedMs = Date.now() - startTime;
		const remainingMs = Math.max(totalMs - elapsedMs, 0);
		const remainingSec = Math.ceil(remainingMs / 1000);

		timerDisplay.textContent = `남은 시간: ${remainingSec}초`;

		// 초침 각도 계산 (한 바퀴 360도)
		const angle = (elapsedMs / totalMs) * 360;
		secondHand.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;

		if (remainingMs <= 0) {
			clearInterval(timerInterval);
			timerDisplay.textContent = "타이머 종료";
			startButton.disabled = false;
			secondHand.style.transform = "translate(-50%, -100%) rotate(360deg)";
		}
	}, 20); // 20ms마다 업데이트
}

// 시작 버튼 클릭 시 타이머 실행
document.getElementById("startTimer").addEventListener("click", function () {
	const inputValue = Number(document.getElementById("timerInput").value.trim());
	startTimer(inputValue);
});

// 출력 영역 클릭 시 에러 메세지 표시
document.getElementById("timerDisplay").addEventListener("click", function () {
	this.textContent = "에러 메세지";
	this.classList.add("error");
});

// 최대 시간 설정
const MAX_TIME = 10;
