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

// ADDED: Tell Firebase to keep the user signed in even after closing/reopening the browser.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

// ADDED: Shared redirect helper so email login, Google login, and auto-login all use the same role logic.
async function redirectUserByRole(email) {
    const response = await fetch(`/api/user/role?email=${encodeURIComponent(email)}`);

    if (!response.ok) {
        await firebase.auth().signOut();
        localStorage.removeItem('firebase_uid');
        window.location.href = '/login';
        return;
    }

    const data = await response.json();

    if (data.role === 'Admin') {
        window.location.href = '/admin';
        return;
    }

    if (data.role === 'Provider') {
        const onboardResponse = await fetch(`/api/user/provider-onboarded?email=${encodeURIComponent(email)}`);

        if (onboardResponse.ok) {
            const onboardData = await onboardResponse.json();

            if (onboardData.onboarded) {
                window.location.href = '/provider';
            } else {
                window.location.href = '/provider-onboarding';
            }

            return;
        }

        window.location.href = '/provider-onboarding';
        return;
    }

    window.location.href = '/applicant';
}

// ADDED: Automatically redirect already-logged-in users away from auth pages.
function keepUserLoggedIn() {
    firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
            localStorage.removeItem('firebase_uid');
            return;
        }

        localStorage.setItem('firebase_uid', user.uid);

        const currentPath = window.location.pathname;
        const authPages = ['/login', '/signup', '/register'];

        if (authPages.includes(currentPath)) {
            await redirectUserByRole(user.email);
        }
    });
}

// ADDED: Start listening for Firebase's remembered login state.
keepUserLoggedIn();

// 2. Database Sync (Now includes the Firebase UID)
async function registerUser(firstName, lastName, email, role, uid) {
    try {
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // We send the UID so Prisma can link the records
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
        throw err; // Re-throw so signup functions can catch it
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
async function cleanupFailedFirebaseUser() {
    try {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            await currentUser.delete();
        }
    } catch (cleanupError) {
        console.error("Cleanup failed for Firebase user:", cleanupError);
    } finally {
        try {
            await firebase.auth().signOut();
        } catch (signOutError) {
            console.error("Firebase sign out failed after cleanup:", signOutError);
        }
    }
}

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
        await cleanupFailedFirebaseUser();
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
        if (firebase.auth().currentUser) {
            await cleanupFailedFirebaseUser();
        }
        throw error;
    }
}

async function loginAndRedirect(email, password) {
    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        localStorage.setItem('firebase_uid', user.uid);

        // CHANGED: Reuse the shared redirect helper instead of repeating role redirect logic here.
        await redirectUserByRole(email);
        
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
}

async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        // 1. Auth with Firebase
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        localStorage.setItem('firebase_uid', user.uid);
        const email = user.email;

        // CHANGED: Reuse the shared redirect helper instead of repeating role redirect logic here.
        await redirectUserByRole(email);

    } catch (error) {
        console.error("Google login error:", error);
        throw error;
    }
}