document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;
            
            const darkModeToggle = document.getElementById("dark-mode-toggle");
            const body = document.body;

            if (localStorage.getItem("dark-mode") === "enabled") {
                body.classList.add("dark-mode");
            }

            darkModeToggle.addEventListener("click", function () {
                body.classList.toggle("dark-mode");
                if (body.classList.contains("dark-mode")) {
                    localStorage.setItem("dark-mode", "enabled");
                } else {
                    localStorage.setItem("dark-mode", "disabled");
                }
            });
        })
        .catch(error => console.error("Gagal memuat header:", error));

    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-container").innerHTML = data)
        .catch(error => console.error("Gagal memuat footer:", error));

    function toggleMenu() {
        document.querySelector(".nav-links").classList.toggle("active");
    }

    function toggleSearch() {
        document.getElementById("searchBar").classList.toggle("active");
    }

    document.getElementById("menu-toggle")?.addEventListener("click", toggleMenu);
    document.getElementById("search-toggle")?.addEventListener("click", toggleSearch);
});
