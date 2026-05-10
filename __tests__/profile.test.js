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

// Define variables up here so all your tests can access them
let renderProfile, saveProfileChanges, uploadCV, showTab, openModal, closeModal;

describe('Applicant Profile Dashboard Tests', () => {

    // Run this ONCE before any tests start to safely load the file
    beforeAll(() => {
        // 1. Build the DOM FIRST
        document.body.innerHTML = `
            <div id="loader"></div>
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
            <div id="myOpportunities"></div>
        `;

        // 2. NOW safely require the file and assign the functions
        const applicantView = require('../frontend/roles_js/applicant_view.js');
        renderProfile = applicantView.renderProfile;
        saveProfileChanges = applicantView.saveProfileChanges;
        uploadCV = applicantView.uploadCV;
        showTab = applicantView.showTab;
        openModal = applicantView.openModal;
        closeModal = applicantView.closeModal;
    });

    // Before EVERY test, reset mocks and local storage
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        
        // We also ensure the standard DOM is fresh for tests 1-5
        document.body.innerHTML = `
            <div id="loader"></div>
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
            <div id="myOpportunities"></div>
        `;
    });

    // --- TEST 1: Rendering the Profile ---
    test('renderProfile correctly populates the DOM from localStorage', () => {
        const fakeUserData = {
            name: "Jane",
            surname: "Doe",
            email: "jane@example.com",
            role: "Applicant",
            applicant: { bio: "I am a software engineer." }
        };
        localStorage.setItem('userData', JSON.stringify(fakeUserData));

        renderProfile();

        expect(document.getElementById('displayFirstName').textContent).toBe('Jane');
        expect(document.getElementById('displayLastName').textContent).toBe('Doe');
        expect(document.getElementById('topName').textContent).toBe('Jane Doe');
        expect(document.getElementById('displayBio').textContent).toBe('I am a software engineer.');
        expect(document.getElementById('editFirstName').value).toBe('Jane');
    });

    // --- TEST 2: The Master Save Function ---
    test('saveProfileChanges sends PUT request and updates localStorage', async () => {
        localStorage.setItem('firebase_uid', 'fake_uid_123');
        const fieldsToUpdate = { bio: "Updated Bio!" };
        const mockApiResponse = { user: { name: "Jane", applicant: { bio: "Updated Bio!" } } };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockApiResponse
        });

        const success = await saveProfileChanges(fieldsToUpdate);

        expect(success).toBe(true);
        expect(fetch).toHaveBeenCalledWith('/api/profile/fake_uid_123', expect.objectContaining({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fieldsToUpdate)
        }));
        expect(localStorage.setItem).toHaveBeenCalledWith('firebase_uid', 'fake_uid_123');
        expect(localStorage.setItem).toHaveBeenCalledWith('userData', JSON.stringify(mockApiResponse));
    });

    // --- TEST 3: Handling Save Errors ---
    test('saveProfileChanges handles API errors gracefully', async () => {
        localStorage.setItem('firebase_uid', 'fake_uid_123');

        fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({ error: "Database down" })
        });

        const success = await saveProfileChanges({ name: "Fail" });

        expect(success).toBe(false);
        expect(localStorage.setItem).not.toHaveBeenCalledWith('userData', expect.anything());
    });

    // --- TEST 4: The Mock CV Upload ---
    test('uploadCV fakes an upload, updates UI, and stores file name', async () => {
        const fileInput = document.getElementById('cvFile');
        const msgBox = document.getElementById('cvUploadMsg');

        const fakeFile = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });
        Object.defineProperty(fileInput, 'files', { value: [fakeFile] });

        localStorage.setItem('userData', JSON.stringify({ name: "Jane" }));

        uploadCV();

        expect(msgBox.innerHTML).toContain('Uploading...');

        jest.advanceTimersByTime(1500);

        expect(msgBox.innerHTML).toContain('CV Uploaded Successfully!');
        const updatedData = JSON.parse(localStorage.getItem.mock.results.slice(-1)[0].value);
        expect(updatedData.cvName).toBe('resume.pdf');
    });

    // --- TEST 5: CV Upload Empty State ---
    test('uploadCV fails if no file is selected', () => {
        const msgBox = document.getElementById('cvUploadMsg');
        uploadCV();
        expect(msgBox.innerHTML).toContain('Please select a file first.');
    });

    describe('Frontend UI Controls (Tabs & Modals)', () => {

        beforeEach(() => {
            document.body.innerHTML = `
            <div id="loader"></div> 
            
            <span id="topName"></span>
            <span id="topRole"></span>

            <input id="listTypeFilter" value="all" />

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

            Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
            window.getAllOpportunities = jest.fn(() => []);
            window.fetchOpportunities = jest.fn(); 
        });

        // --- TAB TESTS ---
        test('showTab("opportunities") should activate correct tab and run render function', () => {
            showTab('opportunities');
            expect(document.getElementById('tab-opps').classList.contains('active')).toBe(true);
            expect(document.getElementById('opportunitiesTab').classList.contains('active')).toBe(true);
            expect(document.getElementById('tab-apps').classList.contains('active')).toBe(false);
        });

        test('showTab("applications") should activate correct tab and run render function', () => {
            showTab('applications');
            expect(document.getElementById('tab-apps').classList.contains('active')).toBe(true);
            expect(document.getElementById('applicationsTab').classList.contains('active')).toBe(true);
        });

        test('showTab("profile") should activate correct tab and run render function', () => {
            Storage.prototype.getItem = jest.fn(() => JSON.stringify({
                name: "Test", surname: "User", email: "test@test.com"
            }));

            showTab('profile');
            expect(document.getElementById('tab-profile').classList.contains('active')).toBe(true);
            expect(document.getElementById('profileTab').classList.contains('active')).toBe(true);
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