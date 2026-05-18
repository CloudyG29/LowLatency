const cron = require('node-cron');
const prisma = require('../DB_connect/prisma');
const admin = require('firebase-admin');

// 1. Setup global variables for capturing callbacks
let capturedCronCallback;

// 2. Mock node-cron
jest.mock('node-cron', () => ({
    schedule: jest.fn((time, cb) => {
        capturedCronCallback = cb; 
    })
}));

// 3. Mock Prisma Client
jest.mock('../DB_connect/prisma', () => ({
    savedListing: {
        findMany: jest.fn()
    }
}));

// 4. Mock Firebase Admin SDK
jest.mock('firebase-admin', () => {
    const mockAdd = jest.fn();
    const mockCollection = jest.fn(() => ({ add: mockAdd }));
    const mockFirestore = jest.fn(() => ({ collection: mockCollection }));
    
    mockFirestore.FieldValue = {
        serverTimestamp: jest.fn(() => 'MOCK_SERVER_TIMESTAMP')
    };

    return {
        firestore: mockFirestore
    };
});

describe("Daily Closing Dates Notifications Cron Job", () => {
    let mockFirestoreAdd;

    beforeAll(() => {
        // Require the file here so the initial cron.schedule call happens 
        // INSIDE the test suite's lifecycle, making it trackable.
        require('../backend/notifications.js');
    });

    beforeEach(() => {
        // Only clear the mocks we actively change in the tests. 
        // (If we use clearAllMocks, it will erase the cron.schedule history!)
        prisma.savedListing.findMany.mockClear();
        
        // Extract the mock function so our tests can safely run expects() on it
        mockFirestoreAdd = admin.firestore().collection('notifications').add;
        mockFirestoreAdd.mockClear();

        // Lock the system time to a specific date for deterministic testing
        jest.useFakeTimers().setSystemTime(new Date('2026-05-17T10:00:00Z'));
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("should register the cron job to run daily at 8:00 AM", () => {
        expect(cron.schedule).toHaveBeenCalledWith('0 8 * * *', expect.any(Function));
    });

    test("should query Azure DB for listings closing in exactly 3 days", async () => {
        // Given today is May 17, 2026, 3 days from now is May 20, 2026
        const expectedTargetDate = '2026-05-20';
        prisma.savedListing.findMany.mockResolvedValue([]);

        // Trigger the cron callback manually
        await capturedCronCallback();

        expect(prisma.savedListing.findMany).toHaveBeenCalledWith({
            where: {
                listing: {
                    closing_date: {
                        equals: expectedTargetDate
                    }
                }
            },
            include: {
                listing: true
            }
        });
    });

    test("should add individual documents to Firestore for matching records", async () => {
        // Mock data matching the structure returned by Prisma include
        const mockClosingListings = [
            {
                userId: "user_abc123",
                listing: { listname: "Frontend Intern" }
            },
            {
                userId: "user_xyz789",
                listing: { listname: "Backend Engineer" }
            }
        ];
        prisma.savedListing.findMany.mockResolvedValue(mockClosingListings);
        mockFirestoreAdd.mockResolvedValue({ id: 'mock-doc-id' });

        // Trigger the cron callback
        await capturedCronCallback();

        // Check Firestore additions
        expect(mockFirestoreAdd).toHaveBeenCalledTimes(2);
        
        // Check first notification structure matches your live listener expectations
        expect(mockFirestoreAdd).toHaveBeenNthCalledWith(1, {
            userId: "user_abc123",
            message: "Reminder: Frontend Intern closes in 3 days!",
            type: "Closing Reminder",
            isRead: false,
            createdAt: 'MOCK_SERVER_TIMESTAMP'
        });

        // Check second notification
        expect(mockFirestoreAdd).toHaveBeenNthCalledWith(2, {
            userId: "user_xyz789",
            message: "Reminder: Backend Engineer closes in 3 days!",
            type: "Closing Reminder",
            isRead: false,
            createdAt: 'MOCK_SERVER_TIMESTAMP'
        });
    });

    test("should gracefully catch errors if Azure DB query fails", async () => {
        // Spy on console.error so it doesn't pollute our test terminal output
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        prisma.savedListing.findMany.mockRejectedValue(new Error("Azure DB Connection Timeout"));

        // Triggering the callback should not crash the test suite
        await expect(capturedCronCallback()).resolves.not.toThrow();
        
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            "Error running daily closing check:",
            expect.any(Error)
        );
        
        consoleErrorSpy.mockRestore();
    });
});