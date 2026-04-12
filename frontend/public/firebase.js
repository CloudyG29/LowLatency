const firebaseConfig = {
  apiKey: "AIzaSyDgirf1peij-kkhv9ir_5ea-L245W921w8",
  authDomain: "skillbridge-5dcec.firebaseapp.com",
  projectId: "skillbridge-5dcec",
  storageBucket: "skillbridge-5dcec.firebasestorage.app",
  messagingSenderId: "188202128236",
  appId: "1:188202128236:web:aee457ff824cba8c965949",
  measurementId: "G-NBYFQX660Y",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

async function registerUser(name, surname, email) {
  //this function is used to register the user in the database. We call this function after the user has successfully signed up or logged in with Google.
  await fetch("/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, surname, email }),
  });
}

async function redirectUser(email) {
  try {
    const response = await fetch(
      `/api/user/role?email=${encodeURIComponent(email)}`, //email is a unique identifier for the user, so we can use it to fetch the user's role from the database.
    );
    const data = await response.json();
    const userRole = data.role;

    if (userRole === "Applicant") {
      window.location.href = "/frontend/roles_htmls/applicant_view.html";
    } else if (userRole === "Provider") {
      window.location.href = "/frontend/roles_htmls/provider_view.html";
    } else if (userRole === "Admin") {
      window.location.href = "/frontend/roles_htmls/admin_view.html";
    }
  } catch (error) {
    console.error("Error fetching role:", error);
    window.location.href = "/frontend/roles_htmls/applicant_view.html";
  }
}

const signupForm = document.querySelector("#signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      await registerUser("", "", email); //we don't use name and surname for email/password signups, so we just pass empty strings.
      await redirectUser(email);
    } catch (error) {
      console.error("Error signing in:", error.code, error.message);
    }
  });
}

const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      await redirectUser(email);
    } catch (error) {
      console.error("Error logging in:", error.code, error.message);
    }
  });
}

const googleLoginButton = document.querySelector("#google-login");
if (googleLoginButton) {
  googleLoginButton.addEventListener("click", async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const user = result.user;
      await registerUser(
        //storing the user in the database.
        //google gives us the full name in displayName, so we split it into first and last name. If there's no space, we just use the full name as the first name and leave the last name empty.
        user.displayName?.split(" ")[0] || "", //name
        user.displayName?.split(" ")[1] || "", //surname
        user.email,
      );
      await redirectUser(user.email);
    } catch (error) {
      console.error("Error logging in with Google:", error.code, error.message);
    }
  });
}
