document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
    }

    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            body.classList.toggle("dark-mode");
            localStorage.setItem("dark-mode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
        });
    }

    // Ambil parameter dari URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Fetch data dari JSON
    fetch("data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Gagal mengambil data JSON");
            }
            return response.json();
        })
        .then(comics => {
            const path = window.location.pathname;
            if (path.includes("detail.html")) {
                loadComicDetail(comics);
            } else if (path.includes("chapter.html")) {
                loadChapter(comics);
            } else {
                loadComicList(comics);
            }
        })
        .catch(error => console.error("Error loading data:", error));

    // Tampilkan daftar komik di index.html
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

    function loadComicDetail(comics) {
        const comicId = getQueryParam("id");
        const comic = comics.find(item => item.id == comicId);

        if (comic) {
            document.getElementById("comic-title").textContent = comic.title;
            document.getElementById("comic-cover").src = comic.cover;
            document.getElementById("comic-description").textContent = comic.description || "Deskripsi tidak tersedia.";

            const readNowButton = document.getElementById("read-now");
            const chapterListElement = document.getElementById("chapter-list");

            if (comic.chapters && comic.chapters.length > 0) {
                readNowButton.href = comic.chapters[0].url;
            } else {
                readNowButton.style.display = "none";
            }

            chapterListElement.innerHTML = "";
            if (comic.chapters) {
                comic.chapters.forEach((chapter) => {
                    const chapterItem = document.createElement("li");
                    const chapterLink = document.createElement("a");
                    chapterLink.href = chapter.url;
                    chapterLink.textContent = `Chapter ${chapter.number}`;
                    chapterItem.appendChild(chapterLink);
                    chapterListElement.appendChild(chapterItem);
                });
            }
        } else {
            document.getElementById("comic-title").textContent = "Komik tidak ditemukan.";
        }
    }

    function loadChapter(comics) {
        const comicId = getQueryParam("id");
        const chapterNum = getQueryParam("chapter");
        const comic = comics.find(c => c.id == comicId);

        if (comic) {
            const chapter = comic.chapters.find(chap => chap.number == chapterNum);
            if (chapter) {
                document.getElementById("chapter-title").textContent = chapter.title;
                document.getElementById("chapter-content").innerHTML = `<img src="${chapter.image}" alt="${chapter.title}">`;
            } else {
                document.getElementById("chapter-content").textContent = "Chapter tidak ditemukan.";
            }
        } else {
            document.getElementById("chapter-content").textContent = "Komik tidak ditemukan.";
        }
    }
});
