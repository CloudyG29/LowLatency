/**
 * @jest-environment jsdom
 */

// Mock external global objects before requiring/defining the module
const mockOnSnapshot = jest.fn();
const mockDocUpdate = jest.fn().mockResolvedValue();

global.firebase = {
  auth: jest.fn(() => ({
    onAuthStateChanged: jest.fn((cb) => cb({ 
      email: 'applicant@test.com', 
      getIdToken: jest.fn().mockResolvedValue('mock-token') 
    })),
    signOut: jest.fn().mockResolvedValue(),
    currentUser: { uid: 'user_123' }
  })),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      onSnapshot: mockOnSnapshot,
      doc: jest.fn(() => ({
        update: mockDocUpdate
      }))
    }))
  }))
};

// Mock window/browser APIs
global.alert = jest.fn();
global.confirm = jest.fn(() => true);
global.fetch = jest.fn();
window.addEducationRow = jest.fn(); // Mock external function used in prepEducationInfoModal


const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
    clear: jest.fn(() => { store = {}; }),
    removeItem: jest.fn((key) => { delete store[key]; })
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Import functions from your file
const viewModule = require('../frontend/roles_js/applicant_view.js');

describe("Applicant View Component Test Suite - High Coverage", () => {
  
  let mockAssign;
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
    jest.useFakeTimers();

    delete window.location;
    window.location = { assign: jest.fn(), href: '' };

    // Set up a complete dummy DOM matching all necessary selectors
    document.body.innerHTML = `
      <div id="loader" class="hidden"></div>
      <div id="sidebar"></div>
      <div id="main-content"></div>
      <div id="applicationsList"></div>
      
      <span id="displayFirstName"></span>
      <span id="displayLastName"></span>
      <span id="displayEmail"></span>
      <span id="topName"></span>
      <span id="topRole"></span>
      <p id="displayBio"></p>
      
      <input id="editFirstName" />
      <input id="editLastName" />
      <input id="editEmail" />
      <input id="editPhone" />
      <input id="editDob" />
      <textarea id="editBioText"></textarea>
      
      <div id="currentCvDisplay"></div>
      <input type="file" id="cvFile" />
      <div id="cvUploadMsg"></div>
      
      <div id="educationListContainer"></div>
      <div id="educationDisplayContainer"></div>
      <div id="opportunitiesList"></div>
      <select id="listTypeFilter"><option value="Internship">Internship</option></select>
      
      <div id="personalInfoModal" class="modal"></div>
      <div id="educationInfoModal" class="modal"></div>
      <div id="bioModal" class="modal"></div>
      <div id="applicationModal" class="modal"></div>
      
      <input id="applicationListingId" data-required-nqf="5" />
      <textarea id="applicationMotivation"></textarea>
      <input id="applicationAvailability" />
      <span id="applicationCvName"></span>
      <input type="file" id="applicationCvFile" />

      <div id="opportunitiesTab" class="tab-content"></div>
      <div id="applicationsTab" class="tab-content"></div>
      <div id="profileTab" class="tab-content"></div>
      <div id="notificationsTab" class="tab-content"></div>
      <button id="tab-opps" class="tab"></button>
      
      <div id="notificationsList"></div>
      <span id="notificationBadge" class="hidden"></span>
    `;

    window.showLoader = () => document.getElementById("loader").classList.remove("hidden");
    window.hideLoader = () => document.getElementById("loader").classList.add("hidden");
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // --- NEW COVERAGE: Authentication Guard ---
  describe("Authentication Guard (guardApplicantPage)", () => {

    test("resolves true if user is logged in and role is Applicant", async () => {
      global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ role: "Applicant" }) });
      const result = await viewModule.guardApplicantPage();
      expect(result).toBe(true);
    });
  });

  // --- EXISTING COVERAGE: Applications & Tabs ---
  describe("Applications & Tab Interface", () => {
    test("renderApplications parses API data and appends semantic HTML content", async () => {
      localStorageMock.setItem("userData", JSON.stringify({ email: "applicant@test.com" }));
      const mockApplications = [{
        listing: { listname: "Frontend Intern", list_type: "Full-Time" },
        created_at: "2026-05-15T08:00:00.000Z",
        status: "pending"
      }];
      global.fetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(mockApplications) });

      await viewModule.renderApplications();
      const container = document.getElementById("applicationsList");
      expect(container.innerHTML).toContain("Frontend Intern");
      expect(container.innerHTML).toContain("status-pending");
    });

    test("showTab modifies specific element classLists smoothly", () => {
      viewModule.showTab("opportunities");
      expect(document.getElementById("opportunitiesTab").classList.contains("active")).toBe(true);
    });
  });

  // --- EXISTING & NEW COVERAGE: Education & Profile Processing ---
  describe("Profile Modals & Data Processing", () => {
    test("prepPersonalInfoModal populates inputs and opens modal", () => {
      localStorageMock.setItem("userData", JSON.stringify({ name: "John", surname: "Doe", applicant: { phone: "123456" }}));
      viewModule.prepPersonalInfoModal();
      expect(document.getElementById("editFirstName").value).toBe("John");
      expect(document.getElementById("editPhone").value).toBe("123456");
      expect(document.getElementById("personalInfoModal").classList.contains("active")).toBe(true);
    });

    test("prepBioModal populates inputs and opens modal", () => {
      localStorageMock.setItem("userData", JSON.stringify({ applicant: { bio: "I am a dev" }}));
      viewModule.prepBioModal();
      expect(document.getElementById("editBioText").value).toBe("I am a dev");
      expect(document.getElementById("bioModal").classList.contains("active")).toBe(true);
    });

    test("savePersonalInfo maps inputs and triggers saveProfileChanges", async () => {
      document.getElementById("editFirstName").value = "Jane";
      global.fetch.mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ name: "Jane" }) }); // Mock saveProfileChanges fetch
      localStorageMock.setItem("firebase_uid", "user_123");

      await viewModule.savePersonalInfo();
      expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining("/api/profile/"), expect.any(Object));
      expect(global.alert).toHaveBeenCalledWith("Profile updated successfully!");
    });

    test("renderEducationDisplay sets default fallback text layout gracefully when empty", () => {
      localStorageMock.setItem("userData", JSON.stringify({ applicant: { formattedQualifications: [] } }));
      viewModule.renderEducationDisplay();
      const container = document.getElementById("educationDisplayContainer");
      expect(container.innerHTML).toContain("Not set");
    });

    test("saveProfileChanges performs PUT request and updates dynamic UI elements", async () => {
      localStorageMock.setItem("firebase_uid", "user_abc123");
      const mockServerReturn = { name: "Alex", applicant: { bio: "Hello World" } };
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockServerReturn)
      });

      const success = await viewModule.saveProfileChanges({ bio: "Hello World" });
      expect(success).toBe(true);
      expect(localStorageMock.setItem).toHaveBeenCalledWith("userData", expect.stringContaining("Alex"));
    });
  });

  // --- NEW COVERAGE: Application Prep & Submit Logic ---
  describe("Application Form Modals (applyForListing & submitApplicationFromModal)", () => {
    test("applyForListing prepares modal UI with target listing parameters", () => {
      localStorageMock.setItem("userData", JSON.stringify({ cvName: "stored_cv.pdf" }));
      viewModule.applyForListing(99, 7);

      expect(document.getElementById("applicationListingId").value).toBe("99");
      expect(document.getElementById("applicationListingId").dataset.requiredNqf).toBe("7");
      expect(document.getElementById("applicationCvName").textContent).toBe("stored_cv.pdf");
      expect(document.getElementById("applicationModal").classList.contains("active")).toBe(true);
    });

    test("submitApplicationFromModal warns and halts on NQF mismatch if user cancels", async () => {
      document.getElementById("applicationListingId").dataset.requiredNqf = "8"; // Very high requirement
      localStorageMock.setItem("userData", JSON.stringify({ applicant: { formattedQualifications: [{ nqf_level: 5 }] } }));
      global.confirm.mockReturnValueOnce(false); // User clicks cancel

      await viewModule.submitApplicationFromModal();
      expect(global.alert).not.toHaveBeenCalledWith("Please add a short motivation before applying."); // Aborted early
    });

    test("submitApplicationFromModal demands motivation and availability", async () => {
      document.getElementById("applicationListingId").dataset.requiredNqf = "0"; // Bypass NQF check
      document.getElementById("applicationMotivation").value = ""; 
      
      await viewModule.submitApplicationFromModal();
      expect(global.alert).toHaveBeenCalledWith("Please add a short motivation before applying.");

      document.getElementById("applicationMotivation").value = "Motivated";
      document.getElementById("applicationAvailability").value = ""; 

      await viewModule.submitApplicationFromModal();
      expect(global.alert).toHaveBeenCalledWith("Please add your availability before applying.");
    });
  });

  // --- EXISTING COVERAGE: File Management ---
  describe("CV Documents Interaction Engine", () => {
    test("uploadCV rejects actions early with validation notice if target selection is absent", async () => {
      const fileInput = document.getElementById("cvFile");
      Object.defineProperty(fileInput, 'files', { value: [] });
      await viewModule.uploadCV();
      expect(document.getElementById("cvUploadMsg").innerHTML).toContain("Please select a file first.");
    });

    test("uploadCV flags execution limits if target document payload crosses max thresholds", async () => {
      const fileInput = document.getElementById("cvFile");
      Object.defineProperty(fileInput, 'files', { value: [{ name: "huge.pdf", size: 6 * 1024 * 1024 }] });
      await viewModule.uploadCV();
      expect(document.getElementById("cvUploadMsg").innerHTML).toContain("File is too large.");
    });
  });

  // --- EXISTING COVERAGE: Notifications ---
  describe("Real-time Firestore Push Notification Events Engine", () => {
    test("startNotificationListener unpacks snapshot changes updates targets badges arrays structures", () => {
      mockOnSnapshot.mockImplementationOnce((callback) => {
        callback({
          forEach: (cb) => cb({ id: "notif_001", data: () => ({ type: "Reminder", message: "Hey", isRead: false }) })
        });
      });

      viewModule.startNotificationListener("user_123");
      expect(document.getElementById("notificationBadge").textContent).toBe("1");
      expect(document.getElementById("notificationsList").innerHTML).toContain("Reminder");
    });
  });

  // --- NEW COVERAGE: UI Utilities ---
  describe("UI Utility Modifiers", () => {
    test("markAsRead updates firestore document boolean", async () => {
      await viewModule.markAsRead("notif_123");
      expect(mockDocUpdate).toHaveBeenCalledWith({ isRead: true });
    });

    test("toggleSidebar manipulates responsive CSS classes", () => {
      viewModule.toggleSidebar();
      expect(document.getElementById("sidebar").classList.contains("collapsed")).toBe(true);
      expect(document.getElementById("main-content").classList.contains("expanded")).toBe(true);
    });

    test("getCompetition accurately clusters scale distributions metrics", () => {
      expect(viewModule.getCompetition(5).level).toBe("low");
      expect(viewModule.getCompetition(100).level).toBe("very-high");
    });
  });
});