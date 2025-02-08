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

    // Data Komik
    const comics = [
        {
            id: 1,
            title: "Komik A",
            cover: "images/komik-a.jpg",
            description: "Ini adalah deskripsi Komik A.",
            chapters: [
                { number: 1, title: "Chapter 1", url: "chapter.html?id=1&chapter=1" },
                { number: 2, title: "Chapter 2", url: "chapter.html?id=1&chapter=2" }
            ]
        },
        {
            id: 2,
            title: "Komik B",
            cover: "images/komik-b.jpg",
            description: "Ini adalah deskripsi Komik B.",
            chapters: [
                { number: 1, title: "Chapter 1", url: "chapter.html?id=2&chapter=1" }
            ]
        }
    ];

    // Ambil parameter dari URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Tampilkan detail komik di detail.html
    function loadComicDetail() {
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
                li.innerHTML = `<a href="${chap.url}">${chap.title}</a>`;
                chapterList.appendChild(li);
            });
        }
    }

    // Navigasi Chapter
    const params = new URLSearchParams(window.location.search);
    const comicTitle = params.get("komik") || "Judul Komik";
    const chapterNumber = parseInt(params.get("chapter")) || 1;
    document.getElementById("chapterTitle").textContent = `Chapter ${chapterNumber}`;
    document.getElementById("chapterImage").src = `images/${comicTitle}_ch${chapterNumber}.jpg`;
    
    document.getElementById("prevChapter").addEventListener("click", function () {
        if (chapterNumber > 1) {
            window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber - 1}`;
        }
    });
    document.getElementById("nextChapter").addEventListener("click", function () {
        window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber + 1}`;
    });

    // Panggil fungsi berdasarkan halaman
    if (window.location.pathname.includes("detail.html")) {
        loadComicDetail();
    }
});
