const form = document.getElementById('form'); 
const username = document.getElementById('username'); 
const email = document.getElementById('email'); 
const password = document.getElementById('password'); 
const confirmPassword = document.getElementById('confirm-password'); 

// Show input error message
function showError(input, message) {
  const inputParent = input.parentElement; 
  inputParent.className = 'form-control error';
  const small = inputParent.querySelector('small'); 
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  const inputParent = input.parentElement; 
  inputParent.className = 'form-control success';
}

// This returns the input element id with first letter in uppercase
function getNameField(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkRequired(inputArray) {
  inputArray.forEach(input => {
    if (input.value.trim() === '') {
      // showError(input, `${input.id} is required`);
      showError(input, `${getNameField(input)} is required`);      
    } else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getNameField(input)} must be at least ${min} characters`);  
  } else if (input.value.length > max) {
    showError(input, `${getNameField(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkPassword(inputArr) {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  inputArr.forEach(input => {
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, `${getNameField(input)} is not valid`);
    }
  });
}

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, 'Passwords do not match');
  }
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 6, 15);
  checkEmail(email);
  checkPassword([password, confirmPassword]);
  checkPasswordMatch(password, confirmPassword);
});