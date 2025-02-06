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


