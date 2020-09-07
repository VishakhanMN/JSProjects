const currencyOne = document.getElementById('currency-one');
const amountOne = document.getElementById('amount-one');
const currencyTwo = document.getElementById('currency-two');
const amountTwo = document.getElementById('amount-two');
const swapVariable = document.getElementById('swap');


function calculate() {
    const curr1Value = currencyOne.value;
    const curr2Value = currencyTwo.value;

    // fetch(`https://api.exchangeratesapi.io/latest`)
    fetch(`https://api.exchangeratesapi.io/latest?base=${curr1Value}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.rates[curr2Value];
            amountTwo.value = (amountOne.value * rate).toFixed(2);
            document.getElementById('rate').innerText = `1 ${curr1Value} = ${rate} ${curr2Value}`
        })
}

function swapVariables() {
    let tempVariable = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = tempVariable;
    calculate();
}

currencyOne.addEventListener('change', calculate);
amountOne.addEventListener('input', calculate);
currencyTwo.addEventListener('change', calculate);
amountTwo.addEventListener('input', calculate);
swapVariable.addEventListener('click', swapVariables);
calculate();