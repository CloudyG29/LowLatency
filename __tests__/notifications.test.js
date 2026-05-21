const cron = require('node-cron');
const prisma = require('../DB_connect/prisma');
const { admin, db } = require('../backend/firebaseAdmin'); // Adjust path to match your actual file structure
const { sendClosingReminderEmail } = require('../backend/emailService'); // Adjust path

// 1. Setup global variables to capture both cron job callbacks
let closingCheckCronJob;
let expiredListingsCronJob;

// 2. Mock node-cron
jest.mock('node-cron', () => ({
  schedule: jest.fn((time, cb) => {
    if (time === '0 8 * * *') closingCheckCronJob = cb;
    if (time === '0 0 * * *') expiredListingsCronJob = cb;
  })
}));

// 3. Mock Prisma Client
jest.mock('../DB_connect/prisma', () => ({
  savedListing: {
    findMany: jest.fn()
  },
  listing: {
    updateMany: jest.fn()
  }
}));

// 4. Mock Email Service 
jest.mock('../backend/emailService', () => ({
  sendClosingReminderEmail: jest.fn(() => Promise.resolve())
}));

// 5. Mock Firebase Admin & DB
jest.mock('../backend/firebaseAdmin', () => {
  const mockFirestoreAdd = jest.fn(() => Promise.resolve({ id: 'mock-doc-id' }));
  
  return {
    admin: {
      auth: jest.fn(() => ({
        getUser: jest.fn((uid) => Promise.resolve({ 
          uid, 
          email: `${uid}@test.com`, 
          displayName: 'Test User' 
        }))
      })),
      firestore: {
        FieldValue: {
          serverTimestamp: jest.fn(() => 'MOCK_SERVER_TIMESTAMP')
        }
      }
    },
    db: {
      collection: jest.fn(() => ({
        add: mockFirestoreAdd
      }))
    }
  };
});

describe("Notification & Expiration Cron Jobs", () => {
  let mockFirestoreAdd;

  beforeAll(() => {
    // Require the file so cron.schedule executes and populates our captured callbacks
    require('../backend/notifications.js'); // Adjust path to match your main file
  });

  beforeEach(() => {
    // Clear mocks between tests
    prisma.savedListing.findMany.mockClear();
    prisma.listing.updateMany.mockClear();
    sendClosingReminderEmail.mockClear();
    
    mockFirestoreAdd = db.collection().add;
    mockFirestoreAdd.mockClear();

    // Lock system time to May 17, 2026, 10:00:00Z for deterministic dates
    jest.useFakeTimers().setSystemTime(new Date('2026-05-17T10:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // --- REGISTRATION TESTS ---
  
  test("should register both cron jobs with correct schedules", () => {
    expect(cron.schedule).toHaveBeenCalledWith('0 8 * * *', expect.any(Function));
    expect(cron.schedule).toHaveBeenCalledWith('0 0 * * *', expect.any(Function));
  });

  // --- 8:00 AM JOB: CLOSING DATES NOTIFICATIONS ---

  describe("8:00 AM Job: Closing Reminders", () => {
    test("should query DB for listings closing in exactly 3 days", async () => {
      prisma.savedListing.findMany.mockResolvedValue([]);

      await closingCheckCronJob();

      expect(prisma.savedListing.findMany).toHaveBeenCalledWith({
        where: {
          listing: {
            closing_date: {
              gte: new Date("2026-05-20T00:00:00.000Z"),
              lte: new Date("2026-05-20T23:59:59.999Z")
            }
          }
        },
        include: {        
          listing: true
        }
      });
    });

    test("should send Firestore notifications and Emails for matching records", async () => {
      // Setup mock data mapping to 'listname' as requested in your new code
      prisma.savedListing.findMany.mockResolvedValue([
        { userId: 'user_abc123', listingId: 'list_1', listing: { listname: 'Frontend Intern' } },
        { userId: 'user_xyz789', listingId: 'list_2', listing: { listname: 'Backend Engineer' } }
      ]);
            
      await closingCheckCronJob();

      // Flush promises
      if (typeof jest.runAllTimersAsync === 'function') {
        await jest.runAllTimersAsync();
      } else {
        await new Promise(process.nextTick);
      }
            
      // Verify Firestore calls
      expect(mockFirestoreAdd).toHaveBeenCalledTimes(2);
      expect(mockFirestoreAdd).toHaveBeenNthCalledWith(1, {
        userId: "user_abc123",
        message: "Reminder: Frontend Intern closes in 3 days!",
        type: "Closing Reminder",
        isRead: false,
        createdAt: 'MOCK_SERVER_TIMESTAMP'
      });
      expect(mockFirestoreAdd).toHaveBeenNthCalledWith(2, {
        userId: "user_xyz789",
        message: "Reminder: Backend Engineer closes in 3 days!",
        type: "Closing Reminder",
        isRead: false,
        createdAt: 'MOCK_SERVER_TIMESTAMP'
      });

      // Verify Email Service calls
      expect(sendClosingReminderEmail).toHaveBeenCalledTimes(2);
      expect(sendClosingReminderEmail).toHaveBeenNthCalledWith(
        1, 
        "user_abc123@test.com", 
        "Test User", 
        "Frontend Intern"
      );
    });

    test("should gracefully catch errors if DB query fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      prisma.savedListing.findMany.mockRejectedValue(new Error("Database Timeout"));
      
      await expect(async () => { await closingCheckCronJob(); }).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error running daily closing check:",
        expect.any(Error)
      );
      
      consoleErrorSpy.mockRestore();
    });
  });

  // --- MIDNIGHT JOB: EXPIRED LISTINGS ---

  describe("Midnight Job: Expired Listings Status Update", () => {
    test("should update status to 'closed' for listings with dates in the past", async () => {
      prisma.listing.updateMany.mockResolvedValue({ count: 5 });

      await expiredListingsCronJob();

      expect(prisma.listing.updateMany).toHaveBeenCalledWith({
        where: {
          closing_date: {
            lt: new Date("2026-05-17T10:00:00.000Z") // System time mocked above
          },
          status: {
            not: "deleted"
          }
        },
        data: {
          status: "closed"
        }
      });
    });

    test("should gracefully catch errors if expiration update fails", async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      prisma.listing.updateMany.mockRejectedValue(new Error("Update failed"));
      
      await expect(async () => { await expiredListingsCronJob(); }).not.toThrow();
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error closing expired listings:",
        expect.any(Error)
      );
      
      consoleErrorSpy.mockRestore();
    });
  });
});