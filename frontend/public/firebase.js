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


// ✅ FIXED: OUTSIDE ALL FUNCTIONS
async function getAuthHeaders(user) {
    const token = await user.getIdToken();
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}


// 2. Database Sync
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

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Registration failed");
        }

        return await response.json();

    } catch (err) {
        console.error("DB Sync Error:", err);
        throw err;
    }
}


// 3. Redirect
async function finalizeSession(role) {
    alert(`${role} signup successful!`);
    window.location.href = '/login';
}


// 4. SIGNUP
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
        console.error("Google signup error:", error);
        throw error;
    }
}


async function signUpWithEmail(email, password, fName, lName, role) {
    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);

        await registerUser(fName, lName, email, role, result.user.uid);
        await finalizeSession(role);

    } catch (error) {
        console.error("Email signup error:", error);
        throw error;
    }
}


// 5. LOGIN
async function loginAndRedirect(email, password) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;

        const headers = await getAuthHeaders(user);

        const response = await fetch('/api/user/role', {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "Could not fetch user role");
        }

        const data = await response.json();

        if (data.role === 'Admin') window.location.href = '/admin';
        else if (data.role === 'Provider') window.location.href = '/provider';
        else if (data.role === 'Applicant') window.location.href = '/applicant';
        else throw new Error("Unknown role");

    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
}


// 6. GOOGLE LOGIN
async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        const headers = await getAuthHeaders(user);

        const response = await fetch('/api/user/role', {
            method: 'GET',
            headers
        });

        if (!response.ok) {
            await firebase.auth().signOut();
            alert("User not found. Please sign up first.");
            return;
        }

        const data = await response.json();

        if (data.role === 'Admin') window.location.href = '/admin';
        else if (data.role === 'Provider') window.location.href = '/provider';
        else window.location.href = '/applicant';

    } catch (error) {
        console.error("Google login error:", error);
        throw error;
    }
}