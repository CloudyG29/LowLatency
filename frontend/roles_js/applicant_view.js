const hardcodedOpportunities = [
    { id: 1, title: "Software Internship", company: "Amazon", location: "Johannesburg, Sandton", duration: "12 months", stipend: "R5000/month", description: "A beginner-friendly internship for aspiring software developers." },
    { id: 2, title: "Data Science Learnership", company: "Microsoft", location: "Cape Town", duration: "18 months", stipend: "R6000/month", description: "Learn data analysis, machine learning, and AI fundamentals." },
    { id: 3, title: "Finance Internship", company: "Standard Bank", location: "Johannesburg", duration: "12 months", stipend: "R5500/month", description: "Gain experience in banking, accounting, and financial analysis." },
    { id: 4, title: "Marketing Learnership", company: "Nike", location: "Cape Town", duration: "6 months", stipend: "R4000/month", description: "Learn digital marketing, social media management, and brand strategy." }
];

const fakeStatuses = { 1: 'Pending', 2: 'Hired', 3: 'Rejected'};

// --- Utility Functions for Applications ---
function getApplications() {
    return JSON.parse(localStorage.getItem('applications') || '[]');
}

// Check if the user has already applied to a specific opportunity by its ID
function hasApplied(id) {
    return getApplications().some(a => a.opportunityId == id);
}

// Combine hardcoded opportunities with provider-submitted ones from localStorage, filtering for approved status and assigning unique IDs
function getAllOpportunities() {
    const providerOpps = JSON.parse(localStorage.getItem('providerOpportunities') || '[]')
        .filter(o => o.status === 'approved')
        .map((o, i) => ({ ...o, id: 'p' + i }));
    return [...hardcodedOpportunities, ...providerOpps];
}

// --- Render the Opportunities Tab with Real Data from localStorage (including provider-submitted ones) ---
function renderOpportunities() {
    const container = document.getElementById('opportunitiesList');
    container.innerHTML = '';
    const allOpps = getAllOpportunities();

    allOpps.forEach(opp => {
        const card = document.createElement('div');
        card.className = 'opportunity-card';
        const applied = hasApplied(opp.id);
        card.innerHTML = `
            <h3>${opp.title}</h3>
            <p><strong>Company:</strong> ${opp.company}</p>
            <p><strong>Location:</strong> ${opp.location}</p>
            <p><strong>Duration:</strong> ${opp.duration}</p>
            <p><strong>Stipend:</strong> ${opp.stipend}</p>
            <p><strong>Description:</strong> ${opp.description}</p>
            ${applied
                ? `<div class="already-applied">Already Applied</div>`
                : `<button class="apply-btn" data-id="${opp.id}" data-title="${opp.title}" data-company="${opp.company}">Apply Now</button>`
            }
            <div id="msg-${opp.id}" class="message"></div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const title = btn.getAttribute('data-title');
            const company = btn.getAttribute('data-company');

            // Get applicant name from userData
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const applicantName = (userData.firstName || '') + ' ' + (userData.lastName || '');

            let applications = getApplications();
            applications.push({
                opportunityId: id,
                title: title,
                company: company,
                applicantName: applicantName.trim() || 'Anonymous',
                applicantEmail: userData.email || '',
                appliedDate: new Date().toLocaleDateString(),
                status: fakeStatuses[id] || 'Pending'
            });
            localStorage.setItem('applications', JSON.stringify(applications));
            document.getElementById(`msg-${id}`).innerHTML = 'Application submitted!';
            setTimeout(() => renderOpportunities(), 1000);
        });
    });
}

// --- Render the Applications Tab with Real Data from localStorage ---
function renderApplications() {
    const applications = getApplications();
    const container = document.getElementById('applicationsList');

    if (applications.length === 0) {
        container.innerHTML = '<div class="empty-state">You have not applied to any opportunities yet.</div>';
        return;
    }

    container.innerHTML = '';
    applications.forEach(app => {
        const div = document.createElement('div');
        div.className = 'application-card';
        div.innerHTML = `
            <div class="application-info">
                <h3>${app.title}</h3>
                <p>${app.company} · Applied on ${app.appliedDate}</p>
            </div>
            <span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span>
        `;
        container.appendChild(div);
    });
}

// --- Toggle between View and Edit Modes in the Profile Tab ---
function toggleProfileMode(mode) {
    const displayMode = document.getElementById('profileDisplayMode');
    const editMode = document.getElementById('profileForm');

    if (mode === 'edit') {
        displayMode.style.display = 'none';
        editMode.style.display = 'block';
        document.getElementById('displayMsg').innerHTML = ''; // Clear old messages
    } else {
        displayMode.style.display = 'block';
        editMode.style.display = 'none';
    }
}

// --- Render Profile Data ---
function renderProfile() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Populate the View Mode (Read-Only)
    document.getElementById('displayFirstName').textContent = userData.firstName || 'Not set';
    document.getElementById('displayLastName').textContent = userData.lastName || 'Not set';
    document.getElementById('displayEmail').textContent = userData.email || 'Not set';
    document.getElementById('topName').textContent = `${userData.firstName || ''} ${userData.lastName || ''}`;
    document.getElementById('topRole').textContent = userData.role || 'Applicant';

    // For the bio, if it's empty or just whitespace, show a default message instead of a blank space
    if (userData.bio && userData.bio.trim() !== '') {
        document.getElementById('displayBio').textContent = userData.bio;
    } else {
        document.getElementById('displayBio').textContent = 'No professional summary added yet.';
    }

    // Populate the Edit Mode Form Inputs
    document.getElementById('firstName').value = userData.firstName || '';
    document.getElementById('lastName').value = userData.lastName || '';
    document.getElementById('email').value = userData.email || '';


    // For the CV file input, we can't set a value for security reasons, but we can show the current file name if it exists
    const currentCvDisplay = document.getElementById('currentCvDisplay');
    if (userData.cvName) {
        currentCvDisplay.innerHTML = `Current file: ${userData.cvName}`;
    } else {
        currentCvDisplay.innerHTML = "";
    }

    // Ensure we start in View Mode whenever the tab is opened
    toggleProfileMode('view');
}

// --- 3. Handle the Form Submission (Save Data) ---
// This runs once when the page loads to attach the event listener
document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');

    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Stop page from refreshing

            // Grab the values from the inputs
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const cvFileInput = document.getElementById('cvFile');

            // Get existing data so we don't accidentally delete anything else
            let userData = JSON.parse(localStorage.getItem('userData') || '{}');

            // Update the data
            userData.firstName = firstName.trim();
            userData.lastName = lastName.trim();
            userData.email = email.trim();

            // Mock the file upload (just save the file name)
            if (cvFileInput.files.length > 0) {
                userData.cvName = cvFileInput.files[0].name;
            }

            // Save it back to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            // Re-render data, switch back to View Mode automatically
            renderProfile();

            // Show a success message
            const msgBox = document.getElementById('displayMsg');
            msgBox.innerHTML = 'Profile updated successfully!';
            msgBox.style.color = "#38ef7d"; // Theme green
        });
    }
});

// --- 1. Fix the showTab function to correctly handle the profile ---
function showTab(tabName) {
    // Hide all tabs and contents
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // Show the selected tab and its content
    if (tabName === 'opportunities') {
        // Fallback to querySelector if you don't have IDs on your tab buttons
        const tabBtn = document.getElementById('tab-opps') || document.querySelectorAll('.tab')[0];
        if (tabBtn) tabBtn.classList.add('active');

        document.getElementById('opportunitiesTab').classList.add('active');
        renderOpportunities();

    } else if (tabName === 'applications') {
        const tabBtn = document.getElementById('tab-apps') || document.querySelectorAll('.tab')[1];
        if (tabBtn) tabBtn.classList.add('active');

        document.getElementById('applicationsTab').classList.add('active');
        renderApplications();

    } else if (tabName === 'profile') {
        const tabBtn = document.getElementById('tab-profile') || document.querySelectorAll('.tab')[2];
        if (tabBtn) tabBtn.classList.add('active');

        document.getElementById('profileTab').classList.add('active');
        renderProfile(); // Load saved data when tab is opened
    }
}



// --- 3. Handle the Profile Form Submission ---
document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profileForm');

    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            // Grab the values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const cvFileInput = document.getElementById('cvFile');

            // Get existing data so we don't overwrite everything
            let userData = JSON.parse(localStorage.getItem('userData') || '{}');

            // Update data
            userData.firstName = firstName.trim();
            userData.lastName = lastName.trim();
            userData.email = email.trim();

            // Mock the file upload (just save the file name)
            if (cvFileInput.files.length > 0) {
                userData.cvName = cvFileInput.files[0].name;
            }

            // Save back to localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            // Show success message and re-render to show updated CV text
            document.getElementById('profileMsg').innerHTML = 'Profile saved successfully!';
            document.getElementById('profileMsg').style.color = "green";
            renderProfile();
        });
    }
});

// --- Modal Controls ---
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// --- Official SAQA NQF Framework Data ---
// Source: South African Qualifications Authority (SAQA) National Learners' Records Database
const nqfData = [
    { level: 1, title: "NQF Level 1", description: "Grade 9 / General Certificate" },
    { level: 2, title: "NQF Level 2", description: "Grade 10 / National Certificate (Vocational) Level 2" },
    { level: 3, title: "NQF Level 3", description: "Grade 11 / National Certificate (Vocational) Level 3" },
    { level: 4, title: "NQF Level 4", description: "Grade 12 (Matric) / National Senior Certificate" },
    { level: 5, title: "NQF Level 5", description: "Higher Certificate / Advanced National (Vocational) Cert." },
    { level: 6, title: "NQF Level 6", description: "Diploma / Advanced Certificate" },
    { level: 7, title: "NQF Level 7", description: "Bachelor's Degree / Advanced Diploma" },
    { level: 8, title: "NQF Level 8", description: "Honours Degree / Post Graduate Diploma" },
    { level: 9, title: "NQF Level 9", description: "Master's Degree" },
    { level: 10, title: "NQF Level 10", description: "Doctoral Degree" }
];

// --- Dynamic Education Entries ---
let educationCounter = 0;

// Add a new education entry row to the modal form
function addEducationRow() {
    educationCounter++;
    const container = document.getElementById('educationListContainer');

    // Create the HTML for a single qualification entry
    const entryDiv = document.createElement('div');
    entryDiv.className = 'education-entry';
    entryDiv.id = `edu_entry_${educationCounter}`;

    // Generate the NQF Dropdown Options from our SAQA data
    let nqfOptions = `<option value="">Select NQF Level & Qualification...</option>`;
    nqfData.forEach(nqf => {
        nqfOptions += `<option value="${nqf.level}">NQF Level ${nqf.level} - ${nqf.description}</option>`;
    });

    entryDiv.innerHTML = `
        <button type="button" class="btn-remove-entry" onclick="removeEducationRow('${entryDiv.id}')">Remove</button>
        <div class="form-group">
            <label>Institution Name</label>
            <input type="text" class="edu-institution" placeholder="e.g. University of Cape Town" required>
        </div>
        <div class="form-group">
            <label>NQF Level & Qualification Type</label>
            <select class="edu-nqf" required>
                ${nqfOptions}
            </select>
        </div>
        <div class="form-group">
            <label>Graduation Year</label>
            <input type="number" class="edu-year" min="1950" max="2030" placeholder="YYYY" required>
        </div>
    `;

    container.appendChild(entryDiv);
}


// Remove an education entry row by its ID
function removeEducationRow(rowId) {
    const row = document.getElementById(rowId);
    if (row) row.remove();
}

// --- Prepare the Education Modal with Existing Data ---
function prepEducationInfoModal() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const container = document.getElementById('educationListContainer');

    // Clear existing rows
    container.innerHTML = '';
    educationCounter = 0;

    // If user has saved education → rebuild rows
    if (userData.education && userData.education.length > 0) {
        userData.education.forEach(edu => {
            addEducationRow();

            const lastEntry = container.lastElementChild;

            lastEntry.querySelector('.edu-institution').value = edu.institution;
            lastEntry.querySelector('.edu-nqf').value = edu.nqfLevel;
            lastEntry.querySelector('.edu-year').value = edu.graduationYear;
        });
    } else {
        // If no data, start with one empty row
        addEducationRow();
    }

    openModal('educationInfoModal');
}

// --- Personal Info Modal ---
function prepPersonalInfoModal() {
    // 1. Get the current data from local storage
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // 2. Target the input fields and set their VALUES to the existing data
    document.getElementById('editFirstName').value = userData.firstName || '';
    document.getElementById('editLastName').value = userData.lastName || '';
    document.getElementById('editEmail').value = userData.email || '';
    document.getElementById('editRole').value = userData.role || 'Applicant';

    // For fields that might be totally new (like phone and DOB)
    document.getElementById('editPhone').value = userData.phone || '';
    document.getElementById('editPhone').placeholder = 'Not set';

    document.getElementById('editDob').value = userData.dob || '';

    // 3. Finally, open the modal!
    openModal('personalInfoModal');
}

/// --- Save Personal Info from Modal ---
function savePersonalInfo() {
    // 1. Get the existing local storage data so we don't overwrite the whole thing
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // 2. Update it with the new values from the modal
    userData.firstName = document.getElementById('editFirstName').value;
    userData.lastName = document.getElementById('editLastName').value;
    userData.phone = document.getElementById('editPhone').value;
    userData.dob = document.getElementById('editDob').value;

    // 3. Save it back to local storage
    localStorage.setItem('userData', JSON.stringify(userData));

    // 4. Update the UI instantly so they see the change
    document.getElementById('displayFirstName').textContent = userData.firstName || 'Not set';
    document.getElementById('displayLastName').textContent = userData.lastName || 'Not set';
    // Update the top header card too
    document.getElementById('topName').textContent = `${userData.firstName} ${userData.lastName}`;

    // 5. Close the modal
    closeModal('personalInfoModal');

    // 6. Show a success message
    alert('Profile updated successfully!');
}

/// --- Save Education Info from Modal ---
function saveEducationInfo() {

    // 1. Get the existing local storage data so we don't overwrite the whole thing
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    // 2. Gather all the education entries from the modal
    const educationEntries = document.getElementsByClassName('education-entry');
    userData.education = []; // Reset the education array

    // Loop through each entry and extract the values, then push them into the userData.education array
    for (let entry of educationEntries) {
        const institution = entry.querySelector('.edu-institution').value;
        const nqfLevel = entry.querySelector('.edu-nqf').value;
        const graduationYear = entry.querySelector('.edu-year').value;

        if (institution && nqfLevel && graduationYear) {
            userData.education.push({
                institution,
                nqfLevel,
                graduationYear
            });
        }
    }

    // 3. Save it back to local storage
    localStorage.setItem('userData', JSON.stringify(userData));

    // 4. Close the modal
    closeModal('educationInfoModal');

    // 5. Re-render the education display to show the new data
    renderEducationDisplay();

}


// --- Display the Education Data in the Profile View ---
function renderEducationDisplay() {
    const container = document.getElementById('educationDisplayContainer');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // If no education data exists, show a friendly message instead of an empty section
    if (!userData.education || userData.education.length === 0) {
        container.innerHTML = `
        <div class="card-grid">
        <div class="data-group">
            <span class="data-label">Institution</span>
            <span class="data-value" id="displayInstitution">Not set</span>
        </div>
        <div class="data-group">
            <span class="data-label">Degree / Qualification</span>
            <span class="data-value" id="displayDegree">Not set</span>
        </div>
        <div class="data-group">
            <span class="data-label">Graduation Year</span>
            <span class="data-value" id="displayGradYear">Not set</span>
        </div>
    </div>
        `;
        return;
    }

    container.innerHTML = '';

    // Loop through each education entry and create a block for it
    userData.education.forEach(edu => {
        const block = document.createElement('div');
        block.className = 'education-block';

        block.innerHTML = `
            <div class="card-grid">
        <div class="data-group">
            <span class="data-label">Institution</span>
            <span class="data-value" id="displayInstitution">${edu.institution}</span>
        </div>
        <div class="data-group">
            <span class="data-label">Degree / Qualification</span>
            <span class="data-value" id="displayDegree">${edu.degree || 'NQF Level ' + edu.nqfLevel}</span>
        </div>
        <div class="data-group">
            <span class="data-label">Graduation Year</span>
            <span class="data-value" id="displayGradYear">${edu.graduationYear}</span>
        </div>
    </div>
    <br/>
    <br/>
    <hr/>
        `;

        container.appendChild(block);
    });
}

// --- Bio Modal ---
function prepBioModal() {
    // 1. Get current data
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // 2. Set the textarea value
    document.getElementById('editBioText').value = userData.bio || '';

    // 3. Open the modal
    openModal('bioModal');
}

function saveBio() {
    // 1. Get existing data
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // 2. Update the bio with the new text
    userData.bio = document.getElementById('editBioText').value;

    // 3. Save back to local storage
    localStorage.setItem('userData', JSON.stringify(userData));

    // 4. Update the UI
    // If they wiped it blank, show the default message again
    if (userData.bio.trim() === '') {
        document.getElementById('displayBio').textContent = 'No professional summary added yet.';
    } else {
        document.getElementById('displayBio').textContent = userData.bio;
    }

    // 5. Close the modal
    closeModal('bioModal');
}

// --- Initial Render when Page Loads ---
renderOpportunities();
renderEducationDisplay();