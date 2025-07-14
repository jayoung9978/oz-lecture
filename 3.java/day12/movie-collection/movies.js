// 영화 객체를 저장하는 배열 선언
let movies = [];

// 최소 3개의 영화 객체를 하드코딩으로 생성 및 배열에 추가
movies.push(
	{ title: "The Matrix", director: "Wachowskis", year: 1999, genre: "Sci-Fi" },
	{ title: "Inception", director: "Nolan", year: 2010, genre: "Sci-Fi" },
	{ title: "Parasite", director: "Bong", year: 2019, genre: "Drama" },
	{ title: "", director: "", year: 2024, genre: "Action" }, // 빈 속성 테스트용
	{ title: "Avatar", director: "", year: 2009, genre: "" } // 빈 속성 테스트용
);

// 영화 목록 출력 함수 (함수 선언문)
function printMovies(movies) {
	console.log("Movie Collection:");

	// for문을 사용하여 영화 목록 출력
	for (let i = 0; i < movies.length; i++) {
		let movie = movies[i];

		// 빈 속성 확인 후 기본값 설정
		if (!movie.title) movie.title = "Unknown";
		if (!movie.director) movie.director = "Unknown";
		if (!movie.genre) movie.genre = "Unknown";

		// 매개변수 기본값 개념 적용 (빈 문자열에 기본값 설정)
		let title = movie.title || "Unknown";
		let director = movie.director || "Unknown";
		let year = movie.year || 0;
		let genre = movie.genre || "Unknown";

		// 영화 정보 출력 (번호와 함께)
		console.log(
			`${
				i + 1
			}. Title: ${title}, Director: ${director}, Year: ${year}, Genre: ${genre}`
		);
	}

	// 총 영화 수 출력
	console.log(`Total Movies: ${movies.length}`);
}

// 함수 호출하여 영화 목록 출력
printMovies(movies);

// 추가 예제: 매개변수 기본값을 사용한 함수
function printMovieWithDefaults(
	movie,
	defaultTitle = "Unknown",
	defaultDirector = "Unknown",
	defaultGenre = "Unknown"
) {
	console.log("\n--- 매개변수 기본값 예제 ---");
	console.log(`Title: ${movie.title || defaultTitle}`);
	console.log(`Director: ${movie.director || defaultDirector}`);
	console.log(`Year: ${movie.year || 0}`);
	console.log(`Genre: ${movie.genre || defaultGenre}`);
}

// 빈 영화 객체로 테스트
let emptyMovie = { title: "", director: "", year: 2024, genre: "" };
printMovieWithDefaults(emptyMovie);
