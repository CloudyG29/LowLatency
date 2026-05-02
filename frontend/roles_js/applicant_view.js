let currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

// DATABASE FUNCTIONS
async function renderApplications() {
  showLoader();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const container = document.getElementById("applicationsList");
  container.innerHTML = '<div class="empty-state"> Loading...</div>';
  try {
    const response = await fetch(`/api/listings/my-applications?email=${userData.email}`);
    const applications = await response.json();

    if (applications.length === 0) {
      container.innerHTML = '<div class="empty-state"> You have not applied to any opportunities yet.</div>';
      hideLoader();
      return;
    }

    container.innerHTML = "";
    applications.forEach((app) => {
      const div = document.createElement("div");
      div.className = "application-card";
      div.innerHTML = `
        <div class="application-info">
          <h3>${app.listing.listname}</h3>
          <p><strong>Type:</strong> ${app.listing.list_type}</p>
          <p><strong>Applied on:</strong> ${new Date(app.created_at).toDateString()}</p>
        </div>
        <span class="status-badge status-${app.status}">${app.status}</span>
      `;
      container.appendChild(div);
    });
    hideLoader();
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Error loading applications.</div>';
    hideLoader();
  }

}

function renderProfile() {
  showLoader();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  // 1. View Mode 
  document.getElementById('displayFirstName').textContent = userData.name || 'Not set';
  document.getElementById('displayLastName').textContent = userData.surname || 'Not set';
  document.getElementById('displayEmail').textContent = userData.email || 'Not set';

  const fullName = `${userData.name || ''} ${userData.surname || ''}`.trim();
  document.getElementById('topName').textContent = fullName !== '' ? fullName : 'Not set';

  document.getElementById('topRole').textContent = userData.role || 'Applicant';

  // 2. Safe Bio Check - Protects against "applicant: null"
  // We check IF applicant exists FIRST before trying to read .bio
  const applicantData = userData.applicant || {};
  const bioText = (applicantData && applicantData.bio) ? applicantData.bio : '';

  if (bioText.trim() !== '') {
    document.getElementById('displayBio').textContent = bioText;
  } else {
    document.getElementById('displayBio').textContent = 'No professional summary added yet.';
  }

  // 3. Edit Mode Inputs - UPDATED to use .name and .surname
  const firstNameInput = document.getElementById('editFirstName');
  const lastNameInput = document.getElementById('editLastName');
  const emailInput = document.getElementById('editEmail');

  if (firstNameInput) firstNameInput.value = userData.name || '';
  if (lastNameInput) lastNameInput.value = userData.surname || '';
  if (emailInput) emailInput.value = userData.email || '';

  // 4. CV Display
  const currentCvDisplay = document.getElementById('currentCvDisplay');
  if (currentCvDisplay) {
    if (userData.cvName) {
      currentCvDisplay.innerHTML = `Current file: ${userData.cvName}`;
    } else {
      currentCvDisplay.innerHTML = "";
    }
  }

  // Ensure we start in View Mode whenever the tab is opened
  // toggleProfileMode('view');

  hideLoader();
}

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
    fetchOpportunities(this.document.getElementById("listTypeFilter").value);

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


// --- Modal Controls ---
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

const nqfData = [
  { level: 1, description: "Grade 9 / General Certificate" },
  { level: 2, description: "Grade 10 / National Certificate (Vocational) Level 2" },
  { level: 3, description: "Grade 11 / National Certificate (Vocational) Level 3" },
  { level: 4, description: "Grade 12 (Matric) / National Senior Certificate" },
  { level: 5, description: "Higher Certificate / Advanced National (Vocational) Cert." },
  { level: 6, description: "Diploma / Advanced Certificate" },
  { level: 7, description: "Bachelor's Degree / Advanced Diploma" },
  { level: 8, description: "Honours Degree / Post Graduate Diploma" },
  { level: 9, description: "Master's Degree" },
  { level: 10, description: "Doctoral Degree" }
];

let educationCounter = 0;

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

function removeEducationRow(rowId) {
  const row = document.getElementById(rowId);
  if (row) row.remove();
}

function prepEducationInfoModal() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const container = document.getElementById('educationListContainer');
  const applicantData = userData.applicant || {};
  const educationList = applicantData.formattedQualifications || [];

  // Clear existing rows
  container.innerHTML = '';
  educationCounter = 0;

  // If user has saved education → rebuild rows
  if (educationList && educationList.length > 0) {
    educationList.forEach(edu => {
      addEducationRow();

      const lastEntry = container.lastElementChild;

      lastEntry.querySelector('.edu-institution').value = edu.institution;
      lastEntry.querySelector('.edu-nqf').value = edu.nqf_level;
      lastEntry.querySelector('.edu-year').value = edu.year_completed;
    });
  } else {
    // If no data, start with one empty row
    addEducationRow();
  }

  openModal('educationInfoModal');
}

function prepPersonalInfoModal() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const applicantData = userData.applicant || {}; // Defensively unpack!

  document.getElementById('editFirstName').value = userData.name || '';
  document.getElementById('editLastName').value = userData.surname || '';
  document.getElementById('editEmail').value = userData.email || '';

  // Safely grab from the nested applicant table
  document.getElementById('editPhone').value = applicantData.phone || '';

  // Clean up Prisma's Date format for the HTML input (YYYY-MM-DD)
  const dob = applicantData.dob ? applicantData.dob.split('T')[0] : '';
  document.getElementById('editDob').value = dob;

  openModal('personalInfoModal');
}

async function savePersonalInfo() {
  // Just build a payload of what changed!
  const updatedFields = {
    name: document.getElementById('editFirstName').value,
    surname: document.getElementById('editLastName').value,
    phone: document.getElementById('editPhone').value,
    dob: document.getElementById('editDob').value
  };

  const success = await saveProfileChanges(updatedFields);

  if (success) {
    closeModal('personalInfoModal');
    alert('Profile updated successfully!');
  } else {
    alert("Failed to save Personal Info. Please try again.");
  }
}

// --- Save Education Info from Modal ---
async function saveEducationInfo() {
  const educationEntries = document.getElementsByClassName('education-entry');
  let educationData = [];

  // Gather education entries
  for (let entry of educationEntries) {
    const institution = entry.querySelector('.edu-institution').value;
    const nqfLevel = entry.querySelector('.edu-nqf').value;
    const graduationYear = entry.querySelector('.edu-year').value;

    if (institution && nqfLevel && graduationYear) {
      educationData.push({
        institution: institution.trim(),
        // Convert strings from the HTML inputs into integers for Prisma!
        nqf_level: parseInt(nqfLevel, 10),
        year_completed: parseInt(graduationYear, 10)
      });
    }
  }

  // Pass the payload strictly using the key 'qualifications' 
  const success = await saveProfileChanges({
    qualifications: educationData
  });

  if (success) {
    closeModal('educationInfoModal');
    // renderProfile() is already called in saveProfileChanges, 
    alert('Education information updated successfully!');
    renderEducationDisplay();
  } else {
    // Always good to have a fallback error message just in case
    alert("Failed to save Education info. Please try again.");
  }
}

function renderEducationDisplay() {
  const container = document.getElementById('educationDisplayContainer');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const applicantData = userData.applicant || {};
  const educationList = applicantData.formattedQualifications || [];

  // If no education data exists, show a friendly message instead of an empty section
  if (!educationList || educationList.length === 0) {
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
  educationList.forEach(edu => {
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

function prepBioModal() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const applicantData = userData.applicant || {}; // Defensively unpack!

  document.getElementById('editBioText').value = applicantData.bio || '';
  openModal('bioModal');
}

async function saveBio() {
  const newBio = document.getElementById('editBioText').value;

  // Send ONLY what needs updating to the master function
  const success = await saveProfileChanges({ bio: newBio });

  if (success) {
    closeModal('bioModal');
    // No need to manually update the UI text here, 
    // because saveProfileChanges() calls renderProfile() for you automatically!
    alert('Bio updated successfully!');
  } else {
    alert("Failed to save bio. Please try again.");
  }
}

// The Master Save Function
async function saveProfileChanges(fieldsToUpdate) {
  showLoader();
  const firebaseUid = localStorage.getItem('firebase_uid');

  if (!firebaseUid) {
    alert("User not logged in!");
    return;
  }

  try {
    // 1. SEND TO DATABASE 
    const response = await fetch(`/api/profile/${firebaseUid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldsToUpdate) // Pass whatever fields we are updating!
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update database.");
    }

    // 2. UPDATE LOCAL STORAGE
    const freshProfileData = await response.json();
    localStorage.setItem('userData', JSON.stringify(freshProfileData));
    console.log("Successfully saved and synced to Local Storage!", freshProfileData);
    hideLoader();

    // 3. UPDATE THE UI
    renderProfile();

    // Return true so whatever button called this knows it worked!
    return true;

  } catch (error) {
    console.error("Error saving profile changes:", error);
    return false;
  }
}

// RIGHT: This is how our code is structured
async function loadDataOnStartup() {
  const firebaseUid = localStorage.getItem('firebase_uid');

  try {
    // 1. JS hits 'await' and PAUSES this function.
    // It waits here until the Express server sends the data back.
    const response = await fetch(`/api/profile/${firebaseUid}`);
    const profileData = await response.json();

    // 2. We save the fresh data locally
    localStorage.setItem('userData', JSON.stringify(profileData));

    // 3. FINALLY, we render. 
    renderProfile();
    renderEducationDisplay();
    fetchOpportunities(document.getElementById("listTypeFilter").value);
    renderApplications();

  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

async function uploadCV() {
  const fileInput = document.getElementById('cvFile');
  const msgBox = document.getElementById('cvUploadMsg');

  // 1. Check if the user actually selected a file
  if (fileInput.files.length === 0) {
    msgBox.innerHTML = "<span style='color: red;'>Please select a file first.</span>";
    return;
  }

  const file = fileInput.files[0];

  // Optional: Add a file size limit check on the frontend (e.g., max 5MB)
  const maxSizeInBytes = 5 * 1024 * 1024;
  if (file.size > maxSizeInBytes) {
    msgBox.innerHTML = "<span style='color: red;'>File is too large. Max size is 5MB.</span>";
    return;
  }

  // Show loading state
  msgBox.innerHTML = "<span style='color: blue;'>Uploading...</span>";

  // 2. Simulate a fake network delay so it feels like a real upload
  setTimeout(() => {
    // 3. Show success message
    msgBox.innerHTML = "<span style='color: green;'>CV Uploaded Successfully!</span>";

    // 4. Update local storage with just the file name so our UI can display it
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.cvName = file.name; // Save just the name, not the actual file!
    localStorage.setItem('userData', JSON.stringify(userData));

    // Re-render the profile to show the new CV text
    if (typeof renderProfile === 'function') {
      renderProfile();
    }

    // Optional: clear the file input after successful "upload"
    fileInput.value = '';

    // Optional: fade out the success message after 3 seconds
    setTimeout(() => {
      msgBox.innerHTML = '';
    }, 3000);

  }, 1500); // 1.5 second fake delay
}


// --- Loader Controls ---
function showLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
}


// Function to fetch and render opportunities based on type
async function fetchOpportunities(type = "") {
  
  const container = document.getElementById("opportunitiesList");
  // const userEmail = localStorage.getItem("userEmail"); // Get current user's email from login context [cite: 3]
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userEmail = userData.email || ""; // Fallback if email is not set in localStorage
  // Show loading state while fetching
  showLoader();
  container.innerHTML = '<div class="empty-state">Loading opportunities...</div>';

  try {
    // Build the URL with the type filter and userEmail to check application status [cite: 3]
    let url = `/api/listings/approved?userEmail=${encodeURIComponent(userEmail)}`;
    if (type && type !== "") {
      url += `&type=${encodeURIComponent(type)}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch opportunities");

    const listings = await response.json();
    container.innerHTML = ""; // Clear current list

    if (listings.length === 0) {
      container.innerHTML = '<div class="empty-state">No available opportunities found for this category.</div>';
      hideLoader();
      return;
    }

    // Render each card using classes defined in your CSS [cite: 2]
    listings.forEach((listing) => {
      const card = document.createElement("div");
      card.className = "opportunity-card";

      // Logic to check if the user has already applied (requires backend support) [cite: 3]
      const hasApplied = listing.hasApplied || (listing.applications && listing.applications.length > 0);

      const actionUI = hasApplied
        ? `<div class="already-applied">✅ Already Applied</div>`
        : `<button class="apply-btn" onclick="applyForListing(${listing.listings_id})">Apply Now</button>`;

      card.innerHTML = `
                <h3 class="opportunity-title">${listing.listname}</h3>
                <div class="opportunity-details">
                    <p><strong>Provider:</strong> ${listing.provider?.provider_name || "N/A"}</p>
                    <p><strong>Type:</strong> ${listing.list_type}</p>
                    <p><strong>Location:</strong> ${listing.location || "N/A"}</p>
                    <p><strong>Stipend:</strong> R${listing.stipend || "0.00"}</p>
                    <p><strong>Duration:</strong> ${listing.duration || "N/A"}</p>
                    <p><strong>NQF Level:</strong> ${listing.nqf_level || "N/A"}</p>
                    <p><strong>Closing Date:</strong> ${listing.closing_date ? new Date(listing.closing_date).toDateString() : "N/A"}</p>
                    <p><strong>Description:</strong> ${listing.description || "No description provided."}</p>
                </div>
                ${actionUI}
            `;
      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error fetching opportunities:", error);
    container.innerHTML = '<div class="empty-state">Error loading opportunities. Please try again later.</div>';
  }

  hideLoader();
}

async function applyForListing(listingId) {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  try {
    const response = await fetch("/api/listings/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        listing_id: listingId,
        email: userData.email
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Application failed");
    }

    alert("Applied successfully!");
    fetchOpportunities(); // refresh UI

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

// Global filter function triggered by the dropdown [cite: 2]
// window.applyTypeFilter = function() {
//     const selectedType = document.getElementById("listTypeFilter").value;
//     fetchOpportunities(selectedType);
// };

// --- JEST TESTING EXPORTS & BROWSER STARTUP ---
if (typeof module !== 'undefined' && module.exports) {
  // 🛑 WE ARE IN JEST: Just export the functions, do NOT run them yet.
  module.exports = {
    renderProfile,
    saveProfileChanges,
    uploadCV,
    renderApplications,
    fetchOpportunities,
    showTab,
    openModal,
    closeModal
  };
} else {
  // 🌐 WE ARE IN THE BROWSER: Safe to run startup scripts and manipulate the DOM!

  // Move your loose function calls inside here:
  // renderOpportunities();
  // renderApplications();
  renderEducationDisplay();
  loadDataOnStartup();
}