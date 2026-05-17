let currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

const db = firebase.firestore();

async function guardApplicantPage() {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (!user) {
          window.location.assign("/login");
          return resolve(false);
        }

        const token = await user.getIdToken();

        const response = await fetch(`/api/user/role?email=${encodeURIComponent(user.email)}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          await firebase.auth().signOut().catch(() => { });
          window.location.assign("/login");
          return resolve(false);
        }

        const data = await response.json();

        if (data.role !== "Applicant") {
          window.location.assign("/login");
          return resolve(false);
        }

        currentUser = user;

        resolve(true);
      } catch (error) {
        console.error("Applicant guard failed:", error);
        window.location.assign("/login");
        resolve(false);
      }
    });
  });
}

// DATABASE FUNCTIONS
async function renderApplications() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const container = document.getElementById("applicationsList");
  if (!container) return;

  container.innerHTML = '<div class="empty-state"> Loading...</div>';
  try {
    showLoader();
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
  let userData = JSON.parse(localStorage.getItem('userData') || '{}');

  document.getElementById('displayFirstName').textContent = userData.name || 'Not set';
  document.getElementById('displayLastName').textContent = userData.surname || 'Not set';
  document.getElementById('displayEmail').textContent = userData.email || 'Not set';

  const fullName = `${userData.name || ''} ${userData.surname || ''}`.trim();
  document.getElementById('topName').textContent = fullName !== '' ? fullName : 'Not set';
  document.getElementById('topRole').textContent = userData.role || 'Applicant';

  const applicantData = userData.applicant || {};
  const bioText = (applicantData && applicantData.bio) ? applicantData.bio : '';

  if (bioText.trim() !== '') {
    document.getElementById('displayBio').textContent = bioText;
  } else {
    document.getElementById('displayBio').textContent = 'No professional summary added yet.';
  }

  const firstNameInput = document.getElementById('editFirstName');
  const lastNameInput = document.getElementById('editLastName');
  const emailInput = document.getElementById('editEmail');

  if (firstNameInput) firstNameInput.value = userData.name || '';
  if (lastNameInput) lastNameInput.value = userData.surname || '';
  if (emailInput) emailInput.value = userData.email || '';

  const currentCvDisplay = document.getElementById('currentCvDisplay');
  if (currentCvDisplay) {
    if (userData.cvName) {
      currentCvDisplay.innerHTML = `Current file: ${userData.cvName}`;
    } else {
      currentCvDisplay.innerHTML = "";
    }
  }

  hideLoader();
}

function renderNotifications(notifications) {
  const container = document.getElementById("notificationsList");
  container.innerHTML = ""; // Clear out old data

  if (notifications.length === 0) {
    container.innerHTML = '<p class="empty-state">No new notifications.</p>';
    return;
  }

  notifications.forEach(notif => {
    const card = document.createElement("div");
    card.className = "notification-card";

    card.innerHTML = `
      <div class="notification-info">
        <h3>${notif.type || "Status Update"}</h3>
        <p><strong>Message:</strong> ${notif.message}</p>
        <p style="font-size: 12px; color: #a0aec0; margin-top: 8px;">${notif.time || "Just now"}</p>
      </div>
      <span class="status-badge ${notif.isRead ? 'status-read' : 'status-unread'}">
        ${notif.isRead ? 'read' : 'unread'}
      </span>
    `;

    card.onclick = () => markAsRead(notif.id);

    container.appendChild(card);
  });
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
    fetchOpportunities(document.getElementById("listTypeFilter").value);

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

  else if (tabName === 'notifications') {
    const tabBtn = document.getElementById('tab-notifications') || document.querySelectorAll('.tab')[3];
    if (tabBtn) tabBtn.classList.add('active');

    document.getElementById('notificationsTab').classList.add('active');

  }
}

// --- Modal Controls ---
function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('active');
}

// --- Education Modal ---
function prepEducationInfoModal() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const container = document.getElementById('educationListContainer');
  const applicantData = userData.applicant || {};
  const educationList = applicantData.formattedQualifications || [];

  container.innerHTML = '';

  if (educationList && educationList.length > 0) {
    educationList.forEach(edu => {
      addEducationRow({
        qualification_id: edu.qualification_id || '',
        name: edu.degree || '',
        nqf_level: edu.nqfLevel || edu.nqf_level || '',
        institution: edu.institution || '',
        year_completed: edu.graduationYear || edu.year_completed || ''
      });
    });
  } else {
    addEducationRow();
  }

  openModal('educationInfoModal');
}

async function saveEducationInfo() {
  const educationEntries = document.getElementsByClassName('education-row');
  let educationData = [];

  for (let entry of educationEntries) {
    const institution = entry.querySelector('.qual-institution').value;
    const nqfLevel = entry.querySelector('.qual-nqf').value;
    const graduationYear = entry.querySelector('.qual-year').value;
    const qualId = entry.querySelector('.qual-id').value;
    const qualName = entry.querySelector('.qual-name').value;

    if (institution && nqfLevel && graduationYear) {
      educationData.push({
        institution: institution.trim(),
        nqf_level: parseInt(nqfLevel, 10),
        year_completed: parseInt(graduationYear, 10),
        qualification_id: qualId ? parseInt(qualId, 10) : null,
        qualification_name: qualName || null
      });
    }
  }

  const success = await saveProfileChanges({ qualifications: educationData });

  if (success) {
    closeModal('educationInfoModal');
    alert('Education information updated successfully!');
    renderEducationDisplay();
  } else {
    alert("Failed to save Education info. Please try again.");
  }
}

function renderEducationDisplay() {
  const container = document.getElementById('educationDisplayContainer');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const applicantData = userData.applicant || {};
  const educationList = applicantData.formattedQualifications || [];

  if (!educationList || educationList.length === 0) {
    container.innerHTML = `
      <div class="card-grid">
        <div class="data-group">
          <span class="data-label">Institution</span>
          <span class="data-value">Not set</span>
        </div>
        <div class="data-group">
          <span class="data-label">Degree / Qualification</span>
          <span class="data-value">Not set</span>
        </div>
        <div class="data-group">
          <span class="data-label">Graduation Year</span>
          <span class="data-value">Not set</span>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  educationList.forEach(edu => {
    const block = document.createElement('div');
    block.className = 'education-block';
    block.innerHTML = `
      <div class="card-grid">
        <div class="data-group">
          <span class="data-label">Institution</span>
          <span class="data-value">${edu.institution}</span>
        </div>
        <div class="data-group">
          <span class="data-label">Degree / Qualification</span>
          <span class="data-value">${edu.degree || 'NQF Level ' + edu.nqfLevel}</span>
        </div>
        <div class="data-group">
          <span class="data-label">Graduation Year</span>
          <span class="data-value">${edu.graduationYear}</span>
        </div>
      </div>
      <br/><hr/>
    `;
    container.appendChild(block);
  });
}

function prepPersonalInfoModal() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const applicantData = userData.applicant || {};

  document.getElementById('editFirstName').value = userData.name || '';
  document.getElementById('editLastName').value = userData.surname || '';
  document.getElementById('editEmail').value = userData.email || '';
  document.getElementById('editPhone').value = applicantData.phone || '';

  const dob = applicantData.dob ? applicantData.dob.split('T')[0] : '';
  document.getElementById('editDob').value = dob;

  openModal('personalInfoModal');
}

async function savePersonalInfo() {
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

function prepBioModal() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const applicantData = userData.applicant || {};
  document.getElementById('editBioText').value = applicantData.bio || '';
  openModal('bioModal');
}

async function saveBio() {
  const newBio = document.getElementById('editBioText').value;
  const success = await saveProfileChanges({ bio: newBio });

  if (success) {
    closeModal('bioModal');
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
    const response = await fetch(`/api/profile/${firebaseUid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldsToUpdate)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update database.");
    }

    const freshProfileData = await response.json();
    localStorage.setItem('userData', JSON.stringify(freshProfileData));
    console.log("Successfully saved and synced to Local Storage!", freshProfileData);
    hideLoader();

    renderProfile();
    return true;

  } catch (error) {
    console.error("Error saving profile changes:", error);
    hideLoader();
    return false;
  }
}

async function loadDataOnStartup() {
  const firebaseUid = localStorage.getItem('firebase_uid');

  try {
    showLoader();
    const response = await fetch(`/api/profile/${firebaseUid}`);
    const profileData = await response.json();

    localStorage.setItem('userData', JSON.stringify(profileData));

    const allowed = await guardApplicantPage();
    if (!allowed) return;

    renderProfile();
    renderEducationDisplay();
    fetchOpportunities(document.getElementById("listTypeFilter").value);
    renderApplications();
    startNotificationListener(firebaseUid);
  } catch (error) {
    hideLoader();
    console.error("Error loading profile:", error);
  }
}

async function uploadCV() {
  const fileInput = document.getElementById('cvFile');
  const msgBox = document.getElementById('cvUploadMsg');

  if (fileInput.files.length === 0) {
    msgBox.innerHTML = "<span style='color: red;'>Please select a file first.</span>";
    return;
  }

  const file = fileInput.files[0];
  const maxSizeInBytes = 5 * 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    msgBox.innerHTML = "<span style='color: red;'>File is too large. Max size is 5MB.</span>";
    return;
  }

  msgBox.innerHTML = "<span style='color: blue;'>Uploading...</span>";

  setTimeout(() => {
    msgBox.innerHTML = "<span style='color: green;'>CV Uploaded Successfully!</span>";

    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData.cvName = file.name;
    localStorage.setItem('userData', JSON.stringify(userData));

    if (typeof renderProfile === 'function') {
      renderProfile();
    }

    fileInput.value = '';

    setTimeout(() => {
      msgBox.innerHTML = '';
    }, 3000);
  }, 1500);
}

// --- Loader Controls ---
function showLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
}


function getCompetition(count) {
  let level, text;

  if (count <= 10) {
    level = "low";
    text = "Low competition";
  } else if (count <= 30) {
    level = "moderate";
    text = "Moderate";
  } else if (count <= 75) {
    level = "high";
    text = "High competition";
  } else {
    level = "very-high";
    text = "Very high";
  }

  const label = count === 1 ? "1 applicant" : `${count} applicants`;

  return { label, level, text };
}

// Function to fetch and render opportunities based on type
async function fetchOpportunities(type = "") {
  const container = document.getElementById("opportunitiesList");
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const userEmail = userData.email || "";

  if (typeof window.showLoader === "function") window.showLoader();
  container.innerHTML = '<div class="empty-state">Loading opportunities...</div>';

  try {
    let url = `/api/listings/approved?userEmail=${encodeURIComponent(userEmail)}`;
    if (type && type !== "") {
      url += `&type=${encodeURIComponent(type)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch opportunities");
    }

    const listings = await response.json();
    container.innerHTML = "";

    if (listings.length === 0) {
      container.innerHTML = '<div class="empty-state">No available opportunities found for this category.</div>';
      return;
    }

    listings.forEach((listing) => {
      const card = document.createElement("div");
      const listingId = listing.listings_id;
      const isSaved = listing.isSaved;

      const saveButtonHtml = `
        <button 
          class="save-btn ${isSaved ? 'saved' : ''}" 
          onclick="toggleFavorite(${listingId}, this)"
          style="background: transparent; border: 1px solid #4a5568; color: #a0aec0; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-left: 10px;"
        >
          ${isSaved ? 'Saved' : 'Save'}
        </button>
      `;

      // FIX 1: Keep your new CSS class, but add the old one for the tests
      card.className = "opportunity-preview-card opportunity-card";

      let hasApplied = listing.hasApplied === true;

      if (!hasApplied && listing.applications) {
        hasApplied = listing.applications.some(app =>
          app.email === userEmail ||
          (app.user && app.user.email === userEmail)
        );
      }

      const actionUI = hasApplied
        ? `<div class="already-applied">Already Applied</div>`
        : `<button class="apply-btn" onclick="applyForListing(${listing.listings_id}, ${listing.nqf_level || 0})">Apply Now</button>`

      const applicantCount = listing.applicantCount ?? listing.applications?.length ?? 0;
      const competition = getCompetition(applicantCount);

      // Extract values from your competition object safely
      const compLevel = competition?.level || competition || "low";
      const compText = competition?.text || competition?.label || `${compLevel} competition`;

      card.innerHTML = `
      <div class="opportunity-preview-main">
        <div>
          <p class="opportunity-label">Opportunity</p>
          <h3 class="opportunity-title">${listing.listname}</h3>
          <p class="opportunity-subtext">${listing.provider?.provider_name || "N/A"}</p>
        </div>

        <div>
          <p class="opportunity-label">Details</p>
          <p class="opportunity-job">${listing.list_type || "N/A"} • ${listing.location || "N/A"}</p>
          <p class="opportunity-subtext">Closes ${listing.closing_date ? new Date(listing.closing_date).toDateString() : "N/A"}</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 10px; align-items: flex-end;">
          <span class="opportunity-pill">NQF ${listing.nqf_level || "N/A"}</span>
          
          <span class="opportunity-pill competition-badge competition-badge--${compLevel}" 
                role="status" 
                aria-label="${applicantCount} Applicants, ${compText}">
            ${applicantCount} Applicants
          </span>
        </div>
        
        <div class="opportunity-expanded-details hidden" style="margin-top: 15px; padding-top: 10px; border-top: 1px solid #eee; width: 100%; grid-column: 1 / -1;">
           <p><strong>Stipend:</strong> R${listing.stipend || "0.00"}</p>
           <p><strong>Duration:</strong> ${listing.duration || "N/A"}</p>
           <p><strong>Description:</strong> ${listing.description || "No description provided."}</p>
        </div>
      </div>

      <div class="opportunity-actions">
        <button class="view-opportunity-details-btn" type="button"  data-id="${listing.listings_id}">View Details</button>
        ${saveButtonHtml}
        ${actionUI}
      </div>
      `;

      container.appendChild(card);

      document.querySelectorAll('.view-opportunity-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const listingId = btn.getAttribute('data-id');
          window.location.href = `/opportunity/${listingId}`;
        });
      });
    });

  } catch (error) {
    console.error("Error fetching opportunities:", error);
    container.innerHTML = '<div class="empty-state">Error loading opportunities. Please try again later.</div>';
  } finally {
    if (typeof window.hideLoader === "function") window.hideLoader();
  }
}


function applyForListing(listingId, requiredNqfLevel = 0) {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const cvName = userData.cvName || "No CV uploaded yet";

  const listingInput = document.getElementById("applicationListingId");
  listingInput.value = listingId;
  listingInput.dataset.requiredNqf = requiredNqfLevel;

  document.getElementById("applicationListingId").value = listingId;
  document.getElementById("applicationMotivation").value = "";
  document.getElementById("applicationAvailability").value = "";
  document.getElementById("applicationCvName").textContent = cvName;

  openModal("applicationModal");
}

async function submitApplicationFromModal() {
  const listingInput = document.getElementById("applicationListingId");
  const listingId = parseInt(listingInput.value, 10);

  const requiredNqf = parseInt(listingInput.dataset.requiredNqf || "0", 10);
  const motivation = document.getElementById("applicationMotivation").value.trim();
  const availability = document.getElementById("applicationAvailability").value.trim();
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const applicantData = userData.applicant || {};
  const qualifications = applicantData.formattedQualifications || [];

  // Find applicant's highest NQF level
  const highestNqf = qualifications.reduce((max, q) => {
    return q.nqf_level > max ? q.nqf_level : max;
  }, 0);

  // Warn if they don't meet the requirement
  if (requiredNqf && highestNqf < requiredNqf) {
    const proceed = confirm(
      `This opportunity requires NQF Level ${requiredNqf}.\n` +
      `Your highest qualification is NQF Level ${highestNqf || 'unknown'}.\n\n` +
      `You may not meet the requirements. Apply anyway?`
    );
    if (!proceed) return;
  }
  const cvName = userData.cvName || null;

  if (!motivation) {
    alert("Please add a short motivation before applying.");
    return;
  }

  if (!availability) {
    alert("Please add your availability before applying.");
    return;
  }

  await submitApplication(listingId, motivation, availability, cvName);
  closeModal("applicationModal");
}

async function submitApplication(listingId, motivation, availability, cvName) {
  const email = currentUser?.email || JSON.parse(localStorage.getItem('userData') || '{}').email;

  try {
    showLoader();

    const response = await fetch("/api/listings/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listing_id: listingId,
        email: email,
        motivation: motivation.trim(),
        availability: availability.trim(),
        cv_name: cvName || null
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Application failed");

    alert("Applied successfully!");
    fetchOpportunities();

  } catch (error) {
    console.error(error);
    alert(error.message);
  } finally {
    hideLoader();
  }
}

function startNotificationListener(userFirebaseUid) {
  db.collection("notifications")
    .where("userId", "==", userFirebaseUid)
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      const liveNotifications = [];
      let unreadCount = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();

        const timeString = data.createdAt ? data.createdAt.toDate().toLocaleString() : "Just now";

        liveNotifications.push({
          id: doc.id,
          type: data.type || "Status Update",
          message: data.message,
          time: timeString,
          isRead: data.isRead
        });

        if (!data.isRead) unreadCount++;
      });

      renderNotifications(liveNotifications);
      updateNotificationBadge(unreadCount);
    });
}

function updateNotificationBadge(count) {
  const badge = document.getElementById("notificationBadge");
  if (!badge) return;

  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove("hidden");
  } else {
    badge.classList.add("hidden");
  }
}

// --- MARK AS READ  ---
async function markAsRead(notificationId) {
  try {
    await db.collection("notifications").doc(notificationId).update({
      isRead: true
    });
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
}

async function toggleFavorite(listingId) {
  try {
    // 1. Grab the currently authenticated user directly from Firebase
    // Note: If you are using Firebase v9 modular, this might be `auth.currentUser` instead.
    const user = firebase.auth().currentUser;

    // 2. Safety check: Make sure someone is actually logged in
    if (!user) {
      console.error("User is not logged in");
      alert("You must be logged in to save listings.");
      return;
    }

    // 3. Make the fetch request
    const response = await fetch('/api/savedListings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user.uid, // <-- Use the uid from the 'user' variable we just checked
        listingId: listingId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      buttonElement.classList.add("favorited");
      buttonElement.innerHTML = "Saved";
    }

    const result = await response.json();
    console.log("Success:", result);

    // Optional: Update your UI here (e.g., change the heart button color)

  } catch (error) {
    console.error("Error saving listing:", error);
  }
}

// --- JEST TESTING EXPORTS & BROWSER STARTUP ---
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderProfile,
    saveProfileChanges,
    uploadCV,
    renderApplications,
    fetchOpportunities,
    showTab,
    openModal,
    closeModal,
    guardApplicantPage,
    getCompetition,
    renderNotifications,
    startNotificationListener,
    toggleFavorite,
  };
} else {
  renderEducationDisplay();
  loadDataOnStartup();
}
