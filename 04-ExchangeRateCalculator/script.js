const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const rate = document.getElementById('rate');
const swap = document.getElementById('swap');

const calculate = () => {
    const currencyTempOne = currencyOne.value;
    const currencyTempTwo = currencyTwo.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${currencyTempOne}`)
            .then(response => response.json())
            .then(data => {
                const responseRate = data.rates[currencyTempTwo];
                rate.innerText = `1 ${currencyTempOne} = ${responseRate} ${currencyTempTwo}`;
                amountTwo.value = (+amountOne.value * responseRate).toFixed(2);
            }).catch(error => console.log(error));
};

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);
swap.addEventListener('click', calculate);
