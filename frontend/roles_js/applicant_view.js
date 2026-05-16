let currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
let pendingListingId = null;

// ===============================
// AUTH GUARD
// ===============================
async function guardApplicantPage() {
  return new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(async (user) => {
      try {
        if (!user) {
          window.location.assign("/login");
          return resolve(false);
        }

        const token = await user.getIdToken();

        const response = await fetch(
          `/api/user/role?email=${encodeURIComponent(user.email)}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          await firebase
            .auth()
            .signOut()
            .catch(() => {});
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

// ===============================
// LOADER
// ===============================

// ===============================
// LOAD DATA ON STARTUP
// ===============================

function renderProfile() {
  showLoader();
  let userData = JSON.parse(localStorage.getItem("userData") || "{}");

  document.getElementById("displayFirstName").textContent =
    userData.name || "Not set";
  document.getElementById("displayLastName").textContent =
    userData.surname || "Not set";
  document.getElementById("displayEmail").textContent =
    userData.email || "Not set";

  const fullName = `${userData.name || ""} ${userData.surname || ""}`.trim();
  document.getElementById("topName").textContent =
    fullName !== "" ? fullName : "Not set";
  document.getElementById("topRole").textContent = userData.role || "Applicant";

  const applicantData = userData.applicant || {};
  const bioText = applicantData && applicantData.bio ? applicantData.bio : "";

  if (bioText.trim() !== "") {
    document.getElementById("displayBio").textContent = bioText;
  } else {
    document.getElementById("displayBio").textContent =
      "No professional summary added yet.";
  }

  const firstNameInput = document.getElementById("editFirstName");
  const lastNameInput = document.getElementById("editLastName");
  const emailInput = document.getElementById("editEmail");

  if (firstNameInput) firstNameInput.value = userData.name || "";
  if (lastNameInput) lastNameInput.value = userData.surname || "";
  if (emailInput) emailInput.value = userData.email || "";

  const currentCvDisplay = document.getElementById("currentCvDisplay");
  if (currentCvDisplay) {
    if (userData.cvName) {
      currentCvDisplay.innerHTML = `Current file: ${userData.cvName}`;
    } else {
      currentCvDisplay.innerHTML = "";
    }
  }

  hideLoader();
}

function showTab(tabName) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));

  if (tabName === "opportunities") {
    const tabBtn =
      document.getElementById("tab-opps") ||
      document.querySelectorAll(".tab")[0];
    if (tabBtn) tabBtn.classList.add("active");
    document.getElementById("opportunitiesTab").classList.add("active");
    fetchOpportunities(this.document.getElementById("listTypeFilter").value);
  } else if (tabName === "applications") {
    const tabBtn =
      document.getElementById("tab-apps") ||
      document.querySelectorAll(".tab")[1];
    if (tabBtn) tabBtn.classList.add("active");
    document.getElementById("applicationsTab").classList.add("active");
    renderApplications();
  } else if (tabName === "profile") {
    const tabBtn =
      document.getElementById("tab-profile") ||
      document.querySelectorAll(".tab")[2];
    if (tabBtn) tabBtn.classList.add("active");
    document.getElementById("profileTab").classList.add("active");
    renderProfile();
  }
}

// --- Modal Controls ---
function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// --- Education Modal ---
function prepEducationInfoModal() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const container = document.getElementById("educationListContainer");
  const applicantData = userData.applicant || {};
  const educationList = applicantData.formattedQualifications || [];

  container.innerHTML = "";

  if (educationList && educationList.length > 0) {
    educationList.forEach((edu) => {
      addEducationRow({
        qualification_id: edu.qualification_id || "",
        name: edu.degree || "",
        nqf_level: edu.nqfLevel || edu.nqf_level || "",
        institution: edu.institution || "",
        year_completed: edu.graduationYear || edu.year_completed || "",
      });
    });
  } else {
    addEducationRow();
  }

  openModal("educationInfoModal");
}

async function saveEducationInfo() {
  const educationEntries = document.getElementsByClassName("education-row");
  let educationData = [];

  for (let entry of educationEntries) {
    const institution = entry.querySelector(".qual-institution").value;
    const nqfLevel = entry.querySelector(".qual-nqf").value;
    const graduationYear = entry.querySelector(".qual-year").value;
    const qualId = entry.querySelector(".qual-id").value;
    const qualName = entry.querySelector(".qual-name").value;

    if (institution && nqfLevel && graduationYear) {
      educationData.push({
        institution: institution.trim(),
        nqf_level: parseInt(nqfLevel, 10),
        year_completed: parseInt(graduationYear, 10),
        qualification_id: qualId ? parseInt(qualId, 10) : null,
        qualification_name: qualName || null,
      });
    }
  }

  const success = await saveProfileChanges({ qualifications: educationData });

  if (success) {
    closeModal("educationInfoModal");
    alert("Education information updated successfully!");
    renderEducationDisplay();
  } else {
    alert("Failed to save Education info. Please try again.");
  }
}

function renderEducationDisplay() {
  const container = document.getElementById("educationDisplayContainer");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
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

  container.innerHTML = "";

  educationList.forEach((edu) => {
    const block = document.createElement("div");
    block.className = "education-block";
    block.innerHTML = `
      <div class="card-grid">
        <div class="data-group">
          <span class="data-label">Institution</span>
          <span class="data-value">${edu.institution}</span>
        </div>
        <div class="data-group">
          <span class="data-label">Degree / Qualification</span>
          <span class="data-value">${edu.degree || "NQF Level " + edu.nqfLevel}</span>
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
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const applicantData = userData.applicant || {};

  document.getElementById("editFirstName").value = userData.name || "";
  document.getElementById("editLastName").value = userData.surname || "";
  document.getElementById("editEmail").value = userData.email || "";
  document.getElementById("editPhone").value = applicantData.phone || "";

  const dob = applicantData.dob ? applicantData.dob.split("T")[0] : "";
  document.getElementById("editDob").value = dob;

  openModal("personalInfoModal");
}

async function savePersonalInfo() {
  const updatedFields = {
    name: document.getElementById("editFirstName").value,
    surname: document.getElementById("editLastName").value,
    phone: document.getElementById("editPhone").value,
    dob: document.getElementById("editDob").value,
  };

  const success = await saveProfileChanges(updatedFields);

  if (success) {
    closeModal("personalInfoModal");
    alert("Profile updated successfully!");
  } else {
    alert("Failed to save Personal Info. Please try again.");
  }
}

function prepBioModal() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const applicantData = userData.applicant || {};
  document.getElementById("editBioText").value = applicantData.bio || "";
  openModal("bioModal");
}

async function saveBio() {
  const newBio = document.getElementById("editBioText").value;
  const success = await saveProfileChanges({ bio: newBio });

  if (success) {
    closeModal("bioModal");
    alert("Bio updated successfully!");
  } else {
    alert("Failed to save bio. Please try again.");
  }
}

// The Master Save Function
async function saveProfileChanges(fieldsToUpdate) {
  showLoader();
  const firebaseUid = localStorage.getItem("firebase_uid");

  if (!firebaseUid) {
    alert("User not logged in!");
    return;
  }

  try {
    const response = await fetch(`/api/profile/${firebaseUid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fieldsToUpdate),
    });

    if (!response.ok) {
      throw new Error("Failed to load profile");
    }

    const freshProfileData = await response.json();
    localStorage.setItem("userData", JSON.stringify(freshProfileData));
    console.log(
      "Successfully saved and synced to Local Storage!",
      freshProfileData,
    );
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
  const firebaseUid = localStorage.getItem("firebase_uid");

  try {
    const response = await fetch(`/api/profile/${firebaseUid}`);
    const profileData = await response.json();

    localStorage.setItem("userData", JSON.stringify(profileData));

    const allowed = await guardApplicantPage();
    if (!allowed) return;

    renderProfile();
    renderEducationDisplay();

    const filter = document.getElementById("listTypeFilter");

    await fetchOpportunities(filter ? filter.value : "");

    await renderApplications();
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

async function uploadCV() {
  const fileInput = document.getElementById("cvFile");
  const msgBox = document.getElementById("cvUploadMsg");

  if (fileInput.files.length === 0) {
    msgBox.innerHTML =
      "<span style='color: red;'>Please select a file first.</span>";
    return;
  }

  const file = fileInput.files[0];
  const maxSizeInBytes = 5 * 1024 * 1024;

  if (file.size > maxSizeInBytes) {
    msgBox.innerHTML =
      "<span style='color: red;'>File is too large. Max size is 5MB.</span>";
    return;
  }

  msgBox.innerHTML = "<span style='color: blue;'>Uploading...</span>";

  setTimeout(() => {
    msgBox.innerHTML =
      "<span style='color: green;'>CV Uploaded Successfully!</span>";

    let userData = JSON.parse(localStorage.getItem("userData") || "{}");
    userData.cvName = file.name;
    localStorage.setItem("userData", JSON.stringify(userData));

    if (typeof renderProfile === "function") {
      renderProfile();
    }

    fileInput.value = "";

    setTimeout(() => {
      msgBox.innerHTML = "";
    }, 3000);
  }, 1500);
}

// --- Loader Controls ---
function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
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
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const userEmail = userData.email || ""; // Fallback if email is not set in localStorage
  // Show loading state while fetching
  if (typeof window.showLoader === "function") window.showLoader();
  container.innerHTML =
    '<div class="empty-state">Loading opportunities...</div>';

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
      container.innerHTML =
        '<div class="empty-state">No available opportunities found for this category.</div>';
      return;
    }

    listings.forEach((listing) => {
      const card = document.createElement("div");

      card.className = "opportunity-card";
      card.dataset.listingId = listing.listings_id;
      card.dataset.listingName = listing.listname;

      const hasApplied =
        listing.hasApplied ||
        (listing.applications && listing.applications.length > 0);

      const actionUI = hasApplied
        ? `<div class="already-applied">✅ Already Applied</div>`
        : `<button class="apply-btn" onclick="applyForListing(${listing.listings_id}, ${listing.nqf_level || 0})">Apply Now</button>`;

      const applicantCount =
        listing.applicantCount ?? listing.applications?.length ?? 0;
      const competition = getCompetition(applicantCount);

      card.innerHTML = `
                <header class="opportunity-header">
                <h3 class="opportunity-title">${listing.listname}</h3>
                <div class="competition-badge competition-badge--${competition.level}" role="status"
                aria-label="${competition.label} — ${competition.text}">
                ${competition.label}
                </div>
                </header>
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
    container.innerHTML =
      '<div class="empty-state">Error loading opportunities. Please try again later.</div>';
  } finally {
    if (typeof window.hideLoader === "function") window.hideLoader();
  }
}

// Stores state for the pending application
let pendingApplication = { listingId: null, requiredNqf: null };

function applyForListing(listingId, requiredNqf) {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const applicantData = userData.applicant || {};
  const qualifications = applicantData.formattedQualifications || [];

  const highestNqf = qualifications.reduce(
    (max, q) => (q.nqf_level > max ? q.nqf_level : max),
    0,
  );

  if (requiredNqf && highestNqf < requiredNqf) {
    const proceed = confirm(
      `⚠️ This opportunity requires NQF Level ${requiredNqf}.\n` +
        `Your highest qualification is NQF Level ${highestNqf || "unknown"}.\n\n` +
        `You may not meet the requirements. Apply anyway?`,
    );
    if (!proceed) return;
  }

  // Store context, populate modal, open it
  pendingApplication = { listingId, requiredNqf };

  const listingCard = document.querySelector(
    `[data-listing-id="${listingId}"]`,
  );
  const listingName = listingCard?.dataset.listingName || "this opportunity";
  document.getElementById("applyModalListingName").textContent =
    `Applying for: ${listingName}`;
  document.getElementById("applyModalMsg").innerHTML = "";
  document.getElementById("applyModalCvFile").value = "";
  document.getElementById("applyModalMotivation").value = "";

  openModal("applyModal");
}

async function submitApplication() {
  const { listingId } = pendingApplication;
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const fileInput = document.getElementById("applyModalCvFile");
  const motivation = document.getElementById("applyModalMotivation").value;
  const msgBox = document.getElementById("applyModalMsg");

  if (!fileInput.files.length) {
    msgBox.innerHTML =
      "<span style='color:red;'>Please select a CV to upload.</span>";
    return;
  }

  const file = fileInput.files[0];
  if (file.size > 5 * 1024 * 1024) {
    msgBox.innerHTML =
      "<span style='color:red;'>File too large. Max size is 5MB.</span>";
    return;
  }

  msgBox.innerHTML =
    "<span style='color:blue;'>Submitting application...</span>";
  showLoader();

  try {
    // Step 1: Submit the application first to get an application_id back
    const applyRes = await fetch("/api/listings/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listing_id: listingId,
        email: userData.email,
        motivation,
      }),
    });

    const applyData = await applyRes.json();
    if (!applyRes.ok) throw new Error(applyData.error || "Application failed");

    const applicationId = applyData.application.application_id;

    // Step 2: Upload the CV against the new application_id
    const formData = new FormData();
    formData.append("cv", file);
    formData.append("email", userData.email);

    const cvRes = await fetch(`/api/listings/${applicationId}/cv`, {
      method: "POST",
      body: formData,
    });

    if (!cvRes.ok) {
      const cvData = await cvRes.json();
      throw new Error(cvData.error || "CV upload failed");
    }

    msgBox.innerHTML =
      "<span style='color:green;'>Applied successfully!</span>";
    setTimeout(() => {
      closeModal("applyModal");
      fetchOpportunities(document.getElementById("listTypeFilter").value);
    }, 1200);
  } catch (error) {
    msgBox.innerHTML = `<span style='color:red;'>${error.message}</span>`;
  } finally {
    hideLoader();
  }
}

// --- JEST TESTING EXPORTS & BROWSER STARTUP ---
if (typeof module !== "undefined" && module.exports) {
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
  };
} else {
  renderEducationDisplay();
  loadDataOnStartup();
}
