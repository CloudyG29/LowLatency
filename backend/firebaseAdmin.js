const admin = require("firebase-admin");

let serviceAccount;

// 1. LIVE APP: Check if the credentials are in an Environment Variable first
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (error) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable");
  }
} 
// 2. LOCAL DEV & TESTING: If no Env Var, try the file or use dummy keys
else {
  try {
    // Works on your local machine
    serviceAccount = require("./serviceAccountKey.json");
  } catch (error) {
    // Works in your PR tests / GitHub Actions
    serviceAccount = {
      project_id: "test-project",
      private_key: "-----BEGIN PRIVATE KEY-----\nFAKE_KEY_FOR_TESTING\n-----END PRIVATE KEY-----\n",
      client_email: "test@test.com",
    };
  }
}

// Initialize Firebase
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

module.exports = { admin, db };