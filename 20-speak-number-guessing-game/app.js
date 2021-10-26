const msgElement = document.getElementById('msg');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

const getRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
};

const randomNum = getRandomNumber();

const writeMessage = (msg) => {
    msgElement.innerHTML = `
        <div>You said:</div>
        <span class="box">${msg}</span>
    `;
};

const checkNumber = (msg) => {
    const num = +msg;
    if(!Number.isInteger(num)) {
        msgElement.innerHTML += "<div>That is not a valid number</div>";
        return;
    }

    if(num>100 || num<1) {
        msgElement.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    if(num === randomNum) {
        document.body.innerHTML = `
            <h2>Congrats! You have guessed the number!<br><br>It was ${num}</h2>
            <button type="button" class="play-again" id="play-again">Play again</button>
        `;
    } else if(num > randomNum) {
        msgElement.innerHTML += '<div>GO LOWER</div>';
    } else {
        msgElement.innerHTML += '<div>GO HIGHER</div>';
    }
};

const onSpeak = (e) => {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
};

recognition.addEventListener('result', onSpeak);
recognition.addEventListener('end', () => recognition.start());
document.body.addEventListener('click', () => {
    if(e.target.id == 'play-again') {
        window.location.reload();
    }
});