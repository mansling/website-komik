document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const comicTitle = params.get("komik") || "judul_komik_1";
    let chapterNumber = parseInt(params.get("chapter")) || 1;
    const totalChapters = 224; // Ganti sesuai jumlah chapter sebenarnya

    const chapterTitle = document.getElementById("chapterTitle");
    const chapterImage = document.getElementById("chapterImage");
    const prevChapter = document.getElementById("prevChapter");
    const nextChapter = document.getElementById("nextChapter");
    const chapterSelect = document.getElementById("chapterSelect");

    // Set judul dan gambar chapter
    chapterTitle.textContent = `Chapter ${chapterNumber}`;
    chapterImage.src = `images/${comicTitle}_ch${chapterNumber}.jpg`;

    // Jika gambar gagal dimuat, pakai placeholder
    chapterImage.onerror = function () {
        chapterImage.src = "images/not-found.jpg";
    };

    // Generate dropdown chapter (dari besar ke kecil)
    for (let i = totalChapters; i >= 1; i--) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = `Chapter ${i}`;
        if (i === chapterNumber) option.selected = true;
        chapterSelect.appendChild(option);
    }

    // Navigasi chapter
    prevChapter.addEventListener("click", function () {
        if (chapterNumber > 1) {
            window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber - 1}`;
        }
    });

    nextChapter.addEventListener("click", function () {
        if (chapterNumber < totalChapters) {
            window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber + 1}`;
        }
    });

    // Pindah chapter saat dropdown dipilih
    chapterSelect.addEventListener("change", function () {
        window.location.href = `chapter.html?komik=${comicTitle}&chapter=${this.value}`;
    });
});

// ================== DARK MODE ==================
const toggleButton = document.getElementById("dark-mode-toggle");
const body = document.body;

if (toggleButton) {
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
}
