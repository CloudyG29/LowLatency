let currentUser = JSON.parse(localStorage.getItem('userData') || '{}');

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.remove('hidden');
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
}

async function getAuthHeaders() {
    const user = await new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((u) => resolve(u));
    });
    
    if (!user) return {};
    
    const token = await user.getIdToken();
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
}

async function guardAdminPage() {
    showLoader();
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(async (user) => {
            try {
                if (!user) {
                    window.location.assign("/login");
                    hideLoader();
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
                    await firebase.auth().signOut();
                    window.location.assign("/login");
                    hideLoader();
                    return resolve(false);
                }

                const data = await response.json();

                if (data.role !== "Admin") {
                    window.location.assign("/login");
                    hideLoader();
                    return resolve(false);
                }

                currentUser = user;
                hideLoader();
                resolve(true);
            } catch (error) {
                console.error("Admin guard failed:", error);
                window.location.assign("/login");
                hideLoader();
                resolve(false);
            }
        });
    });
}

async function updateStats() {
    try {
        const headers = await getAuthHeaders();
        
        const [allResponse, pendingResponse, usersResponse] = await Promise.all([
            fetch("/api/listings/all", { headers }),
            fetch("/api/listings/pending", { headers }),
            fetch("/api/admin/users", { headers })
        ]);

        const all = await allResponse.json();
        const pending = await pendingResponse.json();
        const users = await usersResponse.json();

        const totalOpportunities = document.getElementById("totalOpportunities");
        const pendingOpportunities = document.getElementById("pendingOpportunities");
        const totalApplicants = document.getElementById("totalApplicants");
        const totalProviders = document.getElementById("totalProviders");

        if (totalOpportunities) totalOpportunities.innerText = all.length || 0;
        if (pendingOpportunities) pendingOpportunities.innerText = pending.length || 0;
        if (totalApplicants) totalApplicants.innerText = users.filter(u => u.role === "Applicant").length || 0;
        if (totalProviders) totalProviders.innerText = users.filter(u => u.role === "Provider").length || 0;
        
        return { all, pending, users };
    } catch (error) {
        console.error("Error updating stats:", error);
        throw error;
    }
}

async function displayPending() {
    const container = document.getElementById("pendingTable");
    if (!container) return;

    try {
        const headers = await getAuthHeaders();
        const response = await fetch("/api/listings/pending", { headers });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const pending = await response.json();

        if (!pending || pending.length === 0) {
            container.innerHTML = "<p style='padding: 20px; text-align: center; color: #a0aec0;'>No pending opportunities.</p>";
            return;
        }

        let html = `
            <table class="admin-table">
                <thead>
                    <tr><th>Title</th><th>Provider</th><th>Type</th><th>NQF</th><th>Location</th><th>Actions</th></tr>
                </thead>
                <tbody>
        `;

        pending.forEach((opp) => {
            html += `
                <tr>
                    <td>${escapeHtml(opp.listname)}</td>
                    <td>${escapeHtml(opp.provider?.provider_name || 'Unknown')}</td>
                    <td>${escapeHtml(opp.list_type || 'N/A')}</td>
                    <td>${opp.nqf_level || 'N/A'}</td>
                    <td>${escapeHtml(opp.location || 'N/A')}</td>
                    <td>
                        <button class="btn-approve" data-id="${opp.listings_id}">Approve</button>
                        <button class="btn-reject" data-id="${opp.listings_id}">Reject</button>
                    </td>
                </tr>
            `;
        });

        html += "</tbody></div>";
        container.innerHTML = html;

        document.querySelectorAll(".btn-approve").forEach((btn) => {
            btn.addEventListener("click", async () => {
                showLoader();
                const id = btn.getAttribute("data-id");
                const headers = await getAuthHeaders();
                await fetch(`/api/listings/${id}/status`, {
                    method: "PATCH",
                    headers,
                    body: JSON.stringify({ status: "approved" }),
                });
                await displayPending();
                await displayAll();
                await updateStats();
                hideLoader();
            });
        });

        document.querySelectorAll(".btn-reject").forEach((btn) => {
            btn.addEventListener("click", async () => {
                showLoader();
                const id = btn.getAttribute("data-id");
                const headers = await getAuthHeaders();
                await fetch(`/api/listings/${id}/status`, {
                    method: "PATCH",
                    headers,
                    body: JSON.stringify({ status: "rejected" }),
                });
                await displayPending();
                await displayAll();
                await updateStats();
                hideLoader();
            });
        });
    } catch (error) {
        console.error("Error displaying pending:", error);
        container.innerHTML = `<p style='padding: 20px; text-align: center; color: #fc8181;'>Error loading pending opportunities: ${error.message}</p>`;
    }
}

async function displayAll() {
    const container = document.getElementById("allTable");
    if (!container) return;

    try {
        const headers = await getAuthHeaders();
        const response = await fetch("/api/listings/all", { headers });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const listings = await response.json();

        if (!listings || listings.length === 0) {
            container.innerHTML = "<p style='padding: 20px; text-align: center; color: #a0aec0;'>No opportunities found.</p>";
            return;
        }

        let html = `
            <table class="admin-table">
                <thead>
                    <tr><th>Title</th><th>Provider</th><th>Type</th><th>Status</th><th>Action</th>
                </thead>
                <tbody>
        `;

        listings.forEach((opp) => {
            const statusClass = opp.status === 'approved' ? 'status-approved' : (opp.status === 'pending' ? 'status-pending' : 'status-rejected');
            html += `
                <tr>
                    <td>${escapeHtml(opp.listname)}</td>
                    <td>${escapeHtml(opp.provider?.provider_name || 'Unknown')}</td>
                    <td>${escapeHtml(opp.list_type || 'N/A')}</td>
                    <td><span class="${statusClass}">${opp.status || 'N/A'}</span></td>
                    <td><button class="btn-delete" data-id="${opp.id}">Delete</button></td>
                </tr>
            `;
        });

        html += "</tbody></div>";
        container.innerHTML = html;

        document.querySelectorAll(".btn-delete").forEach((btn) => {
            btn.addEventListener("click", async () => {
                if (confirm("Are you sure you want to delete this opportunity?")) {
                    showLoader();
                    const id = btn.getAttribute("data-id");
                    const headers = await getAuthHeaders();
                    await fetch(`/api/listings/${id}`, { method: "DELETE", headers });
                    await displayPending();
                    await displayAll();
                    await updateStats();
                    hideLoader();
                }
            });
        });
    } catch (error) {
        console.error("Error displaying all listings:", error);
        container.innerHTML = `<p style='padding: 20px; text-align: center; color: #fc8181;'>Error loading opportunities: ${error.message}</p>`;
    }
}

async function displayUsers() {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch("/api/admin/users", { headers });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const users = await response.json();
        const applicants = users.filter(u => u.role === "Applicant");
        const providers = users.filter(u => u.role === "Provider");

        const applicantsContainer = document.getElementById("applicantsTable");
        if (applicantsContainer) {
            if (applicants.length === 0) {
                applicantsContainer.innerHTML = "<p>No applicants yet.</p>";
            } else {
                let html = `<table class="admin-table"><thead><tr><th>Name</th><th>Email</th></tr></thead><tbody>`;
                applicants.forEach(u => {
                    html += `<tr><td>${escapeHtml(u.name || '')} ${escapeHtml(u.surname || '')}</td><td>${escapeHtml(u.email)}</td></tr>`;
                });
                html += `</tbody></table>`;
                applicantsContainer.innerHTML = html;
            }
        }

        const providersContainer = document.getElementById("providersTable");
        if (providersContainer) {
            if (providers.length === 0) {
                providersContainer.innerHTML = "<p>No providers yet.</p>";
            } else {
                let html = `<table class="admin-table"><thead><tr><th>Name</th><th>Email</th></tr></thead><tbody>`;
                providers.forEach(u => {
                    html += `<tr><td>${escapeHtml(u.name || '')} ${escapeHtml(u.surname || '')}</td><td>${escapeHtml(u.email)}</td></tr>`;
                });
                html += `</tbody></table>`;
                providersContainer.innerHTML = html;
            }
        }
    } catch (error) {
        console.error("Error displaying users:", error);
    }
}

async function displayReports() {
    const container = document.getElementById("reportsTable");
    if (!container) return;

    try {
        const headers = await getAuthHeaders();
        const response = await fetch("/api/reports", { headers });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const reports = await response.json();

        if (!reports || reports.length === 0) {
            container.innerHTML = "<p style='padding: 20px; text-align: center; color: #a0aec0;'>No reports submitted yet.</p>";
            return;
        }

        // Count pending reports for stats
        const pendingCount = reports.filter(r => r.status === 'pending').length;
        const pendingReportsElem = document.getElementById("pendingReports");
        if (pendingReportsElem) pendingReportsElem.innerText = pendingCount;

        let html = `
            <table class="admin-table">
                <thead>
                    <tr><th>ID</th><th>Listing</th><th>Reported By</th><th>Reason</th><th>Status</th><th>Date</th><th>Action</th></tr>
                </thead>
                <tbody>
        `;

        reports.forEach((report) => {
            let statusClass = '';
            let statusText = '';
            
            if (report.status === 'pending') {
                statusClass = 'status-pending';
                statusText = 'Pending';
            } else if (report.status === 'resolved') {
                statusClass = 'status-approved';
                statusText = 'Resolved';
            } else {
                statusClass = 'status-rejected';
                statusText = 'Dismissed';
            }
            
            html += `
                <tr>
                    <td><span style="color:#38bdf8;font-weight:600;">#${report.report_id}</span></td>
                    <td><strong>${escapeHtml(report.listing?.listname || 'Deleted')}</strong></td>
                    <td>${escapeHtml(report.reported_by)}</td>
                    <td><span class="badge-reason" style="background:#7c2d12;color:#fca5a5;padding:4px 10px;border-radius:20px;font-size:0.7rem;">${escapeHtml(report.reason)}</span></td>
                    <td><span class="${statusClass}">${statusText}</span></td>
                    <td>${new Date(report.created_at).toDateString()}</td>
                    <td>
                        <button class="btn-view-details" data-id="${report.report_id}" style="background: linear-gradient(90deg, #1e40af, #1e3a8a); color: white; border: none; padding: 6px 16px; border-radius: 6px; cursor: pointer; font-size: 0.75rem; font-weight: 500; transition: all 0.2s;">
                            View Details
                        </button>
                    </td>
                </tr>
            `;
        });

        html += "</tbody></div>";
        container.innerHTML = html;

        // Add event listeners to the view details buttons
        document.querySelectorAll('.btn-view-details').forEach(btn => {
            btn.addEventListener('click', () => {
                const reportId = btn.getAttribute('data-id');
                window.location.href = `/admin/report/${reportId}`;
            });
            
            // Add hover effect
            btn.addEventListener('mouseenter', (e) => {
                e.target.style.background = 'linear-gradient(90deg, #1e3a8a, #1e40af)';
                e.target.style.transform = 'scale(1.02)';
            });
            btn.addEventListener('mouseleave', (e) => {
                e.target.style.background = 'linear-gradient(90deg, #1e40af, #1e3a8a)';
                e.target.style.transform = 'scale(1)';
            });
        });
    } catch (error) {
        console.error("Error displaying reports:", error);
        container.innerHTML = `<p style='padding: 20px; text-align: center; color: #fc8181;'>Error loading reports: ${error.message}</p>`;
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function showTab(tabName) {
    const opportunitiesTab = document.getElementById("opportunitiesTab");
    const usersTab = document.getElementById("usersTab");
    const reportsTab = document.getElementById("reportsTab");
    
    if (opportunitiesTab) opportunitiesTab.classList.remove("active");
    if (usersTab) usersTab.classList.remove("active");
    if (reportsTab) reportsTab.classList.remove("active");
    
    if (tabName === "opportunities") {
        if (opportunitiesTab) opportunitiesTab.classList.add("active");
    } else if (tabName === "users") {
        if (usersTab) usersTab.classList.add("active");
        displayUsers();
    } else if (tabName === "reports") {
        if (reportsTab) reportsTab.classList.add("active");
        displayReports();
    }
}

async function loadDataOnStartup() {
    const allowed = await guardAdminPage();
    if (!allowed) return;
    
    showLoader();
    try {
        await displayPending();
        await displayAll();
        await updateStats();
        
        // Load pending reports count for stats card
        const headers = await getAuthHeaders();
        const reportsResponse = await fetch("/api/reports", { headers });
        if (reportsResponse.ok) {
            const reports = await reportsResponse.json();
            const pendingCount = reports.filter(r => r.status === 'pending').length;
            const pendingReportsElem = document.getElementById("pendingReports");
            if (pendingReportsElem) pendingReportsElem.innerText = pendingCount;
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
    hideLoader();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const container = document.getElementById('main-content');
  
    sidebar.classList.toggle('collapsed');
    container.classList.toggle('expanded');
  }

// Make functions global
window.showTab = showTab;
window.displayUsers = displayUsers;

// Start the app
loadDataOnStartup();
if (typeof module !== "undefined" && module.exports) {
  module.exports = { guardAdminPage };
}