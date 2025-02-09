document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(param) {
        return new URLSearchParams(window.location.search).get(param);
    }
    fetch("header.html") // Hanya "header.html" karena ada di folder yang sama dengan index.html
        .then(response => response.text())
        .then(data => document.getElementById("header-container").innerHTML = data);

    fetch("footer.html") 
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data);

    // Mode Gelap
    const toggle = document.getElementById("dark-mode-toggle");
        if (toggle) {
            toggle.addEventListener("click", function () {
                document.body.classList.toggle("dark-mode");
                localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
            });
    
            // Pastikan dark mode tetap aktif saat reload
            if (localStorage.getItem("darkMode") === "true") {
                document.body.classList.add("dark-mode");
            }
        }

    // Fetch Data JSON
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

    // Fungsi Load List Komik
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

    // Load Detail Komik
    function loadComicDetail(comics) {
        const comicId = getQueryParam("id");
        const comic = comics.find(item => item.id == comicId);
        if (!comic) return;

        document.getElementById("comic-title").textContent = comic.title;
        document.getElementById("comic-cover").src = comic.cover;
        document.getElementById("comic-description").textContent = comic.description || "Deskripsi tidak tersedia.";

        const readNowButton = document.getElementById("read-now");
        const chapterListElement = document.getElementById("chapter-list");

        if (comic.chapters?.length > 0) {
            readNowButton.href = `chapter.html?id=${comic.id}&chapter=1`;
        } else {
            readNowButton.style.display = "none";
        }

        chapterListElement.innerHTML = "";
        comic.chapters?.forEach(chapter => {
            const chapterItem = document.createElement("li");
            chapterItem.innerHTML = `<a href="chapter.html?id=${comic.id}&chapter=${chapter.number}">Chapter ${chapter.number}</a>`;
            chapterListElement.appendChild(chapterItem);
        });
    }

    // Load Daftar Chapter
    function loadChaptersList(comics) {
        const comicId = getQueryParam("komik") || "1";
        const chapterListElement = document.getElementById("chapterList");
        const comic = comics.find(c => c.id == comicId);
        if (!comic) return;

        chapterListElement.innerHTML = "";
        comic.chapters.forEach(chapter => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="chapter.html?id=${comicId}&chapter=${chapter.number}">Chapter ${chapter.number}</a>`;
            chapterListElement.appendChild(li);
        });
    }

    // Load Isi Chapter
    function loadChapter(comics) {
        const comicId = getQueryParam("id");
        const chapterNum = parseInt(getQueryParam("chapter"));
        const comic = comics.find(c => c.id == comicId);
        if (!comic) return;

        const chapter = comic.chapters.find(chap => chap.number == chapterNum);
        if (!chapter) return;

        document.getElementById("chapter-title").textContent = chapter.title;
        document.getElementById("chapter-content").innerHTML = `<img src="${chapter.image}" alt="${chapter.title}">`;

        // Navigasi Chapter
        const prevBtn = document.getElementById("prevChapter");
        const nextBtn = document.getElementById("nextChapter");
        const chapterSelect = document.getElementById("chapterSelect");

        if (prevBtn) {
            prevBtn.disabled = chapterNum <= 1;
            prevBtn.onclick = () => {
                window.location.href = `chapter.html?id=${comicId}&chapter=${chapterNum - 1}`;
            };
        }

        if (nextBtn) {
            nextBtn.disabled = chapterNum >= comic.chapters.length;
            nextBtn.onclick = () => {
                window.location.href = `chapter.html?id=${comicId}&chapter=${chapterNum + 1}`;
            };
        }

        if (chapterSelect) {
            chapterSelect.innerHTML = "";
            comic.chapters.forEach(chap => {
                const option = document.createElement("option");
                option.value = chap.number;
                option.textContent = `Chapter ${chap.number}`;
                if (chap.number == chapterNum) option.selected = true;
                chapterSelect.appendChild(option);
            });

            chapterSelect.onchange = () => {
                window.location.href = `chapter.html?id=${comicId}&chapter=${chapterSelect.value}`;
            };
        }
    }

    // Load Komentar
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

    // Simpan Komentar
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

    loadComments();
});
