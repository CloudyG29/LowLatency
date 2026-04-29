let currentUser = null;

async function guardAdminPage() {
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
                    await firebase.auth().signOut().catch(() => { });
                    window.location.assign("/login");
                    return resolve(false);
                }

                const data = await response.json();

                if (data.role !== "Admin") {
                    window.location.assign("/login");
                    return resolve(false);
                }

                currentUser = user;
                resolve(true);
            } catch (error) {
                console.error("Admin guard failed:", error);
                window.location.assign("/login");
                resolve(false);
            }
        });
    });
}

async function updateStats() {
    const [all, pending, users] = await Promise.all([
        fetch("/api/listings/all").then((r) => r.json()),
        fetch("/api/listings/pending").then((r) => r.json()),
        fetch("/api/admin/users").then((r) => r.json()),
    ]);

    const totalOpportunities = document.getElementById("totalOpportunities");
    const pendingOpportunities = document.getElementById("pendingOpportunities");
    const totalApplicants = document.getElementById("totalApplicants");
    const totalProviders = document.getElementById("totalProviders");

    if (totalOpportunities) totalOpportunities.innerText = all.length;
    if (pendingOpportunities) pendingOpportunities.innerText = pending.length;
    if (totalApplicants) totalApplicants.innerText = users.filter((u) => u.role === "Applicant").length;
    if (totalProviders) totalProviders.innerText = users.filter((u) => u.role === "Provider").length;
}

async function displayPending() {
    const container = document.getElementById("pendingTable");
    if (!container) return;

    const pending = await fetch("/api/listings/pending").then((r) => r.json());

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
    const container = document.getElementById("allTable");
    if (!container) return;

    const listings = await fetch("/api/listings/all").then((r) => r.json());

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
    const applicantsTable = document.getElementById("applicantsTable");
    const providersTable = document.getElementById("providersTable");
    if (!applicantsTable || !providersTable) return;

    const users = await fetch("/api/admin/users").then((r) => r.json());
    const applicants = users.filter((u) => u.role === "Applicant");
    const providers = users.filter((u) => u.role === "Provider");

    applicantsTable.innerHTML =
        applicants.length === 0
            ? "<p>No applicants yet.</p>"
            : "<table><tr><th>Name</th><th>Email</th></tr>" +
            applicants.map((u) => `
<tr>
<td>${u.name} ${u.surname}</td>
<td>${u.email}</td>
</tr>`).join("") +
            "</table>";

    providersTable.innerHTML =
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
        const opportunitiesTab = document.getElementById("opportunitiesTab");
        if (opportunitiesTab) opportunitiesTab.classList.add("active");
    } else {
        const usersTab = document.getElementById("usersTab");
        if (usersTab) usersTab.classList.add("active");
        displayUsers();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const allowed = await guardAdminPage();
    if (!allowed) return;

    displayPending();
    displayAll();
    updateStats();
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = { guardAdminPage };
}