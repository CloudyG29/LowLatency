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
                    await firebase.auth().signOut().catch(() => { });
                    window.location.assign("/login");
                    return resolve(false);
                }

                const data = await response.json();

                if (data.role !== "Provider") {
                    window.location.assign("/login");
                    return resolve(false);
                }

                currentUser = user;

                let userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.email = data.email || "";
                userData.firstName = data.name || "";
                userData.lastName = data.surname || "";
                userData.role = data.role;

                localStorage.setItem("userData", JSON.stringify(userData));

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
    if (!container) return;

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
    if (!container) return;

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

    if (tab === "post") {
        const postTab = document.getElementById("postTab");
        if (postTab) postTab.classList.add("active");
    }

    if (tab === "manage") {
        const manageTab = document.getElementById("manageTab");
        if (manageTab) manageTab.classList.add("active");
        displayOpportunities();
    }

    if (tab === "applications") {
        const applicationsTab = document.getElementById("applicationsTab");
        if (applicationsTab) applicationsTab.classList.add("active");
        displayApplications();
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const allowed = await guardProviderPage();
    if (!allowed) return;

    displayOpportunities();
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = { guardProviderPage };
}