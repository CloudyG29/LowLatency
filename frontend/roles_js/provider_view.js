let currentUser = null;

async function guardProviderPage() {
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
          await firebase.auth().signOut().catch(() => {});
          window.location.assign("/login");
          return resolve(false);
        }

        const data = await response.json();

        if (data.role !== "Provider") {
          window.location.assign("/login");
          return resolve(false);
        }

        currentUser = user;
        resolve(true);
      } catch (error) {
        console.error("Provider guard failed:", error);
        window.location.assign("/login");
        resolve(false);
      }
    });
  });
}

async function postOpportunity() {
  if (!currentUser) return;

  const msg = document.getElementById("msg");
  if (!msg) return;

  const listname = document.getElementById("listname")?.value;
  const list_type = document.getElementById("list_type")?.value;
  const nqf_level = document.getElementById("nqf_level")?.value;
  const description = document.getElementById("description")?.value;
  const requirements = document.getElementById("requirements")?.value;
  const closing_date = document.getElementById("closing_date")?.value;
  const stipend = document.getElementById("stipend")?.value;
  const location = document.getElementById("location")?.value;
  const duration = document.getElementById("duration")?.value;

  if (!listname || !list_type || !stipend || !location || !duration || !requirements || !nqf_level || !closing_date) {
    msg.innerText = " Please fill in all fields before posting a job";
    msg.style.color = "#fc8181";
    return;
  }

  try {
    const response = await fetch("/api/listings/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listname,
        list_type,
        nqf_level,
        description,
        requirements,
        closing_date,
        stipend,
        location,
        duration,
        email: currentUser.email,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error);

    msg.innerText = "✅ Posted! Waiting for admin approval.";
    msg.style.color = "#68d391";
    document.querySelectorAll("input, textarea").forEach((el) => (el.value = ""));
    displayOpportunities();
  } catch (error) {
    msg.innerText = "❌ " + error.message;
    msg.style.color = "#fc8181";
  }
}

async function displayOpportunities() {
  const container = document.getElementById("myOpportunities");
  container.innerHTML = '<div class="empty-state"> Loading opportunities...</div>';

  try {
    showLoader();

    const response = await fetch(`/api/listings/provider?email=${currentUser.email}`);
    const listings = await response.json();

    if (listings.length === 0) {
      container.innerHTML = '<div class="empty-state">You have not posted any opportunities yet.</div>';
      hideLoader();
      return;
    }

    container.innerHTML = "";

    listings.forEach((opp) => {
      const div = document.createElement("div");
      div.className = "opportunity-card";
      div.innerHTML = `
        <h3>${opp.listname}</h3>
        <p><strong>Type:</strong> ${opp.list_type}</p>
        <p><strong>Location:</strong> ${opp.location || "N/A"}</p>
        <p><strong>Stipend:</strong> ${opp.stipend || "N/A"}</p>
        <p><strong>Duration:</strong> ${opp.duration || "N/A"}</p>
        <p><strong>Requirements:</strong> ${opp.requirements || "N/A"}</p>
        <p><strong>Closing Date:</strong> ${opp.closing_date ? new Date(opp.closing_date).toDateString() : "N/A"}</p>
        <p><strong>Status:</strong> <span class="status-badge status-${opp.status}">${opp.status}</span></p>
      `;
      container.appendChild(div);
      hideLoader();
    });
  } catch (error) {
    hideLoader();
    container.innerHTML = '<div class="empty-state">Error loading opportunities.</div>';
  }
}

async function displayApplications() {
  const listContainer = document.getElementById("applicationsList");
  const detailsContainer = document.getElementById("selectedApplicationDetails");
  const emptyState = document.getElementById("emptyApplicationState");

  listContainer.innerHTML = '<div class="empty-state">Loading applications...</div>';

  try {
    showLoader();

    const response = await fetch(`/api/listings/provider-applications?email=${currentUser.email}`);
    const applications = await response.json();

    // --- DASHBOARD STATS ---
    document.getElementById("totalApplications").textContent = applications.length;

    document.getElementById("pendingApplications").textContent =
      applications.filter((app) => app.status === "pending").length;

    // ADDED: count shortlisted applications
    document.getElementById("shortlistedApplications").textContent =
      applications.filter((app) => app.status === "shortlisted").length;

    document.getElementById("hiredApplications").textContent =
      applications.filter((app) => app.status === "hired").length;

    if (applications.length === 0) {
      listContainer.innerHTML = '<div class="empty-state">No applications received yet.</div>';
      return;
    }

    listContainer.innerHTML = "";

    applications.forEach((app, index) => {
      const status = app.status || "pending";

      const card = document.createElement("div");
      card.className = "dashboard-application-card";

      card.innerHTML = `
        <div class="dashboard-application-card-top">
          <div>
            <h3>${app.user.name || "N/A"} ${app.user.surname || ""}</h3>
            <p>${app.user.email || "No email"}</p>
          </div>

          <span class="status-badge status-${status}">
            ${status}
          </span>
        </div>

        <div class="dashboard-application-meta">
          <p>${app.listing.listname || "N/A"}</p>
          <span>${new Date(app.created_at).toDateString()}</span>
        </div>
      `;

      card.addEventListener("click", () => {
        document.querySelectorAll(".dashboard-application-card")
          .forEach((c) => c.classList.remove("selected"));

        card.classList.add("selected");
        emptyState.style.display = "none";

        detailsContainer.innerHTML = `
          <div class="selected-application-wrapper">

            <div class="selected-app-header">
              <div>
                <h2>${app.user.name || "N/A"} ${app.user.surname || ""}</h2>
                <p>${app.user.email || "No email provided"}</p>
              </div>

              <span class="status-badge status-${status}">
                ${status}
              </span>
            </div>

            <div class="selected-app-grid">

              <div class="selected-card">
                <h3>Applicant Details</h3>

                <p><strong>Phone:</strong> ${app.user.applicant?.phone || "N/A"}</p>
                <p><strong>CV:</strong> ${app.cv_name || "No CV submitted"}</p>
                <p><strong>Availability:</strong> ${app.availability || "Not provided"}</p>
              </div>

              <div class="selected-card">
                <h3>Opportunity</h3>

                <p><strong>Title:</strong> ${app.listing.listname || "N/A"}</p>
                <p><strong>Type:</strong> ${app.listing.list_type || "N/A"}</p>
                <p><strong>Location:</strong> ${app.listing.location || "N/A"}</p>
              </div>

            </div>

            <div class="selected-card motivation-card">
              <h3>Motivation</h3>

              <p>
                ${app.motivation || "No motivation submitted."}
              </p>
            </div>

            <div class="selected-card">
              <h3>Opportunity Description</h3>

              <p>${app.listing.description || "No description available."}</p>
            </div>

            ${status === "pending" ? `
              <div class="selected-actions">

                <!-- ADDED: shortlist action -->
                <button class="btn-shortlist action-btn" data-id="${app.application_id}">
                  Shortlist Applicant
                </button>

                <button class="btn-hire action-btn" data-id="${app.application_id}">
                  Hire Applicant
                </button>

                <button class="btn-reject action-btn" data-id="${app.application_id}">
                  Reject Applicant
                </button>

              </div>
            ` : ""}
          </div>
        `;

        // ADDED: shortlist button event
        document.querySelectorAll(".btn-shortlist").forEach((btn) => {
          btn.addEventListener("click", async () => {
            await updateApplicationStatus(btn.dataset.id, "shortlisted");
          });
        });

        document.querySelectorAll(".btn-hire").forEach((btn) => {
          btn.addEventListener("click", async () => {
            await updateApplicationStatus(btn.dataset.id, "hired");
          });
        });

        document.querySelectorAll(".btn-reject").forEach((btn) => {
          btn.addEventListener("click", async () => {
            await updateApplicationStatus(btn.dataset.id, "rejected");
          });
        });
      });

      listContainer.appendChild(card);

      if (index === 0) {
        card.click();
      }
    });
  } catch (error) {
    console.error(error);
    listContainer.innerHTML =
      '<div class="empty-state">Error loading applications.</div>';
  } finally {
    hideLoader();
  }
}

async function updateApplicationStatus(applicationId, status) {
  try {
    showLoader();

    await fetch(`/api/listings/applications/${applicationId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    displayApplications();
  } catch (error) {
    console.error(error);
    alert("Could not update application status.");
  } finally {
    hideLoader();
  }
}

function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
}

function showTab(tab) {
  document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

  if (tab === "post") document.getElementById("postTab").classList.add("active");

  if (tab === "manage") {
    document.getElementById("manageTab").classList.add("active");
    displayOpportunities();
  }

  if (tab === "applications") {
    document.getElementById("applicationsTab").classList.add("active");
    displayApplications();
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const allowed = await guardProviderPage();
  if (!allowed) return;

  displayOpportunities();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    guardProviderPage,
    displayOpportunities,
    displayApplications,
    updateApplicationStatus,
  };
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    displayOpportunities();
  } else {
    window.location.href = "/login";
  }
});