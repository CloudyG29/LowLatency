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

async function registerUser(name, surname, email) {
  await fetch('/api/user/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, surname, email })
  });
}

async function redirectUser(email) {
  try {
    const response = await fetch(`/api/user/role?email=${encodeURIComponent(email)}`);
    const data = await response.json();
    const userRole = data.role;
    
    if (userRole === "Applicant") {
      window.location.href = "/applicant.html";
    } else if (userRole === "Provider") {
      window.location.href = "/provider.html";
    } else if (userRole === "Admin") {
      window.location.href = "/admin.html";
    } else {
      window.location.href = "/applicant.html";
    }
  } catch (error) {
    console.error('Error fetching role:', error);
    window.location.href = "/applicant.html";
  }
}

const signupForm = document.querySelector('#signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await registerUser('', '', email);
      await redirectUser(email);
    } catch (error) {
      console.error('Error signing in:', error.code, error.message);
    }
  });
}

const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      await redirectUser(email);
    } catch (error) {
      console.error('Error logging in:', error.code, error.message);
    }
  });
}

const googleLoginButton = document.querySelector('#google-login');
if (googleLoginButton) {
  googleLoginButton.addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      await registerUser(
        user.displayName?.split(' ')[0] || '',
        user.displayName?.split(' ')[1] || '',
        user.email
      );
      await redirectUser(user.email);
    } catch (error) {
      console.error('Error logging in with Google:', error.code, error.message);
    }
  });
}

