document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(param) {
        return new URLSearchParams(window.location.search).get(param);
    }

    // Dark Mode
// Memuat header dan footer
fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;

        // **Jalankan Dark Mode setelah header dimuat**
        const darkModeToggle = document.getElementById("dark-mode-toggle");
        const body = document.body;

        if (!darkModeToggle) {
            console.error("Tombol Dark Mode tidak ditemukan!");
            return;
        }

        // Cek status Dark Mode dari localStorage
        if (localStorage.getItem("dark-mode") === "enabled") {
            body.classList.add("dark-mode");
        }

        // Event untuk tombol
        darkModeToggle.addEventListener("click", function () {
            body.classList.toggle("dark-mode");

            // Simpan status di localStorage
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("dark-mode", "enabled");
            } else {
                localStorage.setItem("dark-mode", "disabled");
            }
        });
    })
    .catch(error => console.error("Gagal memuat header:", error));

fetch("footer.html")
    .then(response => response.text())
    .then(data => document.getElementById("footer-container").innerHTML = data)
    .catch(error => console.error("Gagal memuat footer:", error));


    // Memuat data JSON
    fetch("data/comics.json")
        .then(response => response.json())
        .then(comics => {
            const path = window.location.pathname;
            if (path.includes("chapter.html")) {
                loadChapter(comics);
            } else if (path.includes("chapters.html")) {
                loadChaptersList(comics);
            } else if (path.includes("detail.html")) {
                loadComicDetail(comics);
            } else {
                loadComicList(comics);
            }
        })
        .catch(error => {
            console.error("Gagal memuat data.json:", error);
            alert("Gagal memuat data, coba lagi nanti.");
        });

    // Fungsi pencarian komik
    document.getElementById("search-input")?.addEventListener("input", function () {
        searchComics();
    });

    function searchComics() {
        const query = document.getElementById("search-input").value.toLowerCase();
        const comics = document.querySelectorAll(".comic-item");
        comics.forEach(comic => {
            const title = comic.querySelector("h3").textContent.toLowerCase();
            comic.style.display = title.includes(query) ? "block" : "none";
        });
    }

    // Fungsi untuk memuat daftar komik
    function loadComicList(comics) {
        const comicContainer = document.getElementById("comic-list");
        if (!comicContainer) return;
        comicContainer.innerHTML = "";
        comics.forEach(comic => {
            const div = document.createElement("div");
            div.classList.add("comic-item");
            div.innerHTML = `
                <a href="detail.html?id=${comic.id}">
                    <img src="${comic.cover}" alt="${comic.title}">
                    <h3>${comic.title}</h3>
                </a>
            `;
            comicContainer.appendChild(div);
        });
    }

    // Fungsi lainnya (load detail, load chapter, load komentar, dll.) tetap sama seperti di kode lama

    loadComments();

    function loadComments() {
        const comicId = getQueryParam("id");
        const comments = JSON.parse(localStorage.getItem(`comments-${comicId}`)) || [];
        const commentList = document.getElementById("comment-list");
        if (!commentList) return;

        commentList.innerHTML = "";
        comments.forEach(comment => {
            const li = document.createElement("li");
            li.textContent = comment;
            commentList.appendChild(li);
        });
    }

    // Simpan komentar
    const submitComment = document.getElementById("submit-comment");
    if (submitComment) {
        submitComment.addEventListener("click", function () {
            const comicId = getQueryParam("id");
            const commentInput = document.getElementById("comment-input");
            if (!commentInput) return;

            let comments = JSON.parse(localStorage.getItem(`comments-${comicId}`)) || [];
            if (commentInput.value.trim() !== "") {
                comments.push(commentInput.value.trim());
                localStorage.setItem(`comments-${comicId}`, JSON.stringify(comments));
                commentInput.value = "";
                loadComments();
            }
        });
    }
});
