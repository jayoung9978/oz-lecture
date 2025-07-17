// 도서 데이터를 저장할 배열
let books = [];
// 대여 상태를 관리할 배열
let rentals = [];
// 현재 모달에서 처리 중인 도서 정보
let currentRentalInfo = null;
// 필터링된 도서 목록
let filteredBooks = [];

// --- localStorage에서 데이터 불러오기 ---
function loadBooksFromStorage() {
	const booksData = localStorage.getItem("books");
	const rentalsData = localStorage.getItem("rentals");
	if (booksData) {
		books = JSON.parse(booksData);
	}
	if (rentalsData) {
		const rentalArr = JSON.parse(rentalsData);
		rentals = rentalArr.map((r) => {
			const rental = createBookRental(r.title);
			// 대여 상태 복원
			if (r.isBorrowed) {
				rental.borrow(r.borrowerInfo);
			}
			for (let i = 1; i < r.borrowCount; i++) {
				rental.borrow({ name: "dummy", phone: "", date: "" });
				rental.returnBook();
			}
			return rental;
		});
	}
}

// --- localStorage에 데이터 저장 ---
function saveBooksToStorage() {
	localStorage.setItem("books", JSON.stringify(books));
	// rentals 배열의 상태만 저장
	const rentalStates = rentals.map((r) => r.getStatus());
	localStorage.setItem("rentals", JSON.stringify(rentalStates));
}
// 도서 전체 삭제 기능
function removeAllBooks() {
	if (!confirm("정말 모든 도서를 삭제하시겠습니까?")) return;
	books.forEach((book) => (book.count = 0));
	books = books.slice(0, 1); // 하나만 남기고 모두 제거 (count=0)
	rentals = [];
	saveBooksToStorage();
	applyCurrentFilter();
}
// 도서 추가 기능 (중복 등록 가능, 수량 관리, ISBN 관리)
function addBook() {
	const titleInput = document.getElementById("bookTitle");
	const priceInput = document.getElementById("bookPrice");
	const isbnInput = document.getElementById("bookISBN");
	const originalTitle = titleInput.value.trim();
	const price = Number(priceInput.value);
	const isbn = isbnInput.value.trim();

	// 1. 도서제목+가격 등록 (ISBN 미입력)
	if (originalTitle !== "" && isbn === "" && !isNaN(price) && price > 0) {
		const title = `Book: ${originalTitle}`;
		let book = books.find(
			(b) => b.title === title && b.price === price && !b.isbn
		);
		if (book) {
			book.count = (book.count || 0) + 1;
		} else {
			book = { title, price, count: 1 };
			books.push(book);
			const rental = createBookRental(title);
			rentals.push(rental);
		}
	}
	// 2. ISBN+가격 등록 (도서제목 미입력 가능)
	else if (isbn !== "" && !isNaN(price) && price > 0) {
		const title = originalTitle ? `Book: ${originalTitle}` : `Book: (제목없음)`;
		let book = books.find((b) => b.isbn === isbn);
		if (book) {
			book.count = (book.count || 0) + 1;
			book.title = title;
			book.price = price;
		} else {
			books = books.filter((b) => b.isbn !== isbn);
			book = { title, price, isbn, count: 1 };
			books.push(book);
			const rental = createBookRental(title);
			rentals.push(rental);
		}
	} else {
		alert("도서 제목+가격 또는 ISBN+가격 중 하나의 방식으로 입력하세요!");
		return;
	}

	titleInput.value = "";
	priceInput.value = "";
	isbnInput.value = "";

	saveBooksToStorage();
	applyCurrentFilter();

	titleInput.focus();
}

// 도서 목록 렌더링 (ISBN 표시)
function renderBookList(booksToRender = books) {
	const bookList = document.getElementById("bookList");
	bookList.innerHTML = "";

	booksToRender.forEach((book, index) => {
		const rental = rentals.find((r) => r.getStatus().title === book.title);
		const status = rental
			? rental.getStatus()
			: { isBorrowed: false, borrowerInfo: null };

		let statusText = "";
		if (book.count === 0) {
			statusText = "(삭제됨)";
		} else if (status.isBorrowed) {
			if (book.count > 1) {
				statusText = `(1권 대여 중, ${book.count - 1}권 대여 가능)`;
			} else {
				statusText = "(대여 중)";
			}
		} else {
			statusText = `(대여 가능, ${book.count}권)`;
		}

		const li = document.createElement("li");
		li.className = "book-item";
		li.innerHTML = `
            <div class="book-info">
                <input type="checkbox" onchange="updateSelectedBooks()" ${
									book.count === 0 ? "disabled" : ""
								}/>
                <span>${book.title} - ${book.price}원 <strong>[${
			book.count || 1
		}권]</strong> <br>
                <small>ISBN: ${book.isbn}</small>
                <span class="book-status">${statusText}</span></span>
                ${
									status.isBorrowed && status.borrowerInfo
										? `<small style="color: #666;">[${status.borrowerInfo.name} / ${status.borrowerInfo.phone}]</small>`
										: ""
								}
            </div>
            <div class="book-buttons">
                <button onclick="openEditBookModal(this)" ${
									book.count === 0 ? "disabled" : ""
								}>수정</button>
                <button onclick="removeBook(this)" ${
									book.count === 0 ? "disabled" : ""
								}>삭제</button>
                <button onclick="toggleRental(this)" ${
									book.count === 0 ? "disabled" : ""
								}>${status.isBorrowed ? "반납" : "대여"}</button>
            </div>
        `;
		bookList.appendChild(li);
	});

	updateSelectedBooks();
}

// 삭제 기능 (ISBN 있으면 ISBN 기준, 없으면 제목+가격 기준으로 수량만 0으로, 중복 객체 하나만 남김)
function removeBook(button) {
	const li = button.closest(".book-item");
	const text = li.querySelector("span").textContent;
	const isbnText = li.querySelector("small").textContent;
	const isbn = isbnText.replace("ISBN: ", "").trim();

	let found = false;
	if (isbn) {
		// ISBN 기준으로 모든 도서 count 0, 하나만 남김
		books.forEach((book) => {
			if (book.isbn === isbn) book.count = 0;
		});
		books = books.filter((book) => {
			if (book.isbn === isbn) {
				if (!found) {
					found = true;
					return true;
				}
				return false;
			}
			return true;
		});
	} else {
		// 제목+가격 기준으로 모든 도서 count 0, 하나만 남김
		const title = text.split(" - ")[0];
		const price = Number(text.split(" - ")[1].split("원")[0].trim());
		books.forEach((book) => {
			if (book.title === title && book.price === price && !book.isbn)
				book.count = 0;
		});
		books = books.filter((book) => {
			if (book.title === title && book.price === price && !book.isbn) {
				if (!found) {
					found = true;
					return true;
				}
				return false;
			}
			return true;
		});
	}

	saveBooksToStorage();
	applyCurrentFilter();
}

// 도서 정보 수정 모달 열기 (ISBN 입력란 항상 활성화)
function openEditBookModal(button) {
	const li = button.closest(".book-item");
	const text = li.querySelector("span").textContent;
	const isbnText = li.querySelector("small").textContent;
	const isbn = isbnText.replace("ISBN: ", "").trim();

	let book;
	if (isbn) {
		book = books.find((b) => b.isbn === isbn);
	} else {
		const title = text.split(" - ")[0];
		const price = Number(text.split(" - ")[1].split("원")[0].trim());
		book = books.find((b) => b.title === title && b.price === price && !b.isbn);
	}
	if (!book) return;

	let modal = document.getElementById("editBookModal");
	if (!modal) {
		modal = document.createElement("div");
		modal.id = "editBookModal";
		modal.className = "modal";
		modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeEditBookModal()">&times;</span>
                <h3>도서 정보 수정</h3>
                <label>제목:</label>
                <input type="text" id="editBookTitle" class="modal-input" />
                <label>가격:</label>
                <input type="number" id="editBookPrice" class="modal-input" />
                <label>ISBN:</label>
                <input type="text" id="editBookISBN" class="modal-input" />
                <div class="modal-buttons">
                    <button onclick="confirmEditBook()">수정</button>
                    <button onclick="closeEditBookModal()">취소</button>
                </div>
            </div>
        `;
		document.body.appendChild(modal);
	}
	document.getElementById("editBookTitle").value = book.title.replace(
		"Book: ",
		""
	);
	document.getElementById("editBookPrice").value = book.price;
	document.getElementById("editBookISBN").value = book.isbn || "";

	modal.style.display = "block";
	window._editBookISBN = book.isbn || "";
	window._editBookTitle = book.title;
	window._editBookPrice = book.price;
}

// 도서 정보 수정 모달 닫기
function closeEditBookModal() {
	const modal = document.getElementById("editBookModal");
	if (modal) modal.style.display = "none";
	window._editBookISBN = null;
}

// 도서 정보 수정 확인 (ISBN도 항상 수정 가능)
function confirmEditBook() {
	const title = document.getElementById("editBookTitle").value.trim();
	const price = Number(document.getElementById("editBookPrice").value);
	const isbn = document.getElementById("editBookISBN").value.trim();

	if (!title || isNaN(price) || price <= 0) {
		alert("제목과 유효한 가격을 입력하세요!");
		return;
	}

	let book;
	if (window._editBookISBN) {
		book = books.find((b) => b.isbn === window._editBookISBN);
	} else {
		book = books.find(
			(b) =>
				b.title === window._editBookTitle &&
				b.price === window._editBookPrice &&
				!b.isbn
		);
	}
	if (!book) return;

	book.title = `Book: ${title}`;
	book.price = price;
	book.isbn = isbn; // ISBN도 항상 수정 가능

	saveBooksToStorage();
	applyCurrentFilter();
	closeEditBookModal();
	alert("도서 정보가 수정되었습니다.");
}

// 클로저로 대여 상태 관리
const createBookRental = (bookTitle) => {
	let isBorrowed = false;
	let borrowCount = 0;
	let borrowerInfo = null;

	return {
		borrow: (borrowerData) => {
			if (isBorrowed) {
				alert(`${bookTitle}은 이미 대여 중입니다.`);
				return false;
			}
			isBorrowed = true;
			borrowCount++;
			borrowerInfo = borrowerData;
			return true;
		},
		returnBook: () => {
			isBorrowed = false;
			borrowerInfo = null;
		},
		getStatus: () => ({
			title: bookTitle,
			isBorrowed,
			borrowCount,
			borrowerInfo,
		}),
	};
};

// 대여/반납 토글 (수량이 0이면 동작하지 않음)
function toggleRental(button) {
	const li = button.closest(".book-item");
	const text = li.querySelector("span").textContent;
	const title = text.split(" - ")[0];

	const book = books.find((b) => b.title === title);
	if (!book || book.count === 0) return;

	const rental = rentals.find((r) => r.getStatus().title === title);
	if (!rental) return;

	const status = rental.getStatus();

	if (status.isBorrowed) {
		rental.returnBook();
		saveBooksToStorage();
		applyCurrentFilter();
		alert(`${title}이 반납되었습니다.`);
	} else {
		currentRentalInfo = { title, book, rental };
		document.getElementById("modalTitle").textContent = `${title} 대여`;
		document.getElementById("borrowerName").value = "";
		document.getElementById("borrowerPhone").value = "";
		document.getElementById("borrowerDate").value = new Date()
			.toISOString()
			.split("T")[0];
		document.getElementById("rentalModal").style.display = "block";
	}
}

// 모달 닫기
function closeModal() {
	document.getElementById("rentalModal").style.display = "none";
	currentRentalInfo = null;
}

// 대여 확인
function confirmRental() {
	const name = document.getElementById("borrowerName").value.trim();
	const phone = document.getElementById("borrowerPhone").value.trim();
	const date = document.getElementById("borrowerDate").value;

	if (!name || !phone) {
		alert("대여자 이름과 연락처를 입력하세요.");
		return;
	}

	const borrowerData = { name, phone, date };

	if (currentRentalInfo.rental.borrow(borrowerData)) {
		saveBooksToStorage(); // 저장
		applyCurrentFilter();
		alert(`${currentRentalInfo.title}이 대여되었습니다.`);
	}

	closeModal();
}

// 모든 대여 상태 표시
function showAllRentalStatus() {
	const resultsDiv = document.getElementById("results");
	let html = "<h3>대여 상태:</h3><ul>";
	if (rentals.length === 0) {
		html += "<li>대여 정보가 없습니다.</li>";
	} else {
		rentals.forEach((rental) => {
			const status = rental.getStatus();
			html += `<li>${status.title}: ${
				status.isBorrowed ? "대여 중" : "대여 가능"
			}, 대여 횟수: ${status.borrowCount}`;
			if (status.isBorrowed && status.borrowerInfo) {
				html += ` (대여자: ${status.borrowerInfo.name}, 연락처: ${status.borrowerInfo.phone}, 대여일: ${status.borrowerInfo.date})`;
			}
			html += `</li>`;
		});
	}
	html += "</ul>";
	resultsDiv.innerHTML = html;
}

// 가격 필터 적용
function applyPriceFilter() {
	const minPrice = Number(document.getElementById("minPrice").value) || 0;
	const maxPrice =
		Number(document.getElementById("maxPrice").value) || Infinity;

	filteredBooks = books.filter(
		(book) => book.price >= minPrice && book.price <= maxPrice
	);

	renderBookList(filteredBooks);
}

// 필터 초기화
function clearFilter() {
	document.getElementById("minPrice").value = "";
	document.getElementById("maxPrice").value = "";
	filteredBooks = [];
	renderBookList();
}

// 현재 필터 적용
function applyCurrentFilter() {
	const minPrice = Number(document.getElementById("minPrice").value) || 0;
	const maxPrice =
		Number(document.getElementById("maxPrice").value) || Infinity;

	if (minPrice > 0 || maxPrice < Infinity) {
		filteredBooks = books.filter(
			(book) => book.price >= minPrice && book.price <= maxPrice
		);
		renderBookList(filteredBooks);
	} else {
		renderBookList();
	}
}

// 선택된 도서 정보 업데이트
function updateSelectedBooks() {
	const checkboxes = document.querySelectorAll(
		'.book-item input[type="checkbox"]'
	);
	const selectedBooks = [];

	checkboxes.forEach((checkbox, index) => {
		const bookItem = checkbox.closest(".book-item");
		if (checkbox.checked) {
			bookItem.classList.add("selected");
			const text = bookItem.querySelector("span").textContent;
			const title = text.split(" - ")[0];
			const book = books.find((b) => b.title === title);
			if (book) {
				selectedBooks.push(book);
			}
		} else {
			bookItem.classList.remove("selected");
		}
	});

	const selectedCount = selectedBooks.length;
	const selectedTotal = selectedBooks.reduce(
		(sum, book) => sum + book.price,
		0
	);

	document.getElementById("selectedCount").textContent = selectedCount;
	document.getElementById("selectedTotal").textContent =
		selectedTotal.toLocaleString();
}

// 전체 선택
function selectAllBooks() {
	const checkboxes = document.querySelectorAll(
		'.book-item input[type="checkbox"]'
	);
	checkboxes.forEach((checkbox) => {
		checkbox.checked = true;
	});
	updateSelectedBooks();
}

// 전체 해제
function deselectAllBooks() {
	const checkboxes = document.querySelectorAll(
		'.book-item input[type="checkbox"]'
	);
	checkboxes.forEach((checkbox) => {
		checkbox.checked = false;
	});
	updateSelectedBooks();
}

// 선택된 도서 가져오기
function getSelectedBooks() {
	const checkboxes = document.querySelectorAll(
		'.book-item input[type="checkbox"]'
	);
	const selectedBooks = [];

	checkboxes.forEach((checkbox) => {
		if (checkbox.checked) {
			const bookItem = checkbox.closest(".book-item");
			const text = bookItem.querySelector("span").textContent;
			const title = text.split(" - ")[0];
			const book = books.find((b) => b.title === title);
			const rental = rentals.find((r) => r.getStatus().title === title);
			if (book && rental) {
				selectedBooks.push({ book, rental });
			}
		}
	});

	return selectedBooks;
}

// 일괄 대여 기능
function batchRental() {
	const selectedBooks = getSelectedBooks();

	if (selectedBooks.length === 0) {
		alert("대여할 도서를 선택하세요.");
		return;
	}

	// 이미 대여 중인 도서가 있는지 확인
	const alreadyBorrowed = selectedBooks.filter(
		(item) => item.rental.getStatus().isBorrowed
	);
	if (alreadyBorrowed.length > 0) {
		alert("이미 대여 중인 도서가 포함되어 있습니다.");
		return;
	}

	// 일괄 대여 모달 표시
	const batchBookList = document.getElementById("batchBookList");
	let html = "<h4>대여할 도서 목록:</h4><ul>";
	selectedBooks.forEach((item) => {
		html += `<li>${item.book.title} - ${item.book.price}원</li>`;
	});
	html += "</ul>";
	batchBookList.innerHTML = html;

	// 입력 필드 초기화
	document.getElementById("batchBorrowerName").value = "";
	document.getElementById("batchBorrowerPhone").value = "";
	document.getElementById("batchBorrowerDate").value = new Date()
		.toISOString()
		.split("T")[0];

	document.getElementById("batchRentalModal").style.display = "block";
}

// 일괄 반납 기능
function batchReturn() {
	const selectedBooks = getSelectedBooks();

	if (selectedBooks.length === 0) {
		alert("반납할 도서를 선택하세요.");
		return;
	}

	// 대여 중인 도서만 필터링
	const borrowedBooks = selectedBooks.filter(
		(item) => item.rental.getStatus().isBorrowed
	);

	if (borrowedBooks.length === 0) {
		alert("선택된 도서 중 대여 중인 도서가 없습니다.");
		return;
	}

	// 일괄 반납 처리
	let returnedCount = 0;
	borrowedBooks.forEach((item) => {
		item.rental.returnBook();
		returnedCount++;
	});

	saveBooksToStorage(); // 저장

	applyCurrentFilter();
	alert(`${returnedCount}권의 도서가 반납되었습니다.`);

	// 전체 선택 해제
	deselectAllBooks();
}

// 일괄 대여 모달 닫기
function closeBatchModal() {
	document.getElementById("batchRentalModal").style.display = "none";
}

// 일괄 대여 확인
function confirmBatchRental() {
	const name = document.getElementById("batchBorrowerName").value.trim();
	const phone = document.getElementById("batchBorrowerPhone").value.trim();
	const date = document.getElementById("batchBorrowerDate").value;

	if (!name || !phone) {
		alert("대여자 이름과 연락처를 입력하세요.");
		return;
	}

	const borrowerData = { name, phone, date };
	const selectedBooks = getSelectedBooks();

	let successCount = 0;
	selectedBooks.forEach((item) => {
		if (item.rental.borrow(borrowerData)) {
			successCount++;
		}
	});

	saveBooksToStorage(); // 저장

	applyCurrentFilter();
	alert(`${successCount}권의 도서가 대여되었습니다.`);

	// 전체 선택 해제
	deselectAllBooks();
	closeBatchModal();
}

// 모달 외부 클릭 시 닫기
window.onclick = function (event) {
	const modal = document.getElementById("rentalModal");
	const batchModal = document.getElementById("batchRentalModal");

	if (event.target == modal) {
		closeModal();
	} else if (event.target == batchModal) {
		closeBatchModal();
	}
};

// --- 페이지 로드 시 localStorage에서 데이터 불러오기 ---
window.addEventListener("DOMContentLoaded", () => {
	loadBooksFromStorage();
	applyCurrentFilter();
});
