// 1. Centralized Config
const firebaseConfig = {
    apiKey: "AIzaSyDgirf1peij-kkhv9ir_5ea-L245W921w8",
    authDomain: "skillbridge-5dcec.firebaseapp.com",
    projectId: "skillbridge-5dcec",
    storageBucket: "skillbridge-5dcec.firebasestorage.app",
    messagingSenderId: "188202128236",
    appId: "1:188202128236:web:aee457ff824cba8c965949"
};

firebase.initializeApp(firebaseConfig);

// 2. Database Sync (Now includes the Firebase UID)
async function registerUser(firstName, lastName, email, role, uid) {
    try {
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: firstName,
                surname: lastName,
                email,
                role,
                firebase_uid: uid
            })
        });
        return await response.json();
    } catch (err) {
        console.error("DB Sync Error:", err);
    }
}

// 3. Updated Redirect Logic
async function finalizeSession(role) {
    alert(`${role} signup successful!`);
    window.location.href = '/login';
}

// 4. Auth Functions (Passing UID to registerUser)
async function signUpWithGoogle(role) {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const nameParts = (result.user.displayName || "").split(" ");
        const fName = nameParts[0] || "";
        const lName = nameParts[1] || "";

        await registerUser(fName, lName, result.user.email, role, result.user.uid);
        await finalizeSession(role);
    } catch (error) {
        throw error;
    }
}

async function signUpWithEmail(email, password, fName, lName, role) {
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await registerUser(fName, lName, email, role, result.user.uid);
        await finalizeSession(role);
    } catch (error) {
        throw error;
    }
}

async function loginAndRedirect(email, password) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Store session info for pages that need the logged-in user's UID
        localStorage.setItem("uid", user.uid);
        localStorage.setItem("email", user.email);

        // Ask backend for role from Prisma DB
        const response = await fetch(`/api/user/role?email=${encodeURIComponent(email)}`);
        const data = await response.json();

        // Redirect based on DB role
        if (data.role === 'Admin') window.location.href = '/admin';
        else if (data.role === 'Provider') window.location.href = '/provider';
        else window.location.href = '/applicant';

    } catch (error) {
        console.error("Login failed", error);
    }
}

// Google login
async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        // 1. Auth with Firebase
        const result = await firebase.auth().signInWithPopup(provider);
        const email = result.user.email;

        // Store session info for pages that need the logged-in user's UID
        localStorage.setItem("uid", result.user.uid);
        localStorage.setItem("email", result.user.email);

        // 2. Fetch role from Prisma
        const response = await fetch(`/api/user/role?email=${encodeURIComponent(email)}`);

        if (!response.ok) {
            throw new Error("User not found in database. Please sign up first.");
        }

        const data = await response.json();

        // 3. Redirect
        if (data.role === 'Admin') window.location.href = '/admin';
        else if (data.role === 'Provider') window.location.href = '/provider';
        else window.location.href = '/applicant';

    } catch (error) {
        throw error;
    }
}