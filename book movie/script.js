const container = document.querySelector('.container');
const seat = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = +movieSelect.value;
populateUI();

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('seatSelected'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seat.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('movie index');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    const selectedMoviePrice = localStorage.getItem('movie price');
    if (selectedMoviePrice !== null) {
        movieSelect.ticketPrice = selectedMoviePrice;
    }

    if (selectedSeats != null) {
    const getCountValue = selectedSeats.length;
    count.innerText = getCountValue;
    total.innerText = getCountValue * selectedMoviePrice;
    }
}

function updateSelectedCount() {
    const seatSelected = document.querySelectorAll('.row .seat.selected');
    const seatIndex = [...seatSelected].map(item => {
        return [...seat].indexOf(item);
    })
    localStorage.setItem('seatSelected', JSON.stringify(seatIndex))

    const getCountValue = seatSelected.length;
    count.innerText = getCountValue;
    total.innerText = getCountValue * ticketPrice;
}

movieSelect.addEventListener('change', (e) => {
    ticketPrice = e.target.value;
    localStorage.setItem('movie index', e.target.selectedIndex)
    localStorage.setItem('movie price', e.target.value)
    updateSelectedCount();
})

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})
