// Show selected tab content
function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabName).style.display = 'block';
}

// Open modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Validations
function validateUser() {
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!name) {
        alert('Please enter the user\'s name.');
        return false;
    }
    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (!phone || !phoneRegex.test(phone)) {
        alert('Please enter a valid phone number (10-15 digits).');
        return false;
    }
    return true;
}

function validateAppointment() {
    const user = document.getElementById('appointmentUser').value.trim();
    const carModel = document.getElementById('appointmentCarModel').value.trim();
    const date = document.getElementById('appointmentDate').value;

    if (!user) {
        alert('Please enter the user\'s name.');
        return false;
    }
    if (!carModel) {
        alert('Please enter the car model.');
        return false;
    }
    if (!date) {
        alert('Please select a date.');
        return false;
    }
    return true;
}

function validateCar() {
    const make = document.getElementById('carMake').value.trim();
    const model = document.getElementById('carModel').value.trim();
    const year = document.getElementById('carPrice').value;
    const image = document.getElementById('carImage').files[0];

    if (!make) {
        alert('Please enter the car make.');
        return false;
    }
    if (!model) {
        alert('Please enter the car model.');
        return false;
    }
    
    if (!image) {
        alert('Please upload a car image.');
        return false;
    }
    return true;
}

function validateAdmin() {
    const name = document.getElementById('adminName').value.trim();
    const email = document.getElementById('adminEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
        alert('Please enter the admin\'s name.');
        return false;
    }
    if (!email || !emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    return true;
}

// Save functions
function saveUser() {
    if (!validateUser()) return;
    const userTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const newRow = userTable.insertRow();
    const idCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);
    const phoneCell = newRow.insertCell(3);
    const actionCell = newRow.insertCell(4);

    idCell.innerHTML = userTable.rows.length;
    nameCell.innerHTML = document.getElementById('userName').value.trim();
    emailCell.innerHTML = document.getElementById('userEmail').value.trim();
    phoneCell.innerHTML = document.getElementById('userPhone').value.trim();
    actionCell.innerHTML = '<button onclick="editUser(this)">Edit</button> <button onclick="deleteUser(this)">Delete</button>';

    closeModal('userModal');
}

function saveAppointment() {
    if (!validateAppointment()) return;
    const user = document.getElementById('appointmentUser').value.trim();
    const carModel = document.getElementById('appointmentCarModel').value.trim();
    const date = document.getElementById('appointmentDate').value;

    const table = document.getElementById('appointmentsTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const idCell = newRow.insertCell(0);
    const userCell = newRow.insertCell(1);
    const carModelCell = newRow.insertCell(2);
    const dateCell = newRow.insertCell(3);
    const actionsCell = newRow.insertCell(4);

    idCell.innerText = generateId();
    userCell.innerText = user;
    carModelCell.innerText = carModel;
    dateCell.innerText = date;
    actionsCell.innerHTML = '<button onclick="editAppointment(this)">Edit</button> <button onclick="deleteAppointment(this)">Delete</button>';

    closeModal('appointmentModal');
}

function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

function saveCar() {
    if (!validateCar()) return;
    const carTable = document.getElementById('carsTable');
    const newCard = document.createElement('div');
    newCard.classList.add('car-card');
    newCard.setAttribute('data-name', document.getElementById('carMake').value.trim() + ' ' + document.getElementById('carModel').value.trim());
    newCard.setAttribute('data-price', '0'); // Set default price to 0, update as needed

    const reader = new FileReader();
    reader.onload = function (e) {
        newCard.innerHTML = `
            <img src="${e.target.result}" alt="${document.getElementById('carMake').value.trim()} ${document.getElementById('carModel').value.trim()}">
            <h3>${document.getElementById('carMake').value.trim()} ${document.getElementById('carModel').value.trim()}</h3>
            <p>Newly added car.</p>
            <div class="price">$0 / day</div>
            <a href="#" class="btn-primary">View Details</a>
        `;
        carTable.appendChild(newCard);
    }
    reader.readAsDataURL(document.getElementById('carImage').files[0]);

    closeModal('carModal');
}

function saveAdmin() {
    if (!validateAdmin()) return;
    const adminTable = document.getElementById('adminsTable').getElementsByTagName('tbody')[0];
    const newRow = adminTable.insertRow();
    const idCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const emailCell = newRow.insertCell(2);
    const actionCell = newRow.insertCell(3);

    idCell.innerHTML = adminTable.rows.length;
    nameCell.innerHTML = document.getElementById('adminName').value.trim();
    emailCell.innerHTML = document.getElementById('adminEmail').value.trim();
    actionCell.innerHTML = '<button onclick="editAdmin(this)">Edit</button> <button onclick="deleteAdmin(this)">Delete</button>';

    closeModal('adminModal');
}

// Edit and Delete functions
function editUser(button) {
    const row = button.parentElement.parentElement;
    document.getElementById('userName').value = row.cells[1].innerText;
    document.getElementById('userEmail').value = row.cells[2].innerText;
    document.getElementById('userPhone').value = row.cells[3].innerText;
    openModal('userModal');
    // Note: We do not delete the row here; you may want to provide a specific way to mark it as edited.
}

function deleteUser(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function editAppointment(button) {
    const row = button.parentElement.parentElement;
    document.getElementById('appointmentUser').value = row.cells[1].innerText;
    document.getElementById('appointmentCarModel').value = row.cells[2].innerText;
    document.getElementById('appointmentDate').value = row.cells[3].innerText;
    openModal('appointmentModal');
    // Note: We do not delete the row here; you may want to provide a specific way to mark it as edited.
}

function deleteAppointment(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function editCar(button) {
    const row = button.parentElement.parentElement;
    document.getElementById('carMake').value = row.cells[1].innerText;
    document.getElementById('carModel').value = row.cells[2].innerText;
    document.getElementById('carPrice').value = row.cells[3].innerText;
    openModal('carModal');
    // Note: We do not delete the row here; you may want to provide a specific way to mark it as edited.
}

function deleteCar(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

function editAdmin(button) {
    const row = button.parentElement.parentElement;
    document.getElementById('adminName').value = row.cells[1].innerText;
    document.getElementById('adminEmail').value = row.cells[2].innerText;
    openModal('adminModal');
    // Note: We do not delete the row here; you may want to provide a specific way to mark it as edited.
}

function deleteAdmin(button) {
    const row = button.parentElement.parentElement;
    row.remove();
}

// Search functionality
function performSearch() {
    const query = document.getElementById('searchQuery').value.trim().toLowerCase();
    const activeTab = document.querySelector('.tab-content:not([style*="display: none"]) table tbody');
    const rows = activeTab.getElementsByTagName('tr');
    let found = false;

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let rowMatches = false;

        for (let j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toLowerCase().includes(query)) {
                rowMatches = true;
                break;
            }
        }

        if (rowMatches) {
            rows[i].style.display = '';
            found = true;
        } else {
            rows[i].style.display = 'none';
        }
    }

    if (!found) {
        alert('No results found for "' + query + '".');
    }

    closeModal('searchModal');
}

// Modal open functions with content reset
function openUserModal() {
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
    document.getElementById('userPhone').value = '';
    openModal('userModal');
}

function openAppointmentModal() {
    document.getElementById('appointmentUser').value = '';
    document.getElementById('appointmentCarModel').value = '';
    document.getElementById('appointmentDate').value = '';
    openModal('appointmentModal');
}

function openCarModal() {
    document.getElementById('carMake').value = '';
    document.getElementById('carModel').value = '';
    document.getElementById('carPrice').value = '';
    document.getElementById('carImage').value = ''; // Reset the file input
    openModal('carModal');
}

function openAdminModal() {
    document.getElementById('adminName').value = '';
    document.getElementById('adminEmail').value = '';
    openModal('adminModal');
}

function openSearchModal() {
    document.getElementById('searchQuery').value = '';
    openModal('searchModal');
}
