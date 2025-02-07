document.addEventListener("DOMContentLoaded", function () {
    // ================== DARK MODE ==================
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggleButton.textContent = "☀️ Light Mode";
    }

    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            toggleButton.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("dark-mode", "disabled");
            toggleButton.textContent = "🌙 Dark Mode";
        }
    });

    // ================== NAVIGASI CHAPTER ==================
    const params = new URLSearchParams(window.location.search);
    const comicTitle = params.get("komik") || "Judul Komik";
    const chapterNumber = parseInt(params.get("chapter")) || 1;

    const chapterTitle = document.getElementById("chapterTitle");
    const chapterImage = document.getElementById("chapterImage");
    const prevChapter = document.getElementById("prevChapter");
    const nextChapter = document.getElementById("nextChapter");
    const chapterSelect = document.getElementById("chapterSelect");

    const totalChapters = 224; // Ganti sesuai jumlah chapter yang benar

    if (chapterTitle && chapterImage) {
        chapterTitle.textContent = `Chapter ${chapterNumber}`;
        chapterImage.src = `images/${comicTitle.replace(/\s+/g, "_")}_ch${chapterNumber}.jpg`;

        // Placeholder jika gambar tidak ditemukan
        chapterImage.onerror = function () {
            chapterImage.src = "images/not-found.jpg";
        };
    }

    // Dropdown chapter
    if (chapterSelect) {
        chapterSelect.innerHTML = "";
        for (let i = totalChapters; i >= 1; i--) {
            let option = document.createElement("option");
            option.value = i;
            option.textContent = `Chapter ${i}`;
            if (i === chapterNumber) option.selected = true;
            chapterSelect.appendChild(option);
        }

        chapterSelect.addEventListener("change", function () {
            window.location.href = `chapter.html?komik=${comicTitle}&chapter=${this.value}`;
        });
    }

    // Navigasi chapter sebelumnya & berikutnya
    if (prevChapter) {
        prevChapter.addEventListener("click", function () {
            if (chapterNumber > 1) {
                window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber - 1}`;
            }
        });
    }

    if (nextChapter) {
        nextChapter.addEventListener("click", function () {
            if (chapterNumber < totalChapters) {
                window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber + 1}`;
            }
        });
    }
});
