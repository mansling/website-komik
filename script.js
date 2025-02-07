/* script.js */
document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode
    const toggleButton = document.createElement("button");
    toggleButton.id = "dark-mode-toggle";
    toggleButton.textContent = "🌙 Dark Mode";
    document.body.prepend(toggleButton);
    
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
        toggleButton.textContent = "☀️ Light Mode";
    }
    toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            toggleButton.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            toggleButton.textContent = "🌙 Dark Mode";
        }
    });
    
    // Navigasi Chapter
    const params = new URLSearchParams(window.location.search);
    const comicTitle = params.get("komik") || "Judul Komik";
    const chapterNumber = parseInt(params.get("chapter")) || 1;
    
    const chapterTitle = document.getElementById("chapterTitle");
    const chapterImage = document.getElementById("chapterImage");
    
    if (chapterTitle && chapterImage) {
        chapterTitle.textContent = `Chapter ${chapterNumber}`;
        chapterImage.src = `images/${comicTitle.replace(/\s+/g, "_")}_ch${chapterNumber}.jpg`;
        chapterImage.onerror = function () {
            chapterImage.src = "images/not-found.jpg";
        };
    }
    
    document.getElementById("prevChapter").addEventListener("click", function () {
        if (chapterNumber > 1) {
            window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber - 1}`;
        }
    });
    document.getElementById("nextChapter").addEventListener("click", function () {
        if (chapterNumber < 224) {
            window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber + 1}`;
        }
    });

    const chapterSelect = document.getElementById("chapterSelect");
    for (let i = 224; i >= 1; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `Chapter ${i}`;
        if (i === chapterNumber) option.selected = true;
        chapterSelect.appendChild(option);
    }
    chapterSelect.addEventListener("change", function () {
        window.location.href = `chapter.html?komik=${comicTitle}&chapter=${this.value}`;
    });
});
