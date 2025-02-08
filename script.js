document.addEventListener("DOMContentLoaded", function () {
    // Fungsi untuk mendapatkan parameter dari URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // Fetch data dari JSON (gunakan path lengkap jika di GitHub Pages)
    fetch("./data.json")
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

    // Fungsi untuk menampilkan daftar komik di index.html
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

    // Fungsi untuk menampilkan detail komik di detail.html
        // Load Comic Detail Page
        function loadComicDetail(comics) {
            const comicId = getQueryParam("id");
            const comic = comics.find(item => item.id == comicId);
            
            if (!comic) {
                document.getElementById("comic-title").textContent = "Komik tidak ditemukan.";
                return;
            }
        
            document.getElementById("comic-title").textContent = comic.title;
            document.getElementById("comic-cover").src = comic.cover;
            document.getElementById("comic-description").textContent = comic.description || "Deskripsi tidak tersedia.";
            
            const readNowButton = document.getElementById("read-now");
            const chapterListElement = document.getElementById("chapter-list");
            chapterListElement.innerHTML = "";
            
            if (comic.chapters && comic.chapters.length > 0) {
                // Ubah link "Baca Sekarang" ke chapter pertama
                readNowButton.href = `chapter.html?id=${comic.id}&chapter=1`;
            } else {
                readNowButton.style.display = "none"; // Sembunyikan tombol jika tidak ada chapter
            }
            
            comic.chapters?.forEach((chapter) => {
                const chapterItem = document.createElement("li");
                const chapterLink = document.createElement("a");
                chapterLink.href = `chapter.html?id=${comic.id}&chapter=${chapter.number}`;
                chapterLink.textContent = `Chapter ${chapter.number}`;
                chapterItem.appendChild(chapterLink);
                chapterListElement.appendChild(chapterItem);
            });
        }

    // Fungsi untuk menampilkan daftar chapter di chapters.html
    function loadChaptersList(comics) {
        const comicId = getQueryParam("komik") || "1";
        const chapterListElement = document.getElementById("chapterList");

        const comic = comics.find(c => c.id == comicId);
        if (!comic) {
            chapterListElement.innerHTML = "<p>Komik tidak ditemukan.</p>";
            return;
        }

        chapterListElement.innerHTML = "";
        comic.chapters.forEach(chapter => {
            const li = document.createElement("li");
            const link = document.createElement("a");
            link.href = `chapter.html?id=${comicId}&chapter=${chapter.number}`;
            link.textContent = `Chapter ${chapter.number}`;
            li.appendChild(link);
            chapterListElement.appendChild(li);
        });
    }

    // Fungsi untuk menampilkan isi chapter di chapter.html
    function loadChapter(comics) {
        const comicId = getQueryParam("id");
        const chapterNum = getQueryParam("chapter");

        const comic = comics.find(c => c.id == comicId);
        if (!comic) {
            document.getElementById("chapter-content").innerHTML = "<p>Komik tidak ditemukan.</p>";
            return;
        }

        const chapter = comic.chapters.find(chap => chap.number == chapterNum);
        if (!chapter) {
            document.getElementById("chapter-content").innerHTML = "<p>Chapter tidak ditemukan.</p>";
            return;
        }

        document.getElementById("chapter-title").textContent = `Chapter ${chapter.number}`;
        document.getElementById("chapter-content").innerHTML = `<img src="${chapter.image}" alt="Chapter ${chapter.number}">`;

        // Navigasi chapter
        const prevBtn = document.getElementById("prevChapter");
        const nextBtn = document.getElementById("nextChapter");
        const chapterSelect = document.getElementById("chapterSelect");

        comic.chapters.forEach(chap => {
            const option = document.createElement("option");
            option.value = chap.number;
            option.textContent = `Chapter ${chap.number}`;
            chapterSelect.appendChild(option);
        });

        chapterSelect.value = chapterNum;

        if (chapterNum > 1) {
            prevBtn.onclick = () => window.location.href = `chapter.html?id=${comicId}&chapter=${chapterNum - 1}`;
        } else {
            prevBtn.disabled = true;
        }

        if (chapterNum < comic.chapters.length) {
            nextBtn.onclick = () => window.location.href = `chapter.html?id=${comicId}&chapter=${parseInt(chapterNum) + 1}`;
        } else {
            nextBtn.disabled = true;
        }

        chapterSelect.onchange = () => {
            window.location.href = `chapter.html?id=${comicId}&chapter=${chapterSelect.value}`;
        };
    }
});
