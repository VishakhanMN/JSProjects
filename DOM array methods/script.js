const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaireBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

//fetch user and money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 10000000)
    }
    addNewUser(newUser);
}

function addNewUser(value) {
    data.push(value);
    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
    data = data.map(item => {
        return { ...item, money: item.money * 2 };
    })

    updateDOM();
}

function sortInOrder() {
    data = data.sort((a, b) => {
        return b.money - a.money
    })
    updateDOM();
}

function showMillionare() {
    data = data.filter(item => {
        return item.money > 1000000
    });

    updateDOM()
}

function calculateWealth() {
    const wealth = data.reduce((acc, item) =>
        acc += item.money, 0
    );

    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3><strong>Total Wealth:${formatMoney(wealth)} </strong></h3>`;
    main.appendChild(wealthEl);
    // updateDOM();
}

// event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortInOrder);
showMillionaireBtn.addEventListener('click', showMillionare);
calculateWealthBtn.addEventListener('click', calculateWealth);