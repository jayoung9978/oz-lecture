document.addEventListener("DOMContentLoaded", () => {
	// 모든 탭 버튼과 모든 탭 콘텐츠 요소를 가져옵니다.
	const tabButtons = document.querySelectorAll(".tab-button");
	const tabContents = document.querySelectorAll(".tab-content");

	// 각 탭 버튼에 클릭 이벤트 리스너를 추가합니다.
	tabButtons.forEach((button) => {
		button.addEventListener("click", () => {
			// 1. 모든 탭 버튼에서 'active' 클래스 제거
			tabButtons.forEach((btn) => btn.classList.remove("active"));
			// 2. 클릭된 버튼에 'active' 클래스 추가
			button.classList.add("active");

			// 3. 모든 탭 콘텐츠를 숨깁니다.
			tabContents.forEach((content) => content.classList.remove("active"));

			// 4. 클릭된 탭 버튼의 'data-tab' 속성에서 대상 탭 ID를 가져옵니다.
			const targetTabId = button.dataset.tab; // 예: 'tab1', 'tab2'
			// 5. 해당 ID를 가진 탭 콘텐츠를 찾아서 보이게 합니다.
			const targetContent = document.getElementById(targetTabId);
			if (targetContent) {
				targetContent.classList.add("active");
			}
		});
	});

	// 페이지 로드 시 첫 번째 탭을 활성화합니다.
	// (선택 사항: 이미 HTML에 'active' 클래스가 설정되어 있다면 필요 없습니다.)
	// if (tabButtons.length > 0) {
	//     tabButtons[0].click(); // 첫 번째 버튼을 프로그램적으로 클릭하여 초기 상태 설정
	// }
});
