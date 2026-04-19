function redirectToLogin() {
    if (typeof window !== "undefined" && typeof window.__redirectToLoginMock === "function") {
        window.__redirectToLoginMock("/login");
        return;
    }
    window.location.assign("/login");
}

async function guardAdminPage() {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(async (currentUser) => {
            try {
                if (!currentUser) {
                    redirectToLogin();
                    return resolve(false);
                }

                const token = await currentUser.getIdToken();

                const response = await fetch("/api/user/role", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    await firebase.auth().signOut().catch(() => {});
                    redirectToLogin();
                    return resolve(false);
                }

                const data = await response.json();

                if (data.role !== "Admin") {
                    redirectToLogin();
                    return resolve(false);
                }

                let userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.email = data.email || "";
                userData.firstName = data.name || "";
                userData.lastName = data.surname || "";
                userData.role = data.role;

                localStorage.setItem("userData", JSON.stringify(userData));

                resolve(true);
            } catch (error) {
                console.error("Admin guard failed:", error);
                redirectToLogin();
                resolve(false);
            }
        });
    });
}
// STORAGE
function getOpportunities() {
    return JSON.parse(localStorage.getItem('providerOpportunities') || '[]');
}

function saveOpportunities(o) {
    localStorage.setItem('providerOpportunities', JSON.stringify(o));
}

// STATS
function updateStats() {
    const opportunities = getOpportunities();

    const totalOpportunities = document.getElementById('totalOpportunities');
    const pendingOpportunities = document.getElementById('pendingOpportunities');
    const totalApplicants = document.getElementById('totalApplicants');
    const totalProviders = document.getElementById('totalProviders');

    if (totalOpportunities) totalOpportunities.innerText = opportunities.length;
    if (pendingOpportunities) pendingOpportunities.innerText = opportunities.filter(o => o.status === 'pending').length;

    const userData = localStorage.getItem('userData');
    let applicants = 0, providers = 0;

    if (userData) {
        const user = JSON.parse(userData);
        if (user.role === 'Applicant') applicants++;
        if (user.role === 'Provider') providers++;
    }

    if (totalApplicants) totalApplicants.innerText = applicants;
    if (totalProviders) totalProviders.innerText = providers;
}

// PENDING
function displayPending() {
    const opportunities = getOpportunities();
    const pending = opportunities.filter(o => o.status === 'pending');
    const container = document.getElementById('pendingTable');

    if (!container) return;

    if (pending.length === 0) {
        container.innerHTML = '<p>No pending opportunities.</p>';
        return;
    }

    let html = '<table><tr><th>Title</th><th>Company</th><th>Location</th><th>Duration</th><th>Stipend</th><th>Actions</th></tr>';

    pending.forEach(opp => {
        const idx = opportunities.findIndex(o => o.title === opp.title && o.company === opp.company);

        html += `
        <tr>
            <td>${opp.title}</td>
            <td>${opp.company}</td>
            <td>${opp.location}</td>
            <td>${opp.duration}</td>
            <td>${opp.stipend}</td>
            <td>
                <button class="btn-approve" data-index="${idx}">Approve</button>
                <button class="btn-reject" data-index="${idx}">Reject</button>
            </td>
        </tr>`;
    });

    html += '</table>';
    container.innerHTML = html;

    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', () => {
            const o = getOpportunities();
            o[parseInt(btn.getAttribute('data-index'))].status = 'approved';
            saveOpportunities(o);
            displayPending();
            displayAll();
            updateStats();
        });
    });

    document.querySelectorAll('.btn-reject').forEach(btn => {
        btn.addEventListener('click', () => {
            const o = getOpportunities();
            o.splice(parseInt(btn.getAttribute('data-index')), 1);
            saveOpportunities(o);
            displayPending();
            displayAll();
            updateStats();
        });
    });
}

// ALL OPPORTUNITIES
function displayAll() {
    const opportunities = getOpportunities();
    const container = document.getElementById('allTable');

    if (!container) return;

    if (opportunities.length === 0) {
        container.innerHTML = '<p>No opportunities.</p>';
        return;
    }

    let html = '<table><tr><th>Title</th><th>Company</th><th>Location</th><th>Status</th><th>Action</th></tr>';

    opportunities.forEach((opp, index) => {
        html += `
        <tr>
            <td>${opp.title}</td>
            <td>${opp.company}</td>
            <td>${opp.location}</td>
            <td>
                <span class="${opp.status === 'approved' ? 'status-approved' : 'status-pending'}">
                    ${opp.status}
                </span>
            </td>
            <td>
                <button class="btn-delete" data-index="${index}">Delete</button>
            </td>
        </tr>`;
    });

    html += '</table>';
    container.innerHTML = html;

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const o = getOpportunities();
            o.splice(parseInt(btn.getAttribute('data-index')), 1);
            saveOpportunities(o);
            displayPending();
            displayAll();
            updateStats();
        });
    });
}

// USERS
function displayUsers() {
    const applicants = [], providers = [];
    const userData = localStorage.getItem('userData');

    if (userData) {
        const user = JSON.parse(userData);
        if (user.role === 'Applicant') applicants.push(user);
        if (user.role === 'Provider') providers.push(user);
    }

    const applicantsTable = document.getElementById('applicantsTable');
    const providersTable = document.getElementById('providersTable');

    if (applicantsTable) {
        applicantsTable.innerHTML = applicants.length === 0
            ? '<p>No applicants registered yet.</p>'
            : '<table><tr><th>Name</th><th>Email</th><th>Role</th></tr>' +
              applicants.map(u => `<tr><td>${u.firstName} ${u.lastName || ''}</td><td>${u.email}</td><td>Applicant</td></tr>`).join('') +
              '</table>';
    }

    if (providersTable) {
        providersTable.innerHTML = providers.length === 0
            ? '<p>No providers registered yet.</p>'
            : '<table><tr><th>Name</th><th>Email</th><th>Role</th></tr>' +
              providers.map(u => `<tr><td>${u.firstName || ''}</td><td>${u.email}</td><td>Provider</td></tr>`).join('') +
              '</table>';
    }
}

// TABS
function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    if (tabName === 'opportunities') {
        const tabBtn = document.getElementById('tab-opps') || document.querySelectorAll('.tab')[0];
        if (tabBtn) tabBtn.classList.add('active');

        document.getElementById('opportunitiesTab')?.classList.add('active');

    } else if (tabName === 'users') {
        const tabBtn = document.getElementById('tab-users') || document.querySelectorAll('.tab')[1];
        if (tabBtn) tabBtn.classList.add('active');

        document.getElementById('usersTab')?.classList.add('active');
        displayUsers();
    }
}

// INIT
document.addEventListener("DOMContentLoaded", async () => {
    const allowed = await guardAdminPage();
    if (!allowed) return;

    document.body.style.display = "block";
    displayPending();
    displayAll();
    updateStats();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = { guardAdminPage };
}