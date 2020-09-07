const toggle = document.getElementById('toggle');
const open = document.getElementById('open');
const closeBtn = document.getElementById('close');
const modal = document.getElementById('modal');

function toggleBar() {
    document.body.classList.toggle('show-nav');
}

function openModal() {
    modal.classList.add('show-modal');
}

function closeModal() {
    modal.classList.remove('show-modal');
}

toggle.addEventListener('click', toggleBar);
open.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    e.target == modal ? closeModal() : false;
})