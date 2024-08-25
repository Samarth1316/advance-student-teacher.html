// Global Variables
let teachers = [];
let appointments = [];
let currentTeacher = null;
let currentStudent = null;

// Admin Functions
function addTeacher(teacher) {
  teachers.push(teacher);
  displayTeachers();
}

function displayTeachers() {
  const teacherList = document.getElementById("teacher-list");
  teacherList.innerHTML = "";
  teachers.forEach((teacher) => {
    const teacherHTML = `
      <li>
        <h2>${teacher.name}</h2>
        <p>${teacher.email}</p>
        <button class="btn btn-danger" onclick="deleteTeacher('${teacher.email}')">Delete</button>
      </li>
    `;
    teacherList.innerHTML += teacherHTML;
  });
}

function deleteTeacher(email) {
  const index = teachers.findIndex((teacher) => teacher.email === email);
  if (index !== -1) {
    teachers.splice(index, 1);
    displayTeachers();
  }
}

// Teacher Functions
function loginTeacher(email, password) {
  const teacher = teachers.find((teacher) => teacher.email === email && teacher.password === password);
  if (teacher) {
    currentTeacher = teacher;
    displayTeacherDashboard();
  } else {
    alert("Invalid email or password");
  }
}

function displayTeacherDashboard() {
  const teacherDashboard = document.getElementById("teacher-dashboard");
  teacherDashboard.innerHTML = `
    <h1>Welcome, ${currentTeacher.name}!</h1>
    <p>Your schedule:</p>
    <ul id="appointment-list"></ul>
    <button class="btn btn-primary" onclick="logoutTeacher()">Logout</button>
  `;
  displayAppointments();
}

function logoutTeacher() {
  currentTeacher = null;
  displayLogin();
}

function displayAppointments() {
  const appointmentList = document.getElementById("appointment-list");
  appointmentList.innerHTML = "";
  appointments.forEach((appointment) => {
    if (appointment.teacherEmail === currentTeacher.email) {
      const appointmentHTML = `
        <li>
          <h2>${appointment.studentName}</h2>
          <p>${appointment.date} at ${appointment.time}</p>
        </li>
      `;
      appointmentList.innerHTML += appointmentHTML;
    }
  });
}

// Student Functions
function registerStudent(student) {
  // TO DO: Add student to database
  alert("Student registered successfully!");
}

function loginStudent(email, password) {
  // TO DO: Check student credentials in database
  currentStudent = { email, password };
  displayStudentDashboard();
}

function displayStudentDashboard() {
  const studentDashboard = document.getElementById("student-dashboard");
  studentDashboard.innerHTML = `
    <h1>Welcome, ${currentStudent.email}!</h1>
    <p>Search for a teacher:</p>
    <form id="search-teacher-form">
      <input type="text" id="search-teacher-input" placeholder="Teacher name or email">
      <button class="btn btn-primary" onclick="searchTeachers()">Search</button>
    </form>
    <button class="btn btn-primary" onclick="logoutStudent()">Logout</button>
  `;
}

function logoutStudent() {
  currentStudent = null;
  displayLogin();
}

function searchTeachers() {
  const searchInput = document.getElementById("search-teacher-input");
  const searchQuery = searchInput.value.trim();
  const matchingTeachers = teachers.filter((teacher) => {
    return teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || teacher.email.toLowerCase().includes(searchQuery.toLowerCase());
  });
  displaySearchResults(matchingTeachers);
}

function displaySearchResults(teachers) {
  const searchResults = document.getElementById("search-results");
  searchResults.innerHTML = "";
  teachers.forEach((teacher) => {
    const teacherHTML = `
      <li>
        <h2>${teacher.name}</h2>
        <p>${teacher.email}</p>
        <button class="btn btn-primary" onclick="bookAppointment('${teacher.email}')">Book Appointment</button>
      </li>
    `;
    searchResults.innerHTML += teacherHTML;
  });
}

function bookAppointment(teacherEmail) {
  const appointment = {
    studentName: currentStudent.email,
    teacherEmail,
    date: "2023-03-15",
    time: "10:00 AM",
  };
  appointments.push(appointment);
  displayAppointmentConfirmation(appointment);
}

function displayAppointmentConfirmation(appointment) {
  const appointmentConfirmation = document.getElementById("appointment-confirmation");
  appointmentConfirmation.innerHTML = `
    <h1>Appointment booked successfully!</h1>
    <p>Teacher: ${appointment.teacherEmail}</p>
    <p>Date: ${appointment.date}</p>
    <p>Time: ${appointment.time}</p>
  `;
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  displayLogin();
});

document.getElementById("add-teacher-form").addEventListener("submit", (e) => {
  e.preventDefault();