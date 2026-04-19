let currentUser = null;

async function updateStats() {
  const [all, pending, users] = await Promise.all([
    fetch("/api/listings/all").then((r) => r.json()),
    fetch("/api/listings/pending").then((r) => r.json()),
    fetch("/api/admin/users").then((r) => r.json()),
  ]);

  document.getElementById("totalOpportunities").innerText = all.length;
  document.getElementById("pendingOpportunities").innerText = pending.length;
  document.getElementById("totalApplicants").innerText = users.filter((u) => u.role === "Applicant").length;
  document.getElementById("totalProviders").innerText = users.filter((u) => u.role === "Provider").length;
}

async function displayPending() {
  const pending = await fetch("/api/listings/pending").then((r) => r.json());
  const container = document.getElementById("pendingTable");

  if (pending.length === 0) {
    container.innerHTML = "<p>No pending opportunities.</p>";
    return;
  }

  let html = "<table><tr><th>Title</th><th>Provider</th><th>Type</th><th>NQF</th><th>Actions</th></tr>";
  pending.forEach((opp) => {
    html += `<tr>
      <td>${opp.listname}</td>
      <td>${opp.provider.provider_name}</td>
      <td>${opp.list_type}</td>
      <td>${opp.nqf_level || "N/A"}</td>
      <td>
        <button class="btn-approve" data-id="${opp.listings_id}">Approve</button>
        <button class="btn-reject" data-id="${opp.listings_id}">Reject</button>
      </td>
    </tr>`;
  });
  html += "</table>";
  container.innerHTML = html;

  document.querySelectorAll(".btn-approve").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await fetch(`/api/listings/${btn.getAttribute("data-id")}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });
      displayPending();
      displayAll();
      updateStats();
    });
  });

  document.querySelectorAll(".btn-reject").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await fetch(`/api/listings/${btn.getAttribute("data-id")}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected" }),
      });
      displayPending();
      displayAll();
      updateStats();
    });
  });
}

async function displayAll() {
  const listings = await fetch("/api/listings/all").then((r) => r.json());
  const container = document.getElementById("allTable");

  if (listings.length === 0) {
    container.innerHTML = "<p>No opportunities.</p>";
    return;
  }

  let html = "<table><tr><th>Title</th><th>Provider</th><th>Type</th><th>Status</th><th>Action</th></tr>";
  listings.forEach((opp) => {
    html += `<tr>
      <td>${opp.listname}</td>
      <td>${opp.provider.provider_name}</td>
      <td>${opp.list_type}</td>
      <td><span class="status-${opp.status}">${opp.status}</span></td>
      <td><button class="btn-delete" data-id="${opp.listings_id}">Delete</button></td>
    </tr>`;
  });
  html += "</table>";
  container.innerHTML = html;

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async () => {
      await fetch(`/api/listings/${btn.getAttribute("data-id")}`, { method: "DELETE" });
      displayPending();
      displayAll();
      updateStats();
    });
  });
}

async function displayUsers() {
  const users = await fetch("/api/admin/users").then((r) => r.json());
  const applicants = users.filter((u) => u.role === "Applicant");
  const providers = users.filter((u) => u.role === "Provider");

  document.getElementById("applicantsTable").innerHTML =
    applicants.length === 0
      ? "<p>No applicants yet.</p>"
      : "<table><tr><th>Name</th><th>Email</th></tr>" +
        applicants.map((u) => `
          <tr>
            <td>${u.name} ${u.surname}</td>
            <td>${u.email}</td>
          </tr>`).join("") +
        "</table>";

  document.getElementById("providersTable").innerHTML =
    providers.length === 0
      ? "<p>No providers yet.</p>"
      : "<table><tr><th>Name</th><th>Email</th></tr>" +
        providers.map((u) => `
          <tr>
            <td>${u.name} ${u.surname}</td>
            <td>${u.email}</td>
          </tr>`).join("") +
        "</table>";
}

function showTab(tabName) {
  document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));

  if (tabName === "opportunities") {
    document.getElementById("opportunitiesTab").classList.add("active");
  } else {
    document.getElementById("usersTab").classList.add("active");
    displayUsers();
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    displayPending();
    displayAll();
    updateStats();
  } else {
    window.location.href = "/login";
  }
});