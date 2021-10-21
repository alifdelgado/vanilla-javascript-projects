const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const doubleMoney = document.getElementById('double-money');
const showMillionaires = document.getElementById('show-millionaires');
const sortRichest = document.getElementById('sort-richest');
const calculateWealth = document.getElementById('calculate-wealth');

let data = [];

const formatMoney = (number) => {
    return (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const updateDOM = () => {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    data.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>$ ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
};

const addData = (userObject) => {
    data.push(userObject);
    updateDOM();
};

const getRandomUser = async () => {
    const response = await fetch('https://randomuser.me/api');
    const responseData = await response.json();
    const user = responseData.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
};

const doubleMoneyUser = () => {
    data = data.map(item => {
        return{...item, money: item.money*2};
    });
    updateDOM();
};

const sortByRichest = () => {
    data = data.sort((a,b) => b.money - a.money);
    updateDOM();
};

const showOnlyMillionaires = () => {
    data = data.filter(item => item.money>1000000);
    updateDOM();
};

const calculateUserWealth = () => {
    const wealth = data.reduce((acc,user) => (acc += user.money), 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>$ ${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
};

addUser.addEventListener('click', getRandomUser);
doubleMoney.addEventListener('click', doubleMoneyUser);
sortRichest.addEventListener('click', sortByRichest);
showMillionaires.addEventListener('click', showOnlyMillionaires);
calculateWealth.addEventListener('click', calculateUserWealth);