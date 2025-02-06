const toggleButton = document.getElementById("dark-mode-toggle");
const body = document.body;

// Cek dark mode sebelumnya
if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "☀️ Light Mode";
}

// Event listener buat tombol
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
