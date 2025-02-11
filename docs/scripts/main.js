document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(param) {
        return new URLSearchParams(window.location.search).get(param);
    }

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
});
