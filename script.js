document.addEventListener("DOMContentLoaded", function () {
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

    // ================== PENCARIAN KOMIK ==================
    const searchBar = document.getElementById("searchBar");
    const clearSearch = document.getElementById("clearSearch");
    const comics = document.querySelectorAll(".comic");

    if (searchBar) {
        searchBar.addEventListener("keyup", function () {
            let searchText = searchBar.value.toLowerCase();
            comics.forEach(comic => {
                let title = comic.querySelector("h2").textContent.toLowerCase();
                comic.style.display = title.includes(searchText) ? "block" : "none";
            });
        });

        clearSearch.addEventListener("click", function () {
            searchBar.value = "";
            comics.forEach(comic => comic.style.display = "block");
        });
    }

    // ================== LOAD DETAIL KOMIK ==================
    const params = new URLSearchParams(window.location.search);
    const comicTitle = params.get("title") || "Judul Komik";
    const comicImage = params.get("image") || "images/default.jpg";

    const titleElement = document.getElementById("comicTitle");
    const imageElement = document.getElementById("comicImage");
    const chapterList = document.getElementById("chapterList");

    if (titleElement && imageElement) {
        titleElement.innerText = comicTitle;
        imageElement.src = comicImage;
    }

    // Data contoh daftar chapter
    const chaptersData = {
        "Judul Komik 1": [
            { number: 1, link: "chapter.html?komik=Judul Komik 1&chapter=1" },
            { number: 2, link: "chapter.html?komik=Judul Komik 1&chapter=2" }
        ],
        "Judul Komik 2": [
            { number: 1, link: "chapter.html?komik=Judul Komik 2&chapter=1" },
            { number: 2, link: "chapter.html?komik=Judul Komik 2&chapter=2" }
        ]
    };

    if (chapterList && chaptersData[comicTitle]) {
        chapterList.innerHTML = ""; // Kosongkan dulu
        chaptersData[comicTitle].forEach(chapter => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = chapter.link;
            a.textContent = `Chapter ${chapter.number}`;
            li.appendChild(a);
            chapterList.appendChild(li);
        });
    }

    // ================== NAVIGASI CHAPTER ==================
    const chapterNumber = parseInt(params.get("chapter")) || 1;
    const totalChapters = 224; // Ubah sesuai jumlah chapter komik yang sebenarnya

    const chapterTitle = document.getElementById("chapterTitle");
    const chapterImage = document.getElementById("chapterImage");
    const prevChapter = document.getElementById("prevChapter");
    const nextChapter = document.getElementById("nextChapter");
    const chapterSelect = document.getElementById("chapterSelect");

    if (chapterTitle && chapterImage) {
        chapterTitle.textContent = `Chapter ${chapterNumber}`;
        chapterImage.src = `images/${comicTitle}_ch${chapterNumber}.jpg`;

        // Placeholder jika gambar tidak ditemukan
        chapterImage.onerror = function () {
            chapterImage.src = "images/not-found.jpg";
        };
    }

    // Dropdown chapter (dari besar ke kecil)
    if (chapterSelect) {
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
