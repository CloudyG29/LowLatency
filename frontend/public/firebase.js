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
        //Commented out for testing
        // const response = await fetch('/api/user/register', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     // We send the UID so Prisma can link the records
        //     body: JSON.stringify({ 
        //         name: firstName, 
        //         surname: lastName, 
        //         email, 
        //         role, 
        //         firebase_uid: uid 
        //     })
        // });
        // return await response.json();
        role = "Applicant"; // Mock role for testing
        const data = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email,
            role: role,
            firebase_uid: uid,
            cvName: "" // Default empty CV
        };

        // 💾 Save directly to local storage to mock the database
        localStorage.setItem('userData', JSON.stringify(data));

        // Return a mock success response
        return { status: "success", user: userData };
    } catch (err) {
        console.error("DB Sync Error:", err);
    }
}

// 3. Updated Redirect Logic
async function finalizeSession(role) {
    alert(`${role} signup successful!`);
    // Instead of setting local storage, we just move to login
    // The login process will handle the role-based redirect via the DB
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
        
        // Ask your backend: "What is the role of this email in the Prisma DB?"
        // const response = await fetch(`/api/user/role?email=${encodeURIComponent(email)}`);

        // TODO - This is where you would normally check the actual response from your backend.
        // const data = await response.json();
        const data = JSON.parse(localStorage.getItem('userData')) || { role: "Applicant" }; // Mocked data for testing
        
        // Redirect based on the DB response, not localStorage
        if (data.role === 'Admin') window.location.href = '/admin';
        else if (data.role === 'Provider') window.location.href = '/provider';
        else window.location.href = '/applicant';
        
    } catch (error) {
        console.error("Login failed", error);
    }
}

async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        // 1. Auth with Firebase
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        const email = user.email;

        // 2. Fetch role from Prisma
        // const response = await fetch(`/api/user/role?email=${encodeURIComponent(email)}`);
        
        // Commented out for testing
        // if (!response.ok) {
        //     // FIX: If they aren't in Prisma, log them out of Firebase and show an alert
        //     await firebase.auth().signOut();
        //     alert("User not found in database. Please sign up first.");
        //     return; // Stop the function here
        // }

        // TODO - This is where you would normally parse the actual response from your backend.
        // const data = await response.json();
        const data = {
            firstName: user.displayName?.split(" ")[0] || "Anonymous",
            lastName: user.displayName?.split(" ").slice(1).join(" ") || "User",
            email: user.email,
            role: "Applicant", // Mocked role for testing
            ID: user.uid
        }

        localStorage.setItem('userData', JSON.stringify(data)); // Store user info in localStorage for session persistence
        //TODO - Must get the data from the db, not the Google response

        // FIX: Redirect paths updated to match your loginAndRedirect function
        if (data.role === 'Admin') window.location.href = '/admin';
        else if (data.role === 'Provider') window.location.href = '/provider';
        else window.location.href = '/applicant';

    } catch (error) {
        // FIX: Actually display the error so the user knows what went wrong
        console.error("Google Login Error:", error);
        alert("Failed to log in with Google. " + error.message);
    }
}