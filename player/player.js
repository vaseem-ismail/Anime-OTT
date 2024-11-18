const button = document.getElementById('show');
const seasonsBar = document.getElementById('seasons-bar');

button.addEventListener('click', () => {
    seasonsBar.classList.toggle('collapsed');
    if (seasonsBar.classList.contains('collapsed')) {
        button.textContent = 'S';
    } else {
        button.textContent = 'SEASONS';
    }
});
window.addEventListener("load", () => {
    seasonsBar.classList.toggle('collapsed');
})