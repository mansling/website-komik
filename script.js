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

    // Navigasi Chapter
    const params = new URLSearchParams(window.location.search);
    const comicTitle = params.get("komik") || "Judul Komik";
    const chapterNumber = parseInt(params.get("chapter")) || 1;
    const totalChapters = 100;
    document.getElementById("chapterTitle").textContent = `Chapter ${chapterNumber}`;
    document.getElementById("chapterImage").src = `images/${comicTitle}_ch${chapterNumber}.jpg`;
    document.getElementById("prevChapter").addEventListener("click", function () {
        if (chapterNumber > 1) {
            window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber - 1}`;
        }
    });
    document.getElementById("nextChapter").addEventListener("click", function () {
        if (chapterNumber < totalChapters) {
            window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber + 1}`;
        }
    });
});
