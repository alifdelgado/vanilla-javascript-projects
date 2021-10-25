const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');
const listItems = [];

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michel Bloomberg',
    'Larry Page'
];

let dragStartIndex;

const swapItems = (fromIndex, toIndex) => {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
};

const checkOrder = () => {
    listItems.forEach((item, index) => {
        const personName = item.querySelector('.draggable').innerText.trim();
        if(personName !== richestPeople[index]) {
            item.classList.add('wrong');
        } else {
            item.classList.remove('wrong');
            item.classList.add('right');
        }
    });
};

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e){
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

const addEventListeners = () => {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
};

check.addEventListener('click', checkOrder);

const createList = () => {
    [...richestPeople]
        .map(a => ({value: a, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
        const listItem = document.createElement('li');
        listItem.setAttribute('data-index', index);
        listItem.innerHTML = `
            <span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;
        listItems.push(listItem);
        draggableList.appendChild(listItem);
    });
    addEventListeners();
};

createList();