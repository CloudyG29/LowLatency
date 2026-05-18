describe("firebaseAdmin initialization", () => {
    const originalEnv = process.env;
  
    beforeEach(() => {
      jest.resetModules();
      
      process.env = { ...originalEnv };
      
      jest.doMock("firebase-admin", () => ({
        apps: [],
        credential: {
          cert: jest.fn((account) => account),
        },
        initializeApp: jest.fn(),
        firestore: jest.fn(() => "mock-real-db"),
      }));
    });
  
    afterAll(() => {
      process.env = originalEnv;
    });
  
    test("uses dummy database when running in Jest", async () => {
      const { db } = require("../backend/firebaseAdmin");
      
      expect(db).toHaveProperty("collection");
      
      const result = await db.collection("notifications").add({ test: "data" });
      expect(result).toEqual({ id: 'mock-notification-id' });
    });
  
    test("uses real Firebase with FIREBASE_SERVICE_ACCOUNT env var", () => {
      delete process.env.JEST_WORKER_ID; 
      
      process.env.FIREBASE_SERVICE_ACCOUNT = JSON.stringify({ project_id: "live-app-mock" });
      
      const { db, admin } = require("../backend/firebaseAdmin");
      
      expect(admin.initializeApp).toHaveBeenCalledWith({
        credential: { project_id: "live-app-mock" }
      });
      
      expect(db).toBe("mock-real-db");
    });
  
    test("safely handles JSON parsing errors for FIREBASE_SERVICE_ACCOUNT", () => {
      delete process.env.JEST_WORKER_ID;
      
      process.env.FIREBASE_SERVICE_ACCOUNT = "this-is-not-valid-json"; 
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      require("../backend/firebaseAdmin");
      
      expect(consoleSpy).toHaveBeenCalledWith("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable");
      
      consoleSpy.mockRestore();
    });
  });