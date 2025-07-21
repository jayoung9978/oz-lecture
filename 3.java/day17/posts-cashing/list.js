// list.js (포스트 목록 화면용 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";

// 포스트 목록 표시
async function displayPosts() {
	// 포스트 데이터 가져오기
	try {
		const response = await fetch(`${apiUrl}/posts`); // fetch를 통해 포스트 데이터를 가져옵니다.
		if (!response.ok) throw new Error("Failed to fetch posts"); // 응답이 성공적이지 않으면 에러 처리
		const posts = await response.json(); // JSON 형식으로 변환

		const postList = document.getElementById("post-list"); // 포스트 목록을 표시할 요소
		postList.innerHTML = ""; // 기존 목록 초기화
		posts.forEach((post) => {
			// 각 포스트에 대해 리스트 아이템 생성
			const li = document.createElement("li"); // 리스트 아이템 생성
			// 포스트 제목과 ID를 설정
			li.textContent = post.title; // 포스트 제목 설정
			li.dataset.postId = post.id; // 포스트 ID 설정
			// 포스트 클릭 시 상세 페이지로 이동
			li.addEventListener("click", () => {
				// 클릭 이벤트 리스너 추가
				window.location.href = `detail.html?postId=${post.id}`; // 클릭 시 상세 페이지로 이동
			});
			postList.appendChild(li); // 리스트 아이템을 포스트 목록에 추가
		});
	} catch (error) {
		console.error("Error:", error.message);
	}
}

// 페이지 로드 시 포스트 목록 표시
displayPosts();
