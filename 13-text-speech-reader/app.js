const main = document.getElementById('main');
const voices = document.getElementById('voices');
const textArea = document.getElementById('text');
const read = document.getElementById('read');
const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
];

const createBox = (item) => {
    const box = document.createElement('div');
    const { image, text } = item;
    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}">
        <p class="info">${text}</p>
    `;
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });
    main.appendChild(box);
};

data.forEach(createBox);

let voicesArray = [];
const speechSynthesis = window.speechSynthesis;

const getVoices = () => {
    voicesArray = speechSynthesis.getVoices();
    voicesArray.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voices.appendChild(option);
    });
};

speechSynthesis.addEventListener('voiceschanged', getVoices);


toggle.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));
close.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

getVoices();