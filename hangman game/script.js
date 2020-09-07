const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMsg = document.getElementById('final-message');

const figurePart = document.querySelectorAll('.figure-part')
let words = ['Messi', 'Ronaldo', 'Pogba', 'Dybala', 'Becham'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let correctLetter = [];
let wrongLetter = [];

function displayWord() {
    wordEl.innerHTML = `${selectedWord.split('')
        .map(letter =>
            `<span class="letter">${correctLetter.includes(letter) ? letter : ''} </span>`).join('')
        }`
    const innerWord = wordEl.innerText.replace(/\n/g, '');
    if (innerWord == selectedWord) {
        finalMsg.innerText = "Congrats :)";
        popup.style.display = 'flex';
    }
}

function updateWrongLetterEl() {
    //display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetter.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetter.map(letter => `<span>${letter}</span>`)}`;

    //display parts
    figurePart.forEach((part, index) => {
        const errors = wrongLetter.length;

        if (index < errors) {
            part.style.display = 'block';
        }
        else {
            part.style.display = 'none';
        }
    });

    //check if lost
    if (wrongLetter.length == figurePart.length) {
        finalMsg.innerText = "You lost";
        popup.style.display = 'flex'
    }
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

// Keypress value
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetter.includes(letter)) {
                correctLetter.push(letter);
                displayWord();
            }
            else {
                showNotification();
            }
        } else {
            if (!wrongLetter.includes(letter)) {
                wrongLetter.push(letter);
                updateWrongLetterEl();
            }
            else {
                showNotification();
            }
        }
    }
});

//restart and play
playAgainBtn.addEventListener('click', () => {
    correctLetter.splice(0);
    wrongLetter.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    popup.style.display = 'none';
    updateWrongLetterEl();
})


displayWord();
