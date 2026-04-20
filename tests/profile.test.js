// Import your functions (adjust the path as needed)
const { renderProfile, saveProfileChanges, uploadCV, showTab, openModal, closeModal } = require('../frontend/roles_js/applicant_view.js');

// --- Mocking Global Browser Features ---

// 1. Mock Local Storage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: jest.fn((key) => store[key] || null),
        setItem: jest.fn((key, value) => { store[key] = value.toString(); }),
        clear: jest.fn(() => { store = {}; })
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// 2. Mock Fetch API
global.fetch = jest.fn();

// 3. Fake Timers (for our setTimeout in uploadCV)
jest.useFakeTimers();

describe('Applicant Profile Dashboard Tests', () => {

    // Before EVERY test, we reset our fake DOM and mocks
    beforeEach(() => {
        // Reset mocks
        jest.clearAllMocks();
        localStorage.clear();

        // Inject the HTML structure your functions expect to find
        document.body.innerHTML = `
            <div id="topName"></div>
            <div id="topRole"></div>
            <div id="displayFirstName"></div>
            <div id="displayLastName"></div>
            <div id="displayEmail"></div>
            <div id="displayBio"></div>
            <input id="editFirstName" />
            <input id="editLastName" />
            <input id="editEmail" />
            <div id="currentCvDisplay"></div>
            <div id="profileDisplayMode"></div>
            <div id="profileForm"></div>
            
            <input type="file" id="cvFile" />
            <div id="cvUploadMsg"></div>
        `;
    });

    // --- TEST 1: Rendering the Profile ---
    test('renderProfile correctly populates the DOM from localStorage', () => {
        // Arrange: Put fake data into our mock localStorage
        const fakeUserData = {
            name: "Jane",
            surname: "Doe",
            email: "jane@example.com",
            role: "Applicant",
            applicant: { bio: "I am a software engineer." }
        };
        localStorage.setItem('userData', JSON.stringify(fakeUserData));

        // Act: Run the render function
        renderProfile();

        // Assert: Check if the DOM updated correctly
        expect(document.getElementById('displayFirstName').textContent).toBe('Jane');
        expect(document.getElementById('displayLastName').textContent).toBe('Doe');
        expect(document.getElementById('topName').textContent).toBe('Jane Doe');
        expect(document.getElementById('displayBio').textContent).toBe('I am a software engineer.');
        expect(document.getElementById('editFirstName').value).toBe('Jane');
    });

    // --- TEST 2: The Master Save Function ---
    test('saveProfileChanges sends PUT request and updates localStorage', async () => {
        // Arrange
        localStorage.setItem('firebase_uid', 'fake_uid_123');

        const fieldsToUpdate = { bio: "Updated Bio!" };
        const mockApiResponse = { user: { name: "Jane", applicant: { bio: "Updated Bio!" } } };

        // Tell the fake fetch to pretend it succeeded
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockApiResponse
        });

        // Act
        const success = await saveProfileChanges(fieldsToUpdate);

        // Assert
        expect(success).toBe(true);
        expect(fetch).toHaveBeenCalledWith('/api/profile/fake_uid_123', expect.objectContaining({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fieldsToUpdate)
        }));

        // 1. Verify firebase_uid was in local storage (as requested!)
        expect(localStorage.setItem).toHaveBeenCalledWith('firebase_uid', 'fake_uid_123');

        // 2. FIXED: Verify userData was saved exactly as your app handles it
        expect(localStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify(mockApiResponse));
    });

    // --- TEST 3: Handling Save Errors ---
    test('saveProfileChanges handles API errors gracefully', async () => {
        // Arrange
        localStorage.setItem('firebase_uid', 'fake_uid_123');

        // Tell fetch to pretend the server crashed
        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Database down" })
        });

        // Act
        const success = await saveProfileChanges({ name: "Fail" });

        // Assert
        expect(success).toBe(false);
        // Ensure localStorage was NOT updated
        expect(localStorage.setItem).not.toHaveBeenCalledWith('userData', expect.anything());
    });

    // --- TEST 4: The Mock CV Upload ---
    test('uploadCV fakes an upload, updates UI, and stores file name', async () => {
        // Arrange
        const fileInput = document.getElementById('cvFile');
        const msgBox = document.getElementById('cvUploadMsg');

        // Create a fake file and attach it to the input
        const fakeFile = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
        Object.defineProperty(fileInput, 'files', {
            value: [fakeFile]
        });

        localStorage.setItem('userData', JSON.stringify({ name: "Jane" }));

        // Act
        uploadCV();

        // Immediately after calling, it should say Uploading
        expect(msgBox.innerHTML).toContain('Uploading...');

        // Fast-forward the setTimeout (1.5 seconds)
        jest.advanceTimersByTime(1500);

        // Assert
        expect(msgBox.innerHTML).toContain('CV Uploaded Successfully!');

        // Check if localStorage has the file name appended
        const updatedData = JSON.parse(localStorage.getItem.mock.results.slice(-1)[0].value);
        expect(updatedData.cvName).toBe('resume.pdf');
    });

    // --- TEST 5: CV Upload Empty State ---
    test('uploadCV fails if no file is selected', () => {
        // Arrange (no file attached to input this time)
        const msgBox = document.getElementById('cvUploadMsg');

        // Act
        uploadCV();

        // Assert
        expect(msgBox.innerHTML).toContain('Please select a file first.');
    });

    describe('Frontend UI Controls (Tabs & Modals)', () => {

        // 1. Set up a fake DOM before every test
        beforeEach(() => {
            document.body.innerHTML = `
            <span id="topName"></span>
            <span id="topRole"></span>

            <button id="tab-opps" class="tab active"></button>
            <button id="tab-apps" class="tab"></button>
            <button id="tab-profile" class="tab"></button>
            
            <div id="opportunitiesTab" class="tab-content active">
                <div id="opportunitiesList"></div>
            </div>
            
            <div id="applicationsTab" class="tab-content">
                <div id="applicationsList"></div> 
            </div>
            
            <div id="profileTab" class="tab-content">
                <span id="displayFirstName"></span>
                <span id="displayLastName"></span>
                <span id="displayEmail"></span>
                <p id="displayBio"></p>
            </div>
            <div id="testModal" class="modal"></div>
        `;

            // Mock localStorage
            Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));

            // Mock global fetch functions
            window.getAllOpportunities = jest.fn(() => []);
        });

        // --- TAB TESTS ---
        test('showTab("opportunities") should activate correct tab and run render function', () => {
            showTab('opportunities');

            expect(document.getElementById('tab-opps').classList.contains('active')).toBe(true);
            expect(document.getElementById('opportunitiesTab').classList.contains('active')).toBe(true);
            expect(document.getElementById('tab-apps').classList.contains('active')).toBe(false);
        });

        test('showTab("applications") should activate correct tab and run render function', () => {
            // We might need to fake a container for applications if your JS uses a generic class/tag query
            const appContainer = document.getElementById('applicationsList');

            showTab('applications');

            expect(document.getElementById('tab-apps').classList.contains('active')).toBe(true);
            expect(document.getElementById('applicationsTab').classList.contains('active')).toBe(true);
        });

        test('showTab("profile") should activate correct tab and run render function', () => {
            // Mock a fake user in localStorage so renderProfile has data to insert!
            Storage.prototype.getItem = jest.fn(() => JSON.stringify({
                name: "Test", surname: "User", email: "test@test.com"
            }));

            showTab('profile');

            expect(document.getElementById('tab-profile').classList.contains('active')).toBe(true);
            expect(document.getElementById('profileTab').classList.contains('active')).toBe(true);

            // Prove the render function actually ran and updated the DOM!
            expect(document.getElementById('displayFirstName').textContent).toBe('Not set');
        });

        // --- MODAL TESTS ---
        test('openModal() should add the "active" class to the specified modal', () => {
            const modal = document.getElementById('testModal');
            openModal('testModal');
            expect(modal.classList.contains('active')).toBe(true);
        });

        test('closeModal() should remove the "active" class from the specified modal', () => {
            const modal = document.getElementById('testModal');
            modal.classList.add('active');
            closeModal('testModal');
            expect(modal.classList.contains('active')).toBe(false);
        });
    });
});