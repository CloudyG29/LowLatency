let currentUser = null;

async function postOpportunity() {
  if (!currentUser) return;

  const msg = document.getElementById("msg");
  const listname = document.getElementById("listname").value;
  const list_type = document.getElementById("list_type").value;
  const nqf_level = document.getElementById("nqf_level").value;
  const description = document.getElementById("description").value;
  const requirements = document.getElementById("requirements").value;
  const closing_date = document.getElementById("closing_date").value;
  const stipend = document.getElementById("stipend").value;
  const location = document.getElementById("location").value;
  const duration = document.getElementById("duration").value;
  const sector = document.getElementById("sector").value;

  if (!listname || !list_type || !sector || !stipend || !location || !duration || !requirements || !nqf_level || !closing_date) {
    msg.innerText = "Please fill in all fields before posting a job";
    msg.style.color = "#fc8181";
    return;
  }

  try {
    const response = await fetch("/api/listings/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        listname, list_type, sector, nqf_level, description,
        requirements, closing_date, stipend, location, duration,
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
    const response = await fetch(`/api/listings/provider?email=${currentUser.email}`);
    const listings = await response.json();

    if (listings.length === 0) {
      container.innerHTML = '<div class="empty-state">You have not posted any opportunities yet.</div>';
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
    });
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Error loading opportunities.</div>';
  }
}

async function displayApplications() {
  const container = document.getElementById("applicationsList");
  container.innerHTML = '<div class="empty-state">Loading applications...</div>';
  try {
    const response = await fetch(`/api/listings/provider-applications?email=${currentUser.email}`);
    const applications = await response.json();

    if (applications.length === 0) {
      container.innerHTML = '<div class="empty-state">No applications received yet.</div>';
      return;
    }

    container.innerHTML = "";
    applications.forEach((app) => {
      const div = document.createElement("div");
      div.className = "opportunity-card";
      div.innerHTML = `
        <p><strong>${app.user.name} ${app.user.surname}</strong> applied for <strong>${app.listing.listname}</strong></p>
        <p><strong>Email:</strong> ${app.user.email}</p>
        <p><strong>Applied on:</strong> ${new Date(app.created_at).toDateString()}</p>
        <p><strong>Status:</strong> <span class="status-badge status-${app.status}">${app.status}</span></p>
        ${app.status === "pending" ? `
          <button class="btn-hire" data-id="${app.application_id}">Hire</button>
          <button class="btn-reject" data-id="${app.application_id}">Reject</button>
        ` : ""}
      `;
      container.appendChild(div);
    });

    document.querySelectorAll(".btn-hire").forEach((btn) => {
      btn.addEventListener("click", async () => {
        await fetch(`/api/listings/applications/${btn.dataset.id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "hired" }),
        });
        displayApplications();
      });
    });

    document.querySelectorAll(".btn-reject").forEach((btn) => {
      btn.addEventListener("click", async () => {
        await fetch(`/api/listings/applications/${btn.dataset.id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "rejected" }),
        });
        displayApplications();
      });
    });
  } catch (error) {
    container.innerHTML = '<div class="empty-state">Error loading applications.</div>';
  }
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

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    displayOpportunities();
  } else {
    window.location.href = "/login";
  }
});