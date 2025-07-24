import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnsyvPC17GvBwAqylYWlbVWRvh3t8okq8",
  authDomain: "shakthi-peethas.firebaseapp.com",
  projectId: "shakthi-peethas",
  storageBucket: "shakthi-peethas.appspot.com",
  messagingSenderId: "910792313415",
  appId: "1:910792313415:web:39448c248cbb745851ff62",
  measurementId: "G-ZJ7LW22H2R"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ DOM elements
const form = document.getElementById('form') 
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

// ✅ Form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const email = email_input.value;
  const password = password_input.value;

  let errors = []

  if(firstname_input) {
    errors = getSignupFormErrors(
      firstname_input.value, email_input.value, password_input.value, repeat_password_input.value
    );
  } else {
    errors = getLoginFormErrors(email_input.value, password_input.value);
  }

  if(errors.length > 0) {
    error_message.innerText = errors.join(". ")
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;

    // ✅ Save to Firestore if signup form
    if (firstname_input) {
      await setDoc(doc(db, "users", user.uid), {
        firstname: firstname_input.value,
        email: email
      });
    }

    alert("Account created");
    window.location.href = "homepage.html";

  } catch (error) {
    alert(error.message);
  }
});

// ✅ Validation functions
function getSignupFormErrors(firstname, email, password, repeatPassword){
  let errors = [];
  if(!firstname) {
    errors.push('Firstname is required');
    firstname_input.parentElement.classList.add('incorrect');
  }
  if(!email) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if(!password) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }
  if(password !== repeatPassword) {
    errors.push('Password does not match repeated password');
    password_input.parentElement.classList.add('incorrect');
    repeat_password_input.parentElement.classList.add('incorrect');
  }
  return errors;
}

function getLoginFormErrors(email, password){
  let errors = [];
  if(!email) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if(!password) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }
  return errors;
}

// ✅ Clear error styles on input
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(i => i != null);
allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if(input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  });
});
