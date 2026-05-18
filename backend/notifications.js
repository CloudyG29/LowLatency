const cron = require('node-cron');
const prisma = require('../DB_connect/prisma'); 
const admin = require('firebase-admin');

// Run every day at 8:00 AM server time
cron.schedule('0 8 * * *', async () => {
  console.log("Checking for approaching closing dates...");

  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  
  const formattedTargetDate = targetDate.toISOString().split('T')[0]; 

  try {
    // 2. Ask Azure/Prisma for all favorites closing on that day
    const closingSoon = await prisma.savedListing.findMany({
      where: {
        listing: {
          closing_date: {
            equals: formattedTargetDate 
          }
        }
      },
      include: {
        listing: true
      }
    });

    // 3. Send to Firebase!
    for (const saved of closingSoon) {
      const message = `Reminder: ${saved.listing.listname} closes in 3 days!`;
      await sendFirebaseNotification(saved.userId, message);
    }

  } catch (error) {
    console.error("Error running daily closing check:", error);
  }
});

async function sendFirebaseNotification(firebaseUid, messageText) {
    try {
      await admin.firestore().collection('notifications').add({
        userId: firebaseUid,                   
        message: messageText,                  
        type: "Closing Reminder",             
        isRead: false,                         
        createdAt: admin.firestore.FieldValue.serverTimestamp() 
      });
      console.log(`Closing reminder notification pushed for user: ${firebaseUid}`);
    } catch (error) {
      console.error("Error pushing notification to Firestore:", error);
    }
  }