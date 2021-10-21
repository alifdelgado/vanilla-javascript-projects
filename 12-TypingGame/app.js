const word = document.getElementById('word');
const text = document.getElementById('text');
const score = document.getElementById('score');
const time = document.getElementById('time');
const endGame = document.getElementById('end-game-container');
const settings = document.getElementById('settings');
const difficulty = document.getElementById('difficulty');
const settingsBtn = document.getElementById('settings-btn');
const settingsForm = document.getElementById('settings-form');

const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];
let randomWord;
let userScore = 0;
let gameTime = 10;
let difficultyOption = localStorage.getItem('difficulty') || 'medium';

text.focus();

const gameOver = () => {
    endGame.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score  is ${userScore}</p>
        <button type="button" onclick="location.reload();">Reload</button>
    `;
    endGame.style.display = 'flex';
};

const updateTime = () => {
    gameTime--;
    time.innerHTML = `${gameTime}s`;
    if(gameTime===0) {
        clearInterval(timeInterval);
        gameOver();
    }
};

const timeInterval = setInterval(updateTime, 1000);

const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
};

const updateScore = () => {
    userScore++;
    score.innerHTML = userScore;
};

const addWordToDom = () => {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
};

addWordToDom();

text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if(insertedText===randomWord) {
        addWordToDom();
        updateScore();
        e.target.value = '';
        if(difficultyOption==='hard') {
            gameTime += 2;
        } else if(difficultyOption==='medium') {
            gameTime += 3;
        } else {
            gameTime += 5;
        }
    }
    updateTime();
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

settingsForm.addEventListener('change', e => {
    difficultyOption = e.target.value;
    localStorage.setItem('difficulty', difficultyOption);
});