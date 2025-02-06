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

// Fungsi untuk clear search
function clearSearch() {
    document.getElementById("searchBar").value = "";
    searchComic(); // Refresh daftar komik
}

