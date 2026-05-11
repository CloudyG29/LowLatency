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
function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

// ===============================
// LOAD DATA ON STARTUP
// ===============================
async function loadDataOnStartup() {
  try {
    // FIRST validate auth
    const allowed = await guardApplicantPage();

    if (!allowed) return;

    const firebaseUid = localStorage.getItem("firebase_uid");

    if (!firebaseUid) {
      console.error("No firebase UID found.");
      return;
    }

    // THEN fetch profile
    const response = await fetch(`/api/profile/${firebaseUid}`);

    if (!response.ok) {
      throw new Error("Failed to load profile");
    }

    const profileData = await response.json();

    localStorage.setItem("userData", JSON.stringify(profileData));

    renderProfile();
    renderEducationDisplay();

    const filter = document.getElementById("listTypeFilter");

    await fetchOpportunities(filter ? filter.value : "");

    await renderApplications();
  } catch (error) {
    console.error("Error loading profile:", error);
  }
}

// ===============================
// FETCH OPPORTUNITIES
// ===============================
async function fetchOpportunities(type = "") {
  const container = document.getElementById("opportunitiesList");

  if (!container) return;

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const userEmail = userData.email || "";

  showLoader();

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

      const hasApplied =
        listing.hasApplied ||
        (listing.applications && listing.applications.length > 0);

      const actionUI = hasApplied
        ? `<div class="already-applied">✅ Already Applied</div>`
        : `
          <button 
            class="apply-btn"
            data-id="${listing.listings_id}"
            data-name="${listing.listname}">
            Apply Now
          </button>
        `;

      const applicantCount =
        listing.applicantCount ?? listing.applications?.length ?? 0;

      const competition = getCompetition(applicantCount);

      card.innerHTML = `
        <header class="opportunity-header">
          <h3 class="opportunity-title">${listing.listname}</h3>

          <div 
            class="competition-badge competition-badge--${competition.level}" 
            role="status"
            aria-label="${competition.label} — ${competition.text}">
            ${competition.label}
          </div>
        </header>

        <div class="opportunity-details">
          <p><strong>Provider:</strong> ${
            listing.provider?.provider_name || "N/A"
          }</p>

          <p><strong>Type:</strong> ${listing.list_type}</p>

          <p><strong>Location:</strong> ${listing.location || "N/A"}</p>

          <p><strong>Stipend:</strong> R${listing.stipend || "0.00"}</p>

          <p><strong>Duration:</strong> ${listing.duration || "N/A"}</p>

          <p><strong>NQF Level:</strong> ${listing.nqf_level || "N/A"}</p>

          <p><strong>Closing Date:</strong> ${
            listing.closing_date
              ? new Date(listing.closing_date).toDateString()
              : "N/A"
          }</p>

          <p><strong>Description:</strong> ${
            listing.description || "No description provided."
          }</p>
        </div>

        ${actionUI}
      `;

      const applyBtn = card.querySelector(".apply-btn");

      if (applyBtn) {
        applyBtn.addEventListener("click", () => {
          openApplyModal(listing.listings_id, listing.listname);
        });
      }

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error fetching opportunities:", error);

    container.innerHTML =
      '<div class="empty-state">Error loading opportunities. Please try again later.</div>';
  } finally {
    hideLoader();
  }
}

// ===============================
// APPLICATIONS
// ===============================
async function renderApplications() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const container = document.getElementById("applicationsList");

  if (!container) return;

  container.innerHTML = '<div class="empty-state">Loading...</div>';

  try {
    showLoader();

    const response = await fetch(
      `/api/listings/my-applications?email=${userData.email}`,
    );

    if (!response.ok) {
      throw new Error("Failed to load applications");
    }

    const applications = await response.json();

    if (applications.length === 0) {
      container.innerHTML =
        '<div class="empty-state">You have not applied to any opportunities yet.</div>';

      return;
    }

    container.innerHTML = "";

    applications.forEach((app) => {
      const div = document.createElement("div");

      div.className = "application-card";

      div.innerHTML = `
        <div class="application-info">
          <h3>${app.listing.listname}</h3>

          <p>
            <strong>Type:</strong> 
            ${app.listing.list_type}
          </p>

          <p>
            <strong>Applied on:</strong> 
            ${new Date(app.created_at).toDateString()}
          </p>
        </div>

        <span class="status-badge status-${app.status}">
          ${app.status}
        </span>
      `;

      container.appendChild(div);
    });
  } catch (error) {
    console.error(error);

    container.innerHTML =
      '<div class="empty-state">Error loading applications.</div>';
  } finally {
    hideLoader();
  }
}

// ===============================
// PROFILE SAVE
// ===============================
async function saveProfileChanges(fieldsToUpdate) {
  showLoader();

  const firebaseUid = localStorage.getItem("firebase_uid");

  if (!firebaseUid) {
    hideLoader();

    alert("User not logged in!");

    return false;
  }

  try {
    const response = await fetch(`/api/profile/${firebaseUid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fieldsToUpdate),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(errorData.error || "Failed to update database.");
    }

    const freshProfileData = await response.json();

    localStorage.setItem("userData", JSON.stringify(freshProfileData));

    console.log(
      "Successfully saved and synced to Local Storage!",
      freshProfileData,
    );

    renderProfile();

    return true;
  } catch (error) {
    console.error("Error saving profile changes:", error);

    return false;
  } finally {
    hideLoader();
  }
}

// ===============================
// APPLY MODAL
// ===============================
function openApplyModal(listingId, listingName) {
  pendingListingId = listingId;

  document.getElementById("modalListingName").textContent = listingName;

  document.getElementById("cvFileInput").value = "";

  document.getElementById("cvUploadMsg").textContent = "";

  openModal("cvUploadModal");
}

// ===============================
// SUBMIT APPLICATION
// ===============================
async function submitApplication() {
  const msg = document.getElementById("cvUploadMsg");

  const fileInput = document.getElementById("cvFileInput");

  if (!fileInput.files.length) {
    msg.style.color = "#fc8181";

    msg.textContent = "Please attach your CV before submitting.";

    return;
  }

  const file = fileInput.files[0];

  if (file.size > 5 * 1024 * 1024) {
    msg.style.color = "#fc8181";

    msg.textContent = "File is too large. Max size is 5MB.";

    return;
  }

  msg.style.color = "#888";

  msg.textContent = "Submitting...";

  try {
    // Create application
    const applyRes = await fetch("/api/listings/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        listing_id: pendingListingId,
        email: currentUser.email,
      }),
    });

    const applyData = await applyRes.json();

    if (!applyRes.ok) {
      throw new Error(applyData.error || "Application failed");
    }

    const applicationId = applyData.application.application_id;

    // Upload CV
    const formData = new FormData();

    formData.append("cv", file);

    formData.append("email", currentUser.email);

    const cvRes = await fetch(`/api/listings/${applicationId}/cv`, {
      method: "POST",
      body: formData,
    });

    const cvData = await cvRes.json();

    if (!cvRes.ok) {
      throw new Error(cvData.error || "CV upload failed");
    }

    msg.style.color = "#68d391";

    msg.textContent = "✅ Application submitted successfully!";

    setTimeout(() => {
      closeModal("cvUploadModal");

      const filter = document.getElementById("listTypeFilter");

      fetchOpportunities(filter ? filter.value : "");
    }, 1500);
  } catch (error) {
    console.error(error);

    msg.style.color = "#fc8181";

    msg.textContent = `❌ ${error.message}`;
  }
}

// ===============================
// COMPETITION HELPER
// ===============================
function getCompetition(count) {
  if (count === 0) {
    return {
      level: "low",
      label: "🟢 Low",
      text: "Be the first to apply",
    };
  }

  if (count < 5) {
    return {
      level: "medium",
      label: "🟡 Medium",
      text: "A few applicants",
    };
  }

  return {
    level: "high",
    label: "🔴 High",
    text: "Many applicants",
  };
}

// ===============================
// JEST EXPORTS
// ===============================
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
  };
} else {
  // Browser startup
  renderEducationDisplay();
  loadDataOnStartup();
}
