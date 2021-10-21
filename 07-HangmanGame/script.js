const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const playButton = document.getElementById('play-button');
const popupContainer = document.getElementById('popup-container');
const notificationContainer = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll('.figure-part');
const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLettersArray = [];

const displayWord = () => {
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
            <span class="letter">
                ${ correctLetters.includes(letter) ? letter : '' }
            </span>`
        ).join('')
    }`;
    const innerWord = word.innerText.replace(/\n/g, '');
    if(innerWord ===selectedWord) {
        finalMessage.innerText = 'Congratulations! You won!';
        popupContainer.style.display = 'flex';
    }
};

const showWrongLetters = () => {
    wrongLetters.innerHTML = `
        ${wrongLettersArray.length>0 ? '<p>Wrong</p>' : ''}
        ${wrongLettersArray.map(letter => `<span>${letter}</span>`)}
    `;

    figureParts.forEach((part, index) => {
        const errors = wrongLettersArray.length;
        if(index<errors) {
            part.style.display = 'block';
        }else {
            part.style.display = 'none';
        }
    });

    if(wrongLettersArray.length===figureParts.length) {
        finalMessage.innerText = `Unfortunately you lost.`;
        popupContainer.style.display = 'flex';
    }
};

const showNotification = () => {
    notificationContainer.classList.add('show');

    setTimeout(() => notificationContainer.classList.remove('show'), 1500);
};

window.addEventListener('keydown', e => {
    if(e.keyCode>=65 && e.keyCode<=90) {
        const letter = e.key;
        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLettersArray.includes(letter)) {
                wrongLettersArray.push(letter);
                showWrongLetters();
            } else {
                showNotification();
            }
        }

    }
});

playButton.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLettersArray.splice(0);
    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord();
    showWrongLetters();
    popupContainer.style.display = 'none';
});

displayWord();