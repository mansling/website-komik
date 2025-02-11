document.addEventListener("DOMContentLoaded", function () {
    // Memuat header
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;

            // 🔥 Pindahkan event listener setelah header dimuat
            const darkModeToggle = document.getElementById("dark-mode-toggle");
            const menuToggle = document.getElementById("menu-toggle");
            const searchToggle = document.getElementById("search-toggle");
            const body = document.body;

            // 🌙 Dark Mode
            if (localStorage.getItem("dark-mode") === "enabled") {
                body.classList.add("dark-mode");
            }

            darkModeToggle?.addEventListener("click", function () {
                body.classList.toggle("dark-mode");
                localStorage.setItem("dark-mode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
            });

            // ☰ Menu Toggle
            menuToggle?.addEventListener("click", function () {
                document.querySelector(".nav-links").classList.toggle("active");
            });

            // 🔍 Search Toggle
            searchToggle?.addEventListener("click", function () {
                document.getElementById("searchBar").classList.toggle("active");
            });
        })
        .catch(error => console.error("Gagal memuat header:", error));

    // Memuat footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data)
        .catch(error => console.error("Gagal memuat footer:", error));
});
