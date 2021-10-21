const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

const showError = (input, message, addFieldname = true) => {
    const formControl = input.parentElement;
    const small = formControl.getElementsByTagName('small')[0];
    const label = formControl.getElementsByTagName('label')[0];
    formControl.classList.add('error');
    small.innerText = addFieldname ? `${label.textContent} ${message}` : `${message}`;
    if(formControl.classList.contains('success')) {
        formControl.classList.remove('success');
    }
};

const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add('success');
    if(formControl.classList.contains('error')) {
        formControl.classList.remove('error');
    }
};

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email.value.trim()).toLowerCase())) {
        showSuccess(email);
    } else {
        showError(email, 'the email is not valid');
    }
};

const checkRequired = (inputArray) => {
    inputArray.forEach((input) => {
        if(input.value.trim()==='') {
            showError(input, 'is required');
        } else {
            showSuccess(input);
        }
    });
};

const checkLength = (input, min, max) => {
    if(input.value.length<min || input.value.length>max) {
        showError(input, ` must be at least least ${min} or less than ${max} characters`);
    } else {
        showSuccess(input);
    }
};

const checkPasswordsMatch = (password, confirmPassword) => {
    if(password !== confirmPassword) {
        showError(confirmPassword, 'Passwords do not match', false);
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkRequired([username, email, password, confirmPassword]);
    validateEmail(email);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkPasswordsMatch(password, confirmPassword);
});