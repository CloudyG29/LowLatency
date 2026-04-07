// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// firebase.js (no imports, use global firebase object)

const firebaseConfig = {
  apiKey: "AIzaSyDgirf1peij-kkhv9ir_5ea-L245W921w8",
  authDomain: "skillbridge-5dcec.firebaseapp.com",
  projectId: "skillbridge-5dcec",
  storageBucket: "skillbridge-5dcec.firebasestorage.app",
  messagingSenderId: "188202128236",
  appId: "1:188202128236:web:aee457ff824cba8c965949",
  measurementId: "G-NBYFQX660Y"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Authentication logic

// Signup with email and password
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = signupForm['email'].value;
  const password = signupForm['password'].value;
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    console.log('User signed in:', user);
    // TODO: Send the ID token to your backend for verification and create a session
  } catch (error) {
    console.error('Error signing in:', error.code, error.message);
    //TODO: Handle errors (e.g., display error message to user)
  }
});

// Log in with email and password
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const idToken = await user.getIdToken();
    console.log('User logged in\n');
    console.log('User ID Token:', idToken);
    console.log('User Profile:', user);
    // TODO: Send the ID token to your backend for verification and create a session
  } catch (error) {
    console.error('Error logging in:', error.code, error.message);
    //TODO: Handle errors (e.g., display error message to user)
  }
});

// Log in with Google
const googleLoginButton = document.querySelector('#google-login');
googleLoginButton.addEventListener('click', async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    const idToken = result.credential.idToken;
    console.log('User logged in with Google\n');
    console.log('Google ID Token:', idToken);
    console.log('Google User Profile:', result.additionalUserInfo.profile);
    // TODO: Send the ID token to your backend for verification and create a session
  } catch (error) {
    console.error('Error logging in with Google:', error.code, error.message);
    //TODO: Handle errors (e.g., display error message to user)
  }
});

// Log in with Apple
const appleLoginButton = document.querySelector('#apple-login');
appleLoginButton.addEventListener('click', async () => {
  const provider = new firebase.auth.OAuthProvider('apple.com');
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    const idToken = result.credential.idToken;
    console.log('User logged in with Apple\n');
    console.log('Apple ID Token:', idToken);
    console.log('Apple User Profile:', result.additionalUserInfo.profile);
    // TODO: Send the ID token to your backend for verification and create a session
  } catch (error) {
    console.error('Error logging in with Apple:', error.code, error.message);
    //TODO: Handle errors (e.g., display error message to user)
  }
});

