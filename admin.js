let users = [
    { id: 1, name: 'mostafa', email: 'mostafa@example.com', password: 'password123' },
    { id: 2, name: 'yassin', email: 'yassin@example.com', password: 'password456' }
];

let appointments = [
    { id: 1, user: 'mostafa', date: '2024-08-03' },
    { id: 2, user: 'yassin', date: '2024-08-10' }
];

let cars = [
    { id: 1, make: 'Toyota', model: 'Corolla', year: 2020 },
    { id: 2, make: 'Honda', model: 'Civic', year: 2019 }
];

let selectedAppointmentId = null;
let selectedCarId = null;
let selectedUserId = null;
let currentSearchCategory = '';

function showTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabName).style.display = 'block';

    document.getElementById('searchModal').style.display = 'none';
    document.getElementById('searchQuery').value = '';

    if (tabName === 'users') {
        renderUsers();
    } else if (tabName === 'appointments') {
        renderAppointments();
    } else if (tabName === 'cars') {
        renderCars();
    }
}

function renderUsers(filteredUsers = users) {
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderAppointments(filteredAppointments = appointments) {
    const tbody = document.querySelector('#appointmentsTable tbody');
    tbody.innerHTML = '';
    filteredAppointments.forEach(appointment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.id}</td>
            <td>${appointment.user}</td>
            <td>${appointment.date}</td>
            <td>
                <button onclick="openAppointmentModal(${appointment.id})">Edit</button>
                <button class="delete" onclick="deleteAppointment(${appointment.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderCars(filteredCars = cars) {
    const tbody = document.querySelector('#carsTable tbody');
    tbody.innerHTML = '';
    filteredCars.forEach(car => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${car.id}</td>
            <td>${car.make}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td>
                <button onclick="openCarModal(${car.id})">Edit</button>
                <button class="delete" onclick="deleteCar(${car.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openSearchModal(category) {
    currentSearchCategory = category;
    document.getElementById('searchModal').style.display = 'block';
}

function performSearch() {
    const query = document.getElementById('searchQuery').value.toLowerCase();
    
    if (currentSearchCategory === 'users') {
        const filteredUsers = users.filter(user => 
            user.name.toLowerCase().includes(query) || 
            user.email.toLowerCase().includes(query) || 
            user.password.toLowerCase().includes(query)
        );
        renderUsers(filteredUsers);
    } else if (currentSearchCategory === 'appointments') {
        const filteredAppointments = appointments.filter(app => 
            app.user.toLowerCase().includes(query) || 
            app.date.toLowerCase().includes(query)
        );
        renderAppointments(filteredAppointments);
    } else if (currentSearchCategory === 'cars') {
        const filteredCars = cars.filter(car => 
            car.make.toLowerCase().includes(query) || 
            car.model.toLowerCase().includes(query) || 
            car.year.toString().includes(query)
        );
        renderCars(filteredCars);
    }
    closeModal('searchModal');
}

function openUserModal() {
    selectedUserId = null;
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userPassword').value = '';
    document.getElementById('userModal').style.display = 'block';
}

function saveUser() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value.trim();
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return;
    }
    
    if (selectedUserId) {
        const user = users.find(user => user.id === selectedUserId);
        if (user) {
            user.name = name;
            user.email = email;
            user.password = password;
        }
    } else {
        
        const id = users.length ? users[users.length - 1].id + 1 : 1;
        users.push({ id, name, email, password });
    }
    
    closeModal('userModal');
    renderUsers();
}

function editUser(id) {
    selectedUserId = id;
    const user = users.find(user => user.id === id);
    if (user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userPassword').value = user.password;
        openUserModal();
    }
}

function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderUsers();
}

function openAppointmentModal(id = null) {
    selectedAppointmentId = id;
    const modal = document.getElementById('appointmentModal');
    if (id) {
        const appointment = appointments.find(app => app.id === id);
        document.getElementById('appointmentUser').value = appointment.user;
        document.getElementById('appointmentDate').value = appointment.date;
    } else {
        document.getElementById('appointmentUser').value = '';
        document.getElementById('appointmentDate').value = '';
    }
    modal.style.display = 'block';
}

function saveAppointment() {
    const user = document.getElementById('appointmentUser').value;
    const date = document.getElementById('appointmentDate').value;
    if (selectedAppointmentId) {
        const appointment = appointments.find(app => app.id === selectedAppointmentId);
        appointment.user = user;
        appointment.date = date;
    } else {
        const id = appointments.length ? appointments[appointments.length - 1].id + 1 : 1;
        appointments.push({ id, user, date });
    }
    closeModal('appointmentModal');
    renderAppointments();
}

function deleteAppointment(id) {
    appointments = appointments.filter(app => app.id !== id);
    renderAppointments();
}

function openCarModal(id = null) {
    selectedCarId = id;
    const modal = document.getElementById('carModal');
    if (id) {
        const car = cars.find(c => c.id === id);
        document.getElementById('carMake').value = car.make;
        document.getElementById('carModel').value = car.model;
        document.getElementById('carYear').value = car.year;
    } else {
        document.getElementById('carMake').value = '';
        document.getElementById('carModel').value = '';
        document.getElementById('carYear').value = '';
    }
    modal.style.display = 'block';
}

function saveCar() {
    const make = document.getElementById('carMake').value;
    const model = document.getElementById('carModel').value;
    const year = document.getElementById('carYear').value;
    if (selectedCarId) {
        const car = cars.find(c => c.id === selectedCarId);
        car.make = make;
        car.model = model;
        car.year = year;
    } else {
        const id = cars.length ? cars[cars.length - 1].id + 1 : 1;
        cars.push({ id, make, model, year });
    }
    closeModal('carModal');
    renderCars();
}

function deleteCar(id) {
    cars = cars.filter(car => car.id !== id);
    renderCars();
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    renderUsers();
    renderAppointments();
    renderCars();
})