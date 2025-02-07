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
function searchComic() {
    let input = document.getElementById("searchBar");
    let filter = input.value.toLowerCase();
    let comics = document.querySelectorAll(".comic");
    let clearBtn = document.getElementById("clearSearch");

    // Tampilkan tombol clear kalau ada teks
    clearBtn.style.display = filter ? "block" : "none";  

    comics.forEach(comic => {
        let title = comic.querySelector("h2").innerText.toLowerCase();
        comic.style.display = title.includes(filter) ? "block" : "none";
    });
}

function clearSearch() {
    let input = document.getElementById("searchBar");
    let clearBtn = document.getElementById("clearSearch");
    let comics = document.querySelectorAll(".comic");

    input.value = "";  // Kosongkan input
    clearBtn.style.display = "none"; // Sembunyikan tombol clear

    // Tampilkan semua komik lagi
    comics.forEach(comic => {
        comic.style.display = "block";
    });
}
// Ambil parameter dari URL
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
const image = urlParams.get("image");

// Isi halaman detail
document.getElementById("comicTitle").innerText = title;
document.getElementById("comicImage").src = image;
document.getElementById("comicImage").alt = title;
document.getElementById("comicDescription").innerText = `Deskripsi dari ${title}. Lorem ipsum dolor sit amet...`;

const params = new URLSearchParams(window.location.search);
const title = params.get('title');

// Data gambar berdasarkan chapter (contoh)
const chapterImages = {
    "Judul Komik 1 - Chapter 1": "images/judul_komik_1_ch1.jpg",
    "Judul Komik 1 - Chapter 2": "images/judul_komik_1_ch2.jpg",
    "Judul Komik 2 - Chapter 1": "images/judul_komik_2_ch1.jpg",
};

// Tampilkan gambar sesuai chapter
const chapterImage = document.getElementById('chapterImage');
chapterImage.src = chapterImages[title] || "images/default.jpg"; // Pakai default kalau tidak ada

const chapterSelect = document.getElementById("chapterSelect");
const chapterTitle = document.getElementById("chapterTitle");
const chapterImage = document.getElementById("chapterImage");
const prevChapter = document.getElementById("prevChapter");
const nextChapter = document.getElementById("nextChapter");

const params = new URLSearchParams(window.location.search);
const comicTitle = params.get("komik") || "komik";
let chapterNumber = parseInt(params.get("chapter")) || 1;
const totalChapters = 50; // Ganti sesuai jumlah chapter

// Generate daftar chapter
for (let i = totalChapters; i >= 1; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `Chapter ${i}`;
    chapterSelect.appendChild(option);
}

// Set default pilihan sesuai URL
chapterSelect.value = chapterNumber;

// Update tampilan chapter
function updateChapter(chapter) {
    chapterNumber = chapter;
    chapterTitle.textContent = `Chapter ${chapter}`;
    chapterImage.src = `images/${comicTitle}_ch${chapter}.jpg`;
}document.addEventListener("DOMContentLoaded", function () {
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
        window.location.href = `chapter.html?komik=${comicTitle}&chapter=${chapterNumber + 1}`;
    });

    // Pindah chapter saat dropdown dipilih
    chapterSelect.addEventListener("change", function () {
        window.location.href = `chapter.html?komik=${comicTitle}&chapter=${this.value}`;
    });
});

});
