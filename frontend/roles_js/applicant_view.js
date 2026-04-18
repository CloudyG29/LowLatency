let currentUser = null;
const fakeStatuses = { 1: "Pending", 2: "Hired", 3: "Rejected", 4: "Pending" };

// --- Utility Functions for Applications ---
function getApplications() {
  return JSON.parse(localStorage.getItem("applications") || "[]");
}

// Check if the user has already applied to a specific opportunity by its ID
function hasApplied(id) {
  return getApplications().some((a) => a.opportunityId == id);
}

async function getAllOpportunities() {
  const response = await fetch("/api/listings/approved");
  const listings = await response.json();
  return listings;
}
function renderApplications() {
  const applications = getApplications();
  const container = document.getElementById("applicationsList");

  if (applications.length === 0) {
    container.innerHTML =
      '<div class="empty-state">😕 You have not applied to any opportunities yet.</div>';
    return;
  }

  container.innerHTML = "";
  applications.forEach((app) => {
    const div = document.createElement("div");
    div.className = "application-card";
    div.innerHTML = `
            <div class="application-info">
                <h3>${app.title}</h3>
                <p>Applied on ${app.appliedDate}</p>
            </div>
            <span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span>
        `;
    container.appendChild(div);
  });
}
async function renderOpportunities() {
  const container = document.getElementById("opportunitiesList");
  container.innerHTML = "";
  const allOpps = await getAllOpportunities();

  allOpps.forEach((opp) => {
    const card = document.createElement("div");
    card.className = "opportunity-card";
    const applied = hasApplied(opp.listings_id);
    card.innerHTML = `
            <h3>${opp.listname}</h3>
            <p><strong>Provider:</strong> ${opp.provider.provider_name}</p>
            <p><strong>Type:</strong> ${opp.list_type}</p>
            <p><strong>NQF Level:</strong> ${opp.nqf_level || "N/A"}</p>
            <p><strong>Description:</strong> ${opp.description || "N/A"}</p>
            ${
              applied
                ? `<div class="already-applied">✅ Already Applied</div>`
                : `<button class="apply-btn" data-id="${opp.listings_id}" data-title="${opp.listname}">Apply Now</button>`
            }
            <div id="msg-${opp.listings_id}" class="message"></div>
        `;
    container.appendChild(card);
  });

  document.querySelectorAll(".apply-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const title = btn.getAttribute("data-title");
      let applications = getApplications();
      applications.push({
        opportunityId: id,
        title,
        appliedDate: new Date().toLocaleDateString(),
        status: "Pending",
      });
      localStorage.setItem("applications", JSON.stringify(applications));
      document.getElementById(`msg-${id}`).innerHTML =
        "✅ Application submitted!";
      setTimeout(() => renderOpportunities(), 1000);
    });
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
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));

  if (tabName === "opportunities") {
    document.querySelector(".tab:first-child").classList.add("active");
    document.getElementById("opportunitiesTab").classList.add("active");
    renderOpportunities();
  } else {
    document.querySelector(".tab:last-child").classList.add("active");
    document.getElementById("applicationsTab").classList.add("active");
    renderApplications();
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    renderOpportunities();
  } else {
    window.location.href = "/login";
  }
});
