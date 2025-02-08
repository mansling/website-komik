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

    document.addEventListener("DOMContentLoaded", function () {
        // Ambil ID komik dari URL
        const urlParams = new URLSearchParams(window.location.search);
        const comicId = urlParams.get("id");
    
        // Ambil elemen yang akan diisi
        const titleElement = document.getElementById("comic-title");
        const coverElement = document.getElementById("comic-cover");
        const descriptionElement = document.getElementById("comic-description");
        const chapterListElement = document.getElementById("chapter-list");
    
        // Ambil data dari data.json
        fetch("data.json")
            .then(response => response.json())
            .then(data => {
                // Cari komik berdasarkan ID
                const comic = data.find(item => item.id == comicId);
    
                if (comic) {
                    // Set judul komik
                    titleElement.textContent = comic.title;
    
                    // Set cover komik
                    coverElement.src = "images/" + comic.cover;
                    coverElement.alt = comic.title;
    
                    // **Perbaikan: Kosongkan elemen deskripsi sebelum diisi**
                    descriptionElement.textContent = ""; 
                    descriptionElement.textContent = comic.description;
    
                    // Tambahkan daftar chapter
                    chapterListElement.innerHTML = "";
                    comic.chapters.forEach((chapter, index) => {
                        const chapterItem = document.createElement("li");
                        const chapterLink = document.createElement("a");
                        chapterLink.href = `chapter.html?id=${comic.id}&chapter=${index + 1}`;
                        chapterLink.textContent = `Chapter ${index + 1}`;
                        chapterItem.appendChild(chapterLink);
                        chapterListElement.appendChild(chapterItem);
                    });
                } else {
                    titleElement.textContent = "Komik tidak ditemukan.";
                }
            })
            .catch(error => console.error("Gagal mengambil data:", error));
    });



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
