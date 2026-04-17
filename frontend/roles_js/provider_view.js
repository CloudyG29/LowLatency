// STORAGE
let myOpportunities = JSON.parse(localStorage.getItem('providerOpportunities') || '[]');

function saveOpportunities() {
localStorage.setItem('providerOpportunities', JSON.stringify(myOpportunities));
}

// POST
function postOpportunity() {
const opp = {
title: title.value,
company: company.value,
location: location.value,
duration: duration.value,
stipend: stipend.value,
description: description.value,
status: 'pending'
};

if (!opp.title || !opp.company) {
msg.innerText = "⚠️ Fill title + company";
msg.style.color = "#fc8181";
return;
}

myOpportunities.push(opp);
saveOpportunities();

msg.innerText =   "✅ Posted! Waiting for admin.";
msg.style.color = "#68d391";

document.querySelectorAll('input, textarea').forEach(el => el.value = '');
displayOpportunities();
}

// DISPLAY OPPORTUNITIES
function displayOpportunities() {
const container = document.getElementById('myOpportunities');
myOpportunities = JSON.parse(localStorage.getItem('providerOpportunities') || '[]');

if (myOpportunities.length === 0) {
container.innerHTML = '<p style="color:#718096;">No opportunities yet.</p>';
return;
}

container.innerHTML = '';

myOpportunities.forEach((opp, i) => {
const div = document.createElement('div');
div.className = 'opportunity-card';

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
async function displayApplications() {
const container = document.getElementById('applicationsList');
container.innerHTML = '<p style="color:#718096;">Loading applications...</p>';

try {
const firebaseUid = localStorage.getItem("uid");

if (!firebaseUid) {
container.innerHTML = '<p style="color:#fc8181;">No logged-in provider found.</p>';
return;
}

const response = await fetch(`/applications/provider/${firebaseUid}`);
const apps = await response.json();

if (apps.error) {
container.innerHTML = `<p style="color:#fc8181;">${apps.error}</p>`;
return;
}

if (apps.length === 0) {
container.innerHTML = '<p style="color:#718096;">No applications yet.</p>';
return;
}

container.innerHTML = '';

apps.forEach((app) => {
const div = document.createElement('div');
div.className = 'opportunity-card';

div.innerHTML = `
<p><strong>${app.user.name} ${app.user.surname}</strong> applied for ${app.listing.listname}</p>
<p>${app.user.email}</p>
<span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span><br><br>
${app.status === 'pending' ? `
<button class="btn-hire" onclick="updateApplicationStatus(${app.application_id}, 'accepted')">Accept</button>
<button class="btn-reject" onclick="updateApplicationStatus(${app.application_id}, 'rejected')">Reject</button>
` : ''}
`;

container.appendChild(div);
});

} catch (error) {
console.error("Error fetching applications:", error);
container.innerHTML = '<p style="color:#fc8181;">Failed to load applications.</p>';
}
}

async function updateApplicationStatus(applicationId, status) {
try {
const response = await fetch(`/applications/${applicationId}`, {
method: 'PATCH',
headers: {
'Content-Type': 'application/json'
},
body: JSON.stringify({ status })
});

const data = await response.json();

if (data.error) {
alert(data.error);
return;
}

displayApplications();
} catch (error) {
console.error("Error updating application status:", error);
alert("Failed to update application status.");
}
}

// TABS
function showTab(tab) {
document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

if (tab === 'post') {
document.querySelector('.tab:nth-child(1)').classList.add('active');
postTab.classList.add('active');
}

if (tab === 'manage') {
document.querySelector('.tab:nth-child(2)').classList.add('active');
manageTab.classList.add('active');
displayOpportunities();
}

if (tab === 'applications') {
document.querySelector('.tab:nth-child(3)').classList.add('active');
applicationsTab.classList.add('active');
displayApplications();
}
}

// INIT
displayOpportunities();
