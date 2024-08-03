window.onload = function () {
    localStorage.removeItem('loggedIn');
}

function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if (i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

var a = document.getElementById("loginBtn");
var b = document.getElementById("registerBtn");
var x = document.getElementById("login");
var y = document.getElementById("register");

function login() {
    x.style.left = "4px";
    y.style.right = "-520px";
    a.className += " white-btn";
    b.className = "btn";
    x.style.opacity = 1;
    y.style.opacity = 0;
}

function register() {
    x.style.left = "-510px";
    y.style.right = "5px";
    a.className = "btn";
    b.className += " white-btn";
    x.style.opacity = 0;
    y.style.opacity = 1;
}

function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validateName(name) {
    const re = /^[a-zA-Z]+$/;
    return re.test(name);
}

function login_validation() {
    const email = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    if (email === "admin123@gmail.com" && password === "admin123") {
        window.location.href = 'admin.html';
        return;
    } else if (email === "yahia@gmail.com" && password === "12345678") {
        alert("Login successful for Yahia!");
        return;
    }
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'home.html';
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const loginUsernameError = document.getElementById('loginUsernameError');
    const loginPasswordError = document.getElementById('loginPasswordError');

    loginUsernameError.textContent = ''; 
    loginPasswordError.textContent = ''; 

    if (!validateEmail(email)) {
        loginUsernameError.textContent = 'Please enter a valid email address.';
        return;
    }

    if (password.length < 8) {
        loginPasswordError.textContent = 'Password must be at least 8 characters long.';
        return;
    }

    
    login_validation();
});

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const firstname = document.getElementById('registerFirstname').value;
    const lastname = document.getElementById('registerLastname').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const registerFirstnameError = document.getElementById('registerFirstnameError');
    const registerLastnameError = document.getElementById('registerLastnameError');
    const registerEmailError = document.getElementById('registerEmailError');
    const registerPasswordError = document.getElementById('registerPasswordError');

    registerFirstnameError.textContent = ''; 
    registerLastnameError.textContent = ''; 
    registerEmailError.textContent = ''; 
    registerPasswordError.textContent = ''; 

    if (!validateName(firstname)) {
        registerFirstnameError.textContent = 'Firstname cant be numbers.';
        return;
    }

    if (!validateName(lastname)) {
        registerLastnameError.textContent = 'Lastname cant be numbers.';
        return;
    }

    if (!validateEmail(email)) {
        registerEmailError.textContent = 'Please enter a valid email address.';
        return;
    }

    if (password.length < 8) {
        registerPasswordError.textContent = 'Password must be at least 8 characters long.';
        return;
    }

  
    localStorage.setItem('loggedIn', 'true');
    window.location.href = 'home.html';
});

document.getElementById('bookNowBtn').addEventListener('click', function (event) {
    if (!localStorage.getItem('loggedIn')) {
        alert('You must be logged in to book now.');
        event.preventDefault();
    }
});