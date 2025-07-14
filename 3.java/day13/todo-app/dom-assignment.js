// DOM 요소 선택
const TASK_INPUT = document.getElementById("taskInput");
const ADD_BUTTON = document.getElementById("addButton");
const TASK_LIST = document.getElementById("taskList");
const CLEAR_BUTTON = document.getElementById("clearButton");

// 할 일 요소 생성 함수
function createTaskElement(taskText, isCompleted = false) {
	const LI = document.createElement("li");
	LI.className = "task-item";

	const completeButton = document.createElement("button");
	completeButton.className = "complete-button";
	completeButton.innerHTML = isCompleted ? "&#9679;" : "&#9675;";

	const SPAN = document.createElement("span");
	SPAN.textContent = taskText;
	if (isCompleted) SPAN.classList.add("completed");

	completeButton.addEventListener("click", function () {
		SPAN.classList.toggle("completed");
		const completed = SPAN.classList.contains("completed");
		completeButton.innerHTML = completed ? "&#9679;" : "&#9675;";
		saveTasks();
		sortTasks();
	});

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "삭제";
	deleteButton.className = "delete-button";
	deleteButton.addEventListener("click", function () {
		TASK_LIST.removeChild(LI);
		saveTasks();
	});

	LI.appendChild(completeButton);
	LI.appendChild(SPAN);
	LI.appendChild(deleteButton);

	return LI;
}

// 할 일 목록 저장 (완료 상태 포함)
function saveTasks() {
	const tasks = [];
	document.querySelectorAll(".task-item").forEach((li) => {
		const span = li.querySelector("span");
		const completed = span.classList.contains("completed");
		tasks.push({ text: span.textContent, completed });
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 할 일 목록 불러오기 (완료 상태 포함)
function loadTasks() {
	TASK_LIST.innerHTML = ""; // 기존 목록 비우기
	const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
	tasks.forEach((task) => {
		const LI = createTaskElement(task.text, task.completed);
		TASK_LIST.appendChild(LI);
	});
	sortTasks();
}

// 할 일 추가 함수
function addTask() {
	const TASK_TEXT = TASK_INPUT.value.trim();
	TASK_INPUT.value = ""; // 입력값을 바로 비워줌
	if (TASK_TEXT === "") {
		alert("할일을 입력해주세요");
		return;
	}
	const LI = createTaskElement(TASK_TEXT, false);
	TASK_LIST.appendChild(LI);
	saveTasks();
	sortTasks();
}

// 완료된 할 일 아래로 정렬
function sortTasks() {
	const items = Array.from(TASK_LIST.children);
	items.sort((a, b) => {
		const aCompleted = a.querySelector("span").classList.contains("completed");
		const bCompleted = b.querySelector("span").classList.contains("completed");
		return aCompleted - bCompleted;
	});
	items.forEach((item) => TASK_LIST.appendChild(item));
}

// 전체 삭제 함수
function clearAllTasks() {
	TASK_LIST.innerHTML = "";
	localStorage.removeItem("tasks");
	TASK_INPUT.value = "";
}

// 이벤트 연결
ADD_BUTTON.addEventListener("click", addTask);

TASK_INPUT.addEventListener("keydown", function (event) {
	// 한글 조합 중에는 addTask 실행하지 않음
	if (event.key === "Enter" && !event.isComposing) {
		event.preventDefault();
		addTask();
	}
});

CLEAR_BUTTON.addEventListener("click", clearAllTasks);
window.addEventListener("DOMContentLoaded", loadTasks);
