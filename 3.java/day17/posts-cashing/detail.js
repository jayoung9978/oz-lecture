// detail.js (포스트 상세 화면용 JavaScript)
const apiUrl = "https://jsonplaceholder.typicode.com";

// 캐시 만료시간 5분.
const CACHE_EXPIRY = 5 * 60 * 1000; // 5분을 밀리초로 변환
// 포스트 상세 정보 표시
async function displayPostDetail() {
	// URL에서 postId 가져오기
	try {
		const urlParams = new URLSearchParams(window.location.search); // window.location.search는 URL의 쿼리 문자열을 가져옵니다.
		const postId = urlParams.get("postId"); // postId 파라미터를 가져옵니다.
		// postId가 없으면 에러 처리
		if (!postId) throw new Error("No post ID provided"); // postId가 없으면 함수 종료하고 catch로 이동합니다.
		let post = {}; // 포스트 정보를 담기위한 빈 객체
		const cachedPost = getCachedPost(postId);

		// 캐시된 데이터가 있고, 캐시가 만료되지 않았다면 캐시사용
		if (cachedPost && Date.now() - cachedPost.timestamp < CACHE_EXPIRY) {
			console.log("Post loaded from localStorage");
			post = cachedPost.data; // 캐시된 데이터 사용함
		} else {
			// 캐시가 없거나, 만료된 경우 API에서 데이터를 가져온다.
			const response = await fetch(`${apiUrl}/posts/${postId}`);
			if (!response.ok) throw new Error("Failed to fetch post");
			post = await response.json();

			cachedPost(post);
			console.log("Post fetched from API");
		}

		renderPost(post); // 포스트 렌더링 함수 호출
	} catch (error) {
		console.error("Error:", erroeMassage); // 에러 메시지 출력
		const erroeMassage = (document.getElementById("post-detail").innerHTML =
			"<p>Error loading post details</p>"); // 에러 발생 시 사용자에게 에러 메시지 표시
	}
}

function renderPost(post) {
	const postDetail = document.getElementById("post-detail");
	postDetail.innerHTML = `<h3>${post.title}</h3>
	<p>${post.body}</p>`;
}
// const response = await fetch(`${apiUrl}/posts/${postId}`);
// 	if (!response.ok) throw new Error("Failed to fetch post"); // fetch를 통해 postId에 해당하는 포스트 데이터를 가져옵니다.
// 	post = await response.json(); // JSON 형식으로 변환하여 post 변수에 저장

// 	// localStorage에서 캐시 확인 (도전 과제)
// 	// localStorage에서 캐시가 조건에 충족하면 캐시 사용하여 post 초기화 (도전 과제)
// 	// localStorage에서 캐시가 조건에 충족하지 않으면 상세 데이터 fetch하여 post 초기화

// 포스트 렌더링 함수
function renderPost(post) {
	const postDetail = document.getElementById("post-detail"); // 포스트 상세 정보를 표시할 요소
	postDetail.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    `; // 포스트 제목과 내용을 HTML로 설정
}
// 캐시된 포스트 저장 함수 (타임스탬프 추가)
function cachePost(post) {
	const cachedData = {
		data: post,
		timestamp: Date.now(), // 현재 시간 저장
	};
	localStorage.setItem(`post_${post.id}`, JSON.stringify(cachedData));
}

// 캐시된 포스트 가져오기 함수
function getCachedPost(postId) {
	const cachedPost = localStorage.getItem(`post_${postId}`);
	return cachedPost ? JSON.parse(cachedPost) : null;
}

// 페이지 로드 시 포스트 상세 정보 표시
displayPostDetail(); // 페이지가 로드될 때 포스트 상세 정보를 표시하는 함수 호출
