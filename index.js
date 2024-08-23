document.addEventListener('DOMContentLoaded', loadStudents);

function registerStudent() {

    // Get values from the input fields and trim any extra spaces
    const name = document.getElementById('name').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();

    // Validate input fields
    if (!name || !studentId || !email || !contact) {
        alert('Please fill in all fields.');
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert('Student name should only contain characters.');
        return;
    }

    if (!/^\d+$/.test(studentId)) {
        alert('Student ID should only contain numbers.');
        return;
    }

    if (!/^\d{10}$/.test(contact)) {
        alert('Contact number should be exactly 10 digits.');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Invalid email address.');
        return;
    }

    // Create new student record
    const student = {
        name,
        studentId,
        email,
        contact
    };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    displayStudents();
    document.getElementById('registrationForm').reset();
}

function displayStudents() {
    const tableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    let students = JSON.parse(localStorage.getItem('students')) || [];

    students.forEach((student, index) => {
        let row = tableBody.insertRow();
        row.insertCell(0).textContent = student.name;
        row.insertCell(1).textContent = student.studentId;
        row.insertCell(2).textContent = student.email;
        row.insertCell(3).textContent = student.contact;

        // Add Edit button
        let actionsCell = row.insertCell(4);
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editStudent(index);
        actionsCell.appendChild(editButton);

        // Add Delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteStudent(index);
        actionsCell.appendChild(deleteButton);
    });

    // Updating scrollbar visibility based on the number of students
    const studentList = document.querySelector('.student-list');
    if (students.length > 5) {
        studentList.style.overflowY = 'auto'; // Show scrollbar
    } else {
        studentList.style.overflowY = 'hidden'; // Hide scrollbar
    }
}

function editStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let student = students[index];

    document.getElementById('name').value = student.name;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('email').value = student.email;
    document.getElementById('contact').value = student.contact;

    // Updating record form upon submission
    document.getElementById('registrationForm').onsubmit = function() {
        students[index] = {
            name: document.getElementById('name').value.trim(),
            studentId: document.getElementById('studentId').value.trim(),
            email: document.getElementById('email').value.trim(),
            contact: document.getElementById('contact').value.trim()
        };
        localStorage.setItem('students', JSON.stringify(students));
        displayStudents();
        document.getElementById('registrationForm').reset();
        return false;
    };
}

function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}



function loadStudents() {
    displayStudents();
}

