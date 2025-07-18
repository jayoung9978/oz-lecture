// detail.js (포스트 상세 화면용 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";

// 포스트 상세 정보 표시
async function displayPostDetail() {
	// URL에서 postId 가져오기
	try {
		const urlParams = new URLSearchParams(window.location.search); // window.location.search는 URL의 쿼리 문자열을 가져옵니다.
		const postId = urlParams.get("postId"); // postId 파라미터를 가져옵니다.
		// postId가 없으면 에러 처리
		if (!postId) throw new Error("No post ID provided"); // postId가 없으면 함수 종료하고 catch로 이동합니다.
		let post = {}; // 포스트 정보를 담기위한 빈 객체

		const response = await fetch(`${apiUrl}/posts/${postId}`);
		if (!response.ok) throw new Error("Failed to fetch post"); // fetch를 통해 postId에 해당하는 포스트 데이터를 가져옵니다.
		post = await response.json(); // JSON 형식으로 변환하여 post 변수에 저장

		// localStorage에서 캐시 확인 (도전 과제)
		// localStorage에서 캐시가 조건에 충족하면 캐시 사용하여 post 초기화 (도전 과제)
		// localStorage에서 캐시가 조건에 충족하지 않으면 상세 데이터 fetch하여 post 초기화

		renderPost(post); // 포스트 렌더링 함수 호출
	} catch (error) {
		console.error("Error:", error.message); // 에러 메시지 출력
		document.getElementById("post-detail").innerHTML =
			"<p>Error loading post details</p>"; // 에러 발생 시 사용자에게 에러 메시지 표시
	}
}

// 포스트 렌더링 함수
function renderPost(post) {
	const postDetail = document.getElementById("post-detail"); // 포스트 상세 정보를 표시할 요소
	postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `; // 포스트 제목과 내용을 HTML로 설정
}

// 페이지 로드 시 포스트 상세 정보 표시
displayPostDetail(); // 페이지가 로드될 때 포스트 상세 정보를 표시하는 함수 호출
