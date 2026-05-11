const admin = require("firebase-admin");

let db;

// 1. TESTING ENVIRONMENT (PRs / Local Tests)
// If Jest is running, skip initialization and provide a dummy database
if (process.env.JEST_WORKER_ID !== undefined) {
  
  db = {
    collection: () => ({
      add: () => Promise.resolve({ id: 'mock-notification-id' }),
      // Add any other firestore methods you chain here if needed
    })
  };

} 
// 2. LIVE APP & LOCAL DEV
else {
  let serviceAccount;

  // Check for Live App Environment Variable first
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    } catch (error) {
      console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable");
    }
  } 
  // Fall back to the physical file for Local Dev
  else {
    serviceAccount = require("./serviceAccountKey.json");
  }

  // Initialize real Firebase
  if (!admin.apps.length && serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  db = admin.firestore();
}

module.exports = { admin, db };