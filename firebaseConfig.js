import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = getAuth(app);

// Teachers collection
const teachersCollection = collection(db, 'teachers');

// Appointments collection
const appointmentsCollection = collection(db, 'appointments');

// Functions
async function addTeacher(teacher) {
  try {
    const docRef = await addDoc(teachersCollection, teacher);
    console.log(`Teacher added with ID: ${docRef.id}`);
  } catch (error) {
    console.error('Error adding teacher:', error);
  }
}

async function getTeachers() {
  try {
    const querySnapshot = await getDocs(teachersCollection);
    const teachers = querySnapshot.docs.map((doc) => doc.data());
    return teachers;
  } catch (error) {
    console.error('Error getting teachers:', error);
  }
}

async function deleteTeacher(email) {
  try {
    const teacherRef = doc(teachersCollection, email);
    await deleteDoc(teacherRef);
    console.log(`Teacher deleted with email: ${email}`);
  } catch (error) {
    console.error('Error deleting teacher:', error);
  }
}

async function bookAppointment(appointment) {
  try {
    const docRef = await addDoc(appointmentsCollection, appointment);
    console.log(`Appointment booked with ID: ${docRef.id}`);
  } catch (error) {
    console.error('Error booking appointment:', error);
  }
}

async function getAppointments() {
  try {
    const querySnapshot = await getDocs(appointmentsCollection);
    const appointments = querySnapshot.docs.map((doc) => doc.data());
    return appointments;
  } catch (error) {
    console.error('Error getting appointments:', error);
  }
}

async function registerStudent(student) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, student.email, student.password);
    console.log(`Student registered with email: ${student.email}`);
  } catch (error) {
    console.error('Error registering student:', error);
  }
}

async function loginStudent(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(`Student logged in with email: ${email}`);
  } catch (error) {
    console.error('Error logging in student:', error);
  }
}

async function logoutStudent() {
  try {
    await signOut(auth);
    console.log('Student logged out');
  } catch (error) {
    console.error('Error logging out student:', error);
  }
}

export { addTeacher, getTeachers, deleteTeacher, bookAppointment, getAppointments, registerStudent, loginStudent, logoutStudent };