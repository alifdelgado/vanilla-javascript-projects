const cardsContainer = document.getElementById('cards-container');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const currentElement = document.getElementById('current');
const showButton = document.getElementById('show');
const hideButton = document.getElementById('hide');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer');
const addCardButton = document.getElementById('add-card');
const clearButton = document.getElementById('clear');
const addContainerButton = document.getElementById('add-container');

let currentActiveCard = 0;

const cardsElements = [];

const getCardsData = () => {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards ?? [];
};

const cardsData = getCardsData();

// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive Variable',
//         answer: 'thisIsAVariable'
//     }
// ];

const updateCurrentText = () => {
    currentElement.innerText = `${currentActiveCard + 1} / ${cardsElements.length}`;
};

const createCard = (data, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    if(index===0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    cardsElements.push(card);
    cardsContainer.appendChild(card);
    updateCurrentText();
};

const createCards = () => {
    cardsData.forEach((data, index) => createCard(data, index));
};

const setCardsData = (cards) => {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
};

createCards();

nextButton.addEventListener('click', () => {
    cardsElements[currentActiveCard].className = 'card left';
    currentActiveCard = currentActiveCard + 1;
    if(currentActiveCard > (cardsElements.length - 1)) {
        currentActiveCard = cardsElements - 1;
    }
    cardsElements[currentActiveCard].className = 'card active';
    updateCurrentText();
});

prevButton.addEventListener('click', () => {
    cardsElements[currentActiveCard].className = 'card right';
    currentActiveCard = currentActiveCard - 1;
    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }
    cardsElements[currentActiveCard].className = 'card active';
    updateCurrentText();
});

showButton.addEventListener('click', () => addContainerButton.classList.add('show'));
hideButton.addEventListener('click', () => addContainerButton.classList.remove('show'));
addCardButton.addEventListener('click', () => {
    const question = questionElement.value;
    const answer = answerElement.value;
    console.log({question, answer});
    if(question.trim() && answer.trim()) {
        const newCard = { question, answer };
        createCard(newCard);
        questionElement.value = '';
        answerElement.value = '';
        addContainerButton.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

clearButton.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});