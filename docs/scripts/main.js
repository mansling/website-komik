document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(param) {
        return new URLSearchParams(window.location.search).get(param);
    }

    // **Memuat Data Komik dari JSON**
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

    // **Memuat Daftar Komik**
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

    // **Fitur Komentar**
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

    loadComments(); // Pastikan komentar dimuat setelah DOM siap
});
