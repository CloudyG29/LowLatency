let currentUser = null;
const fakeStatuses = { 1: "Pending", 2: "Hired", 3: "Rejected", 4: "Pending" };

function getApplications() {
  return JSON.parse(localStorage.getItem("applications") || "[]");
}

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
