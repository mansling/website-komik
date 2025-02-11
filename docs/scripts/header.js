document.addEventListener("DOMContentLoaded", function () {
    // **Memuat Header**
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;

            // **Dark Mode**
            const darkModeToggle = document.getElementById("dark-mode-toggle");
            const body = document.body;

            if (!darkModeToggle) {
                console.error("Tombol Dark Mode tidak ditemukan!");
                return;
            }

            // Cek status Dark Mode dari localStorage
            if (localStorage.getItem("dark-mode") === "enabled") {
                body.classList.add("dark-mode");
            }

            // Event untuk tombol
            darkModeToggle.addEventListener("click", function () {
                body.classList.toggle("dark-mode");

                // Simpan status di localStorage
                if (body.classList.contains("dark-mode")) {
                    localStorage.setItem("dark-mode", "enabled");
                } else {
                    localStorage.setItem("dark-mode", "disabled");
                }
            });

            // **Fungsi Pencarian**
            const searchInput = document.getElementById("search-input");
            if (searchInput) {
                searchInput.addEventListener("input", function () {
                    searchComics();
                });
            }

            function searchComics() {
                const query = searchInput.value.toLowerCase();
                const comics = document.querySelectorAll(".comic-item");
                comics.forEach(comic => {
                    const title = comic.querySelector("h3").textContent.toLowerCase();
                    comic.style.display = title.includes(query) ? "block" : "none";
                });
            }
        })
        .catch(error => console.error("Gagal memuat header:", error));

    // **Memuat Footer**
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data)
        .catch(error => console.error("Gagal memuat footer:", error));

    // **Fungsi Navbar & Pencarian**
    function toggleMenu() {
        document.querySelector(".nav-links").classList.toggle("active");
    }

    function toggleSearch() {
        document.getElementById("searchBar").classList.toggle("active");
    }

    document.getElementById("menu-toggle")?.addEventListener("click", toggleMenu);
    document.getElementById("search-toggle")?.addEventListener("click", toggleSearch);
});
