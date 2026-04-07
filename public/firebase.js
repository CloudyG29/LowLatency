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

const signupForm = document.querySelector('#signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User signed in:', user);
      const userRole = "Applicant";
      if (userRole === "Applicant") {
        window.location.href = "/applicant.html";
      } else if (userRole === "Provider") {
        window.location.href = "/provider.html";
      } else if (userRole === "Admin") {
        window.location.href = "/admin.html";
      }
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
      console.log('User logged in\n');
      console.log('User ID Token:', idToken);
      console.log('User Profile:', user);
      const userRole = "Applicant";
      if (userRole === "Applicant") {
        window.location.href = "/applicant.html";
      } else if (userRole === "Provider") {
        window.location.href = "/provider.html";
      } else if (userRole === "Admin") {
        window.location.href = "/admin.html";
      }
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
      const idToken = result.credential.idToken;
      console.log('User logged in with Google\n');
      console.log('Google ID Token:', idToken);
      console.log('Google User Profile:', result.additionalUserInfo.profile);
      const userRole = "Applicant";
      if (userRole === "Applicant") {
        window.location.href = "/applicant.html";
      } else if (userRole === "Provider") {
        window.location.href = "/provider.html";
      } else if (userRole === "Admin") {
        window.location.href = "/admin.html";
      }
    } catch (error) {
      console.error('Error logging in with Google:', error.code, error.message);
    }
  });
}

const appleLoginButton = document.querySelector('#apple-login');
if (appleLoginButton) {
  appleLoginButton.addEventListener('click', async () => {
    const provider = new firebase.auth.OAuthProvider('apple.com');
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      const idToken = result.credential.idToken;
      console.log('User logged in with Apple\n');
      console.log('Apple ID Token:', idToken);
      console.log('Apple User Profile:', result.additionalUserInfo.profile);
      const userRole = "Applicant";
      if (userRole === "Applicant") {
        window.location.href = "/applicant.html";
      } else if (userRole === "Provider") {
        window.location.href = "/provider.html";
      } else if (userRole === "Admin") {
        window.location.href = "/admin.html";
      }
    } catch (error) {
      console.error('Error logging in with Apple:', error.code, error.message);
    }
  });
}