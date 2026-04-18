// STORAGE
let myOpportunities = JSON.parse(
  localStorage.getItem("providerOpportunities") || "[]",
);
let currentUser = null;

function saveOpportunities() {
  localStorage.setItem(
    "providerOpportunities",
    JSON.stringify(myOpportunities),
  );
}

// POST
async function postOpportunity() {
  if (!currentUser) return;

  const listname = document.getElementById("listname").value;
  const list_type = document.getElementById("list_type").value;
  const nqf_level = document.getElementById("nqf_level").value;
  const description = document.getElementById("description").value;

  if (!listname || !list_type) {
    msg.innerText = "⚠️ Fill listing name and type";
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
        email: currentUser.email,
      }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    msg.innerText = "✅ Posted! Waiting for admin approval.";
    msg.style.color = "#68d391";
    document
      .querySelectorAll("input, textarea")
      .forEach((el) => (el.value = ""));
  } catch (error) {
    msg.innerText = "❌ " + error.message;
    msg.style.color = "#fc8181";
  }
}

// DISPLAY OPPORTUNITIES
function displayOpportunities() {
  const container = document.getElementById("myOpportunities");
  myOpportunities = JSON.parse(
    localStorage.getItem("providerOpportunities") || "[]",
  );

  if (myOpportunities.length === 0) {
    container.innerHTML = '<p style="color:#718096;">No opportunities yet.</p>';
    return;
  }

  container.innerHTML = "";

  myOpportunities.forEach((opp, i) => {
    const div = document.createElement("div");
    div.className = "opportunity-card";

    div.innerHTML = `
            <h3>${opp.title}</h3>
            <p>${opp.company} · ${opp.location}</p>
            <span class="status-badge status-${opp.status}">${opp.status}</span><br>
            <button class="delete-btn" onclick="deleteOpp(${i})">Delete</button>
        `;

    container.appendChild(div);
  });
}

// DELETE
function deleteOpp(i) {
  myOpportunities.splice(i, 1);
  saveOpportunities();
  displayOpportunities();
}

// APPLICATIONS
function getApplications() {
  return JSON.parse(localStorage.getItem("applications") || "[]");
}

function saveApplications(apps) {
  localStorage.setItem("applications", JSON.stringify(apps));
}

function displayApplications() {
  const container = document.getElementById("applicationsList");
  const apps = getApplications();

  if (apps.length === 0) {
    container.innerHTML = '<p style="color:#718096;">No applications yet.</p>';
    return;
  }

  container.innerHTML = "";

  apps.forEach((app, i) => {
    const div = document.createElement("div");
    div.className = "opportunity-card";

    div.innerHTML = `
            <p><strong>${app.applicantName}</strong> applied for ${app.title}</p>
            <span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span><br><br>
            ${
              app.status === "Pending"
                ? `
                <button class="btn-hire" onclick="hire(${i})">Hire</button>
                <button class="btn-reject" onclick="reject(${i})">Reject</button>
            `
                : ""
            }
        `;

    container.appendChild(div);
  });
}

// ACTIONS
function hire(i) {
  let apps = getApplications();
  apps[i].status = "Hired";
  saveApplications(apps);
  displayApplications();
}

function reject(i) {
  let apps = getApplications();
  apps[i].status = "Rejected";
  saveApplications(apps);
  displayApplications();
}

// TABS
function showTab(tab) {
  document
    .querySelectorAll(".tab")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((c) => c.classList.remove("active"));

  if (tab === "post") {
    document.querySelector(".tab:nth-child(1)").classList.add("active");
    postTab.classList.add("active");
  }

  if (tab === "manage") {
    document.querySelector(".tab:nth-child(2)").classList.add("active");
    manageTab.classList.add("active");
    displayOpportunities();
  }

  if (tab === "applications") {
    document.querySelector(".tab:nth-child(3)").classList.add("active");
    applicationsTab.classList.add("active");
    displayApplications();
  }
}

// INIT
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    displayOpportunities();
  } else {
    window.location.href = "/login"; // not logged in, kick them out
  }
});
