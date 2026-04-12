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

// 2. Database Sync
async function registerUser(firstName, lastName, email, role) {
    try {
        await fetch('/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: firstName, surname: lastName, email, role })
        });
    } catch (err) {
        console.error("DB Sync Error:", err);
    }
}

// 3. Unified Storage & Redirect Logic
async function finalizeSession(user, role, firstName, lastName) {
    localStorage.setItem('userRole', role);
    localStorage.setItem('userData', JSON.stringify({
        role,
        firstName,
        lastName,
        email: user.email,
        uid: user.uid
    }));

    alert(`${role} signup successful!`);
    window.location.href = '/login.html';
}

// 4. Exported Auth Functions
async function signUpWithGoogle(role) {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const nameParts = (result.user.displayName || "").split(" ");
        const fName = nameParts[0] || "";
        const lName = nameParts[1] || "";

        await registerUser(fName, lName, result.user.email, role);
        await finalizeSession(result.user, role, fName, lName);
    } catch (error) {
        throw error; // Let the UI handle the display
    }
}

async function signUpWithEmail(email, password, fName, lName, role) {
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        await registerUser(fName, lName, email, role);
        await finalizeSession(result.user, role, fName, lName);
    } catch (error) {
        throw error;
    }
}