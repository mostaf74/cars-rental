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
        window.location.href = '/admin.ejs';
        return;
    } else if (email === "yahia@gmail.com" && password === "12345678") {
        alert('Invalid email or password');
        return;
    }
    localStorage.setItem('loggedIn', 'true');
    //  window.location.href = 'home.ejs';
}

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
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

    if (!validateName(firstname)) {
        alert('Firstname can\'t be numbers.');
        return;
    }

    if (!validateName(lastname)) {
        alert('Lastname can\'t be numbers.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }

    localStorage.setItem('loggedIn', 'true');
    window.location.href = '/home.ejs';
});

document.getElementById('bookNowBtn').addEventListener('click', function (event) {
    if (!localStorage.getItem('loggedIn')) {
        alert('You must be logged in to book now.');
        event.preventDefault();
    }
});
