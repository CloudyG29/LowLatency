let currentUser = null;

// DATABASE FUNCTIONS
async function renderApplications() {
  const container = document.getElementById("applicationsList");
  container.innerHTML = '<div class="empty-state"> Loading...</div>';
  try {
    const response = await fetch(`/api/listings/my-applications?email=${currentUser.email}`);
    const applications = await response.json();

    if (applications.length === 0) {
      container.innerHTML = '<div class="empty-state"> You have not applied to any opportunities yet.</div>';
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
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Error loading applications.</div>';
  }
}

async function renderOpportunities() {
  const container = document.getElementById("opportunitiesList");
  container.innerHTML = '<div class="empty-state"> Loading opportunities...</div>';

  try {
    const [oppsRes, appsRes] = await Promise.all([
      fetch("/api/listings/approved"),
      fetch(`/api/listings/my-applications?email=${currentUser.email}`)
    ]);

    const allOpps = await oppsRes.json();
    const myApps = await appsRes.json();
    const appliedIds = myApps.map((a) => a.listing_id);

    if (allOpps.length === 0) {
      container.innerHTML = '<div class="empty-state">No opportunities available yet.</div>';
      return;
    }

    container.innerHTML = "";
    allOpps.forEach((opp) => {
      const card = document.createElement("div");
      card.className = "opportunity-card";
      const applied = appliedIds.includes(opp.listings_id);
      card.innerHTML = `
        <h3>${opp.listname}</h3>
        <p><strong>Provider:</strong> ${opp.provider.provider_name}</p>
        <p><strong>Type:</strong> ${opp.list_type}</p>
        <p><strong>Location:</strong> ${opp.location || "N/A"}</p>
        <p><strong>Stipend:</strong> ${opp.stipend || "N/A"}</p>
        <p><strong>Duration:</strong> ${opp.duration || "N/A"}</p>
        <p><strong>NQF Level:</strong> ${opp.nqf_level || "N/A"}</p>
        <p><strong>Requirements:</strong> ${opp.requirements || "N/A"}</p>
        <p><strong>Closing Date:</strong> ${opp.closing_date ? new Date(opp.closing_date).toDateString() : "N/A"}</p>
        <p><strong>Description:</strong> ${opp.description || "N/A"}</p>
        ${applied
          ? `<div class="already-applied">✅ Already Applied</div>`
          : `<button class="apply-btn" data-id="${opp.listings_id}">Apply Now</button>`
        }
        <div id="msg-${opp.listings_id}" class="message"></div>
      `;
      container.appendChild(card);
    });

    document.querySelectorAll(".apply-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        try {
          const response = await fetch("/api/listings/apply", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listing_id: id, email: currentUser.email }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error);
          document.getElementById(`msg-${id}`).innerHTML = "✅ Application submitted!";
          setTimeout(() => renderOpportunities(), 1000);
        } catch (error) {
          document.getElementById(`msg-${id}`).innerHTML = "❌ " + error.message;
        }
      });
    });
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Error loading opportunities.</div>';
  }
}

// PROFILE FUNCTIONS
function toggleProfileMode(mode) {
  const displayMode = document.getElementById('profileDisplayMode');
  const editMode = document.getElementById('profileForm');
  if (mode === 'edit') {
    displayMode.style.display = 'none';
    editMode.style.display = 'block';
    document.getElementById('displayMsg').innerHTML = '';
  } else {
    displayMode.style.display = 'block';
    editMode.style.display = 'none';
  }
}

function renderProfile() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  document.getElementById('displayFirstName').textContent = userData.firstName || 'Not set';
  document.getElementById('displayLastName').textContent = userData.lastName || 'Not set';
  document.getElementById('displayEmail').textContent = userData.email || 'Not set';
  document.getElementById('topName').textContent = `${userData.firstName || ''} ${userData.lastName || ''}`;
  document.getElementById('topRole').textContent = userData.role || 'Applicant';
  if (userData.bio && userData.bio.trim() !== '') {
    document.getElementById('displayBio').textContent = userData.bio;
  } else {
    document.getElementById('displayBio').textContent = 'No professional summary added yet.';
  }
  const currentCvDisplay = document.getElementById('currentCvDisplay');
  if (currentCvDisplay) {
    currentCvDisplay.innerHTML = userData.cvName ? `Current file: ${userData.cvName}` : "";
  }
  toggleProfileMode('view');
}

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
  const entryDiv = document.createElement('div');
  entryDiv.className = 'education-entry';
  entryDiv.id = `edu_entry_${educationCounter}`;
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
      <select class="edu-nqf" required>${nqfOptions}</select>
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
  container.innerHTML = '';
  educationCounter = 0;
  if (userData.education && userData.education.length > 0) {
    userData.education.forEach(edu => {
      addEducationRow();
      const lastEntry = container.lastElementChild;
      lastEntry.querySelector('.edu-institution').value = edu.institution;
      lastEntry.querySelector('.edu-nqf').value = edu.nqfLevel;
      lastEntry.querySelector('.edu-year').value = edu.graduationYear;
    });
  } else {
    addEducationRow();
  }
  openModal('educationInfoModal');
}

function prepPersonalInfoModal() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  document.getElementById('editFirstName').value = userData.firstName || '';
  document.getElementById('editLastName').value = userData.lastName || '';
  document.getElementById('editEmail').value = userData.email || '';
  document.getElementById('editRole').value = userData.role || 'Applicant';
  document.getElementById('editPhone').value = userData.phone || '';
  document.getElementById('editDob').value = userData.dob || '';
  openModal('personalInfoModal');
}

function savePersonalInfo() {
  let userData = JSON.parse(localStorage.getItem('userData') || '{}');
  userData.firstName = document.getElementById('editFirstName').value;
  userData.lastName = document.getElementById('editLastName').value;
  userData.phone = document.getElementById('editPhone').value;
  userData.dob = document.getElementById('editDob').value;
  localStorage.setItem('userData', JSON.stringify(userData));
  document.getElementById('displayFirstName').textContent = userData.firstName || 'Not set';
  document.getElementById('displayLastName').textContent = userData.lastName || 'Not set';
  document.getElementById('topName').textContent = `${userData.firstName} ${userData.lastName}`;
  closeModal('personalInfoModal');
  alert('Profile updated successfully!');
}

function saveEducationInfo() {
  let userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const educationEntries = document.getElementsByClassName('education-entry');
  userData.education = [];
  for (let entry of educationEntries) {
    const institution = entry.querySelector('.edu-institution').value;
    const nqfLevel = entry.querySelector('.edu-nqf').value;
    const graduationYear = entry.querySelector('.edu-year').value;
    if (institution && nqfLevel && graduationYear) {
      userData.education.push({ institution, nqfLevel, graduationYear });
    }
  }
  localStorage.setItem('userData', JSON.stringify(userData));
  closeModal('educationInfoModal');
  renderEducationDisplay();
}

function renderEducationDisplay() {
  const container = document.getElementById('educationDisplayContainer');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  if (!userData.education || userData.education.length === 0) {
    container.innerHTML = `
      <div class="card-grid">
        <div class="data-group"><span class="data-label">Institution</span><span class="data-value">Not set</span></div>
        <div class="data-group"><span class="data-label">Degree / Qualification</span><span class="data-value">Not set</span></div>
        <div class="data-group"><span class="data-label">Graduation Year</span><span class="data-value">Not set</span></div>
      </div>`;
    return;
  }
  container.innerHTML = '';
  userData.education.forEach(edu => {
    const block = document.createElement('div');
    block.className = 'education-block';
    block.innerHTML = `
      <div class="card-grid">
        <div class="data-group"><span class="data-label">Institution</span><span class="data-value">${edu.institution}</span></div>
        <div class="data-group"><span class="data-label">Degree / Qualification</span><span class="data-value">${edu.degree || 'NQF Level ' + edu.nqfLevel}</span></div>
        <div class="data-group"><span class="data-label">Graduation Year</span><span class="data-value">${edu.graduationYear}</span></div>
      </div><br/><hr/>`;
    container.appendChild(block);
  });
}

function prepBioModal() {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  document.getElementById('editBioText').value = userData.bio || '';
  openModal('bioModal');
}

function saveBio() {
  let userData = JSON.parse(localStorage.getItem('userData') || '{}');
  userData.bio = document.getElementById('editBioText').value;
  localStorage.setItem('userData', JSON.stringify(userData));
  document.getElementById('displayBio').textContent = userData.bio.trim() === '' ? 'No professional summary added yet.' : userData.bio;
  closeModal('bioModal');
}

// TABS
function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
  if (tabName === "opportunities") {
    document.getElementById("opportunitiesTab").classList.add("active");
    renderOpportunities();
  } else if (tabName === "applications") {
    document.getElementById("applicationsTab").classList.add("active");
    renderApplications();
  } else if (tabName === "profile") {
    document.getElementById("profileTab").classList.add("active");
    renderProfile();
    renderEducationDisplay();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const profileForm = document.getElementById('profileForm');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const email = document.getElementById('email').value;
      const cvFileInput = document.getElementById('cvFile');
      let userData = JSON.parse(localStorage.getItem('userData') || '{}');
      userData.firstName = firstName.trim();
      userData.lastName = lastName.trim();
      userData.email = email.trim();
      if (cvFileInput && cvFileInput.files.length > 0) {
        userData.cvName = cvFileInput.files[0].name;
      }
      localStorage.setItem('userData', JSON.stringify(userData));
      renderProfile();
      const msgBox = document.getElementById('displayMsg');
      if (msgBox) {
        msgBox.innerHTML = 'Profile updated successfully!';
        msgBox.style.color = "#38ef7d";
      }
    });
  }
  renderEducationDisplay();
});

// INIT
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    renderOpportunities();
  } else {
    window.location.href = "/login";
  }
});