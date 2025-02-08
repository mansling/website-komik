/* script.js */
document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
    }
    toggleButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Ambil parameter dari URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Fetch data dari JSON
    fetch("data.json")
        .then(response => response.json())
        .then(comics => {
            if (window.location.pathname.includes("detail.html")) {
                loadComicDetail(comics);
            } else if (window.location.pathname.includes("chapter.html")) {
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

    // Tampilkan detail komik di detail.html
    function loadComicDetail(comics) {
        const comicId = getQueryParam("id");
        const comic = comics.find(c => c.id == comicId);
        
        if (comic) {
            document.getElementById("comic-title").textContent = comic.title;
            document.getElementById("comic-cover").src = comic.cover;
            document.getElementById("comic-description").textContent = comic.description;

            const chapterList = document.getElementById("chapter-list");
            chapterList.innerHTML = "";
            comic.chapters.forEach(chap => {
                const li = document.createElement("li");
                li.innerHTML = `<a href="chapter.html?id=${comic.id}&chapter=${chap.number}">${chap.title}</a>`;
                chapterList.appendChild(li);
            });
        }
    }

    // Tampilkan chapter di chapter.html
    function loadChapter(comics) {
        const comicId = getQueryParam("id");
        const chapterNum = getQueryParam("chapter");
        const comic = comics.find(c => c.id == comicId);
        
        if (comic) {
            const chapter = comic.chapters.find(chap => chap.number == chapterNum);
            if (chapter) {
                document.getElementById("chapter-title").textContent = chapter.title;
                document.getElementById("chapter-content").innerHTML = `<img src="${chapter.image}" alt="${chapter.title}">`;
            }
        }
    }
});
