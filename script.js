const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

function showError(value, message) {
    const parentElement = value.parentElement;
    parentElement.className = 'form-control error';
    const small = parentElement.querySelector('small');
    small.innerText = message
}

function showSuccess(value) {
    const parentElement = value.parentElement;
    parentElement.className = 'form-control success';
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email.value).toLowerCase())) {
        showSuccess(email);
    }
    else
        showError(email, `${getUpperCase(email)} is in invalid format`)
}

function checkRequiredFields(inputArr) {
    inputArr.forEach(function (item) {
        if (item.value.trim() == '') {
            showError(item, `${getUpperCase(item)} is required`)
        }
        else
            showSuccess(item)
    })
}

function getUpperCase(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequiredLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getUpperCase(input)} must be at least ${min} characters`)
    }
    else if (input.value.length > max) {
        showError(input, `${getUpperCase(input)} must not exceed ${max} characters`)
    }
    else
        showSuccess(input)
}

function checkSamePassword(item1, item2) {
    if (item1.value != item2.value) {
        showError(item2, `${getUpperCase(item2)} must be same as ${getUpperCase(item1)}`);
    }
    else {
        showSuccess(item2);
    }
}


document.addEventListener('submit', function (e) {
    e.preventDefault();           // prevents from submitting
    checkRequiredFields([username, email, password, confirmPassword]);
    checkRequiredLength(username, 3, 15);
    checkRequiredLength(password, 6, 25);
    isValidEmail(email);
    checkSamePassword(password, confirmPassword);
})