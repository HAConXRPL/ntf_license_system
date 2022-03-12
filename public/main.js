var modal = document.getElementById('simpleModal');
// Get open Modal Button
var modalBtn = document.getElementById('modalBtn');
// Get close button
var closeBtn = document.getElementsByClassName('closeBtn')[0];

function openModal() {
    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function oudsideClick(e) {
    if (e.target==modal) {
        modal.style.display = 'none';
    }
}
