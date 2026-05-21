const cron = require('node-cron');
const prisma = require('../DB_connect/prisma'); 

const { admin, db } = require('./firebaseAdmin'); 
const { sendClosingReminderEmail } = require('./emailService'); 

async function runClosingCheck() {
  console.log("Checking for approaching closing dates...");

  const now = new Date();
  const targetDate = new Date(now);
  targetDate.setUTCDate(targetDate.getUTCDate() + 3);
  
  const startOfDay = new Date(targetDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(targetDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  try {
    const closingSoon = await prisma.savedListing.findMany({
      where: {
        listing: {
          closing_date: {
            gte: startOfDay,
            lte: endOfDay
          }
        }
      },
      include: {
        listing: true
      }
    });

    console.log(`Found ${closingSoon.length} listings closing in 3 days.`);

    for (const saved of closingSoon) {
      const message = `Reminder: ${saved.listing.listname} closes in 3 days!`;
      
      await sendFirebaseNotification(saved.userId, message);

      try {
        const userRecord = await admin.auth().getUser(saved.userId);
        const userEmail = userRecord.email;
        const userName = userRecord.displayName || "User";

        if (userEmail) {
          await sendClosingReminderEmail(userEmail, userName, saved.listing.listname);
        } else {
          console.warn(`No email address for Firebase UID: ${saved.userId}`);
        }
      } catch (authError) {
        console.error(`Failed to fetch user from Firebase Auth for UID ${saved.userId}:`, authError);
      }
    }

  } catch (error) {
    console.error("Error running daily closing check:", error);
  }
}

async function sendFirebaseNotification(firebaseUid, messageText) {
  try {
    await db.collection('notifications').add({
      userId: firebaseUid,
      message: messageText,
      type: "Closing Reminder",
      isRead: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp() 
    });
    console.log(`Closing reminder notification pushed to Firestore for user: ${firebaseUid}`);
  } catch (error) {
    console.error("Error pushing notification to Firestore:", error);
  }
}

// =====================================================================
// FOR TESTING PURPOSES: Run immediately
// =====================================================================
// runClosingCheck().then(() => {
//   console.log("Test run finished.");
// });

// =====================================================================
// FOR PRODUCTION: Schedule to run every day at 8:00 AM
// =====================================================================

cron.schedule('0 8 * * *', () => {
  runClosingCheck();
});

// Runs every day at midnight
cron.schedule('0 0 * * *', async () => {
  console.log("Checking for expired listings...");

  try {
    const result = await prisma.listing.updateMany({
      where: {
        closing_date: {
          lt: new Date()
        },
        status: {
          not: "deleted"
        }
      },
      data: {
        status: "closed"
      }
    });

    console.log(`Marked ${result.count} listings as closed.`);
  } catch (error) {
    console.error("Error closing expired listings:", error);
  }
});
