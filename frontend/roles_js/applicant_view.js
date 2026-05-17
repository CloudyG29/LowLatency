let currentUser = null;

// ================= AUTH GUARD =================
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

// ================= POST OPPORTUNITY =================
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
        msg.innerText = "Please fill in all fields before posting a job";
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

        msg.innerText = "Posted! Waiting for admin approval.";
        msg.style.color = "#68d391";

        document.querySelectorAll("input, textarea, select").forEach((el) => {
            if (el.id !== "list_type") el.value = "";
        });

        displayOpportunities();

    } catch (error) {
        msg.innerText = "Error: " + error.message;
        msg.style.color = "#fc8181";
    }
}

// ================= DISPLAY OPPORTUNITIES =================
async function displayOpportunities() {
    const container = document.getElementById("myOpportunities");
    if (!container) return;

    container.innerHTML = '<div class="empty-state">Loading opportunities...</div>';

    try {
        showLoader();

        const response = await fetch(`/api/listings/provider?email=${currentUser.email}`);
        const listings = await response.json();

        if (listings.length === 0) {
            container.innerHTML = '<div class="empty-state">No opportunities yet.</div>';
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

                <button class="btn-edit" data-id="${opp.listings_id}" data-status="${opp.status}">
                    Edit
                </button>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        container.innerHTML = '<div class="empty-state">Error loading opportunities.</div>';
    } finally {
        hideLoader();
    }
}

// ================= APPLICATIONS =================
async function displayApplications() {
    const container = document.getElementById("applicationsList");
    if (!container) return;

    container.innerHTML = '<div class="empty-state">Loading applications...</div>';

    try {
        showLoader();

        const response = await fetch(`/api/listings/provider-applications?email=${currentUser.email}`);
        const applications = await response.json();

        if (applications.length === 0) {
            container.innerHTML = '<div class="empty-state">No applications yet.</div>';
            return;
        }

        container.innerHTML = "";

        applications.forEach((app) => {
            const div = document.createElement("div");

            div.className = "opportunity-card";
            div.innerHTML = `
                <p><strong>${app.user.name} ${app.user.surname}</strong> applied for <strong>${app.listing.listname}</strong></p>
                <p><strong>Email:</strong> ${app.user.email}</p>
                <p><strong>Date:</strong> ${new Date(app.created_at).toDateString()}</p>
                <p><strong>Status:</strong> <span class="status-badge status-${app.status}">${app.status}</span></p>

                ${app.status === "pending" ? `
                    <button class="btn-hire" data-id="${app.application_id}">Hire</button>
                    <button class="btn-reject" data-id="${app.application_id}">Reject</button>
                ` : ""}
            `;

            container.appendChild(div);
        });

    } catch (error) {
        container.innerHTML = '<div class="empty-state">Error loading applications.</div>';
    } finally {
        hideLoader();
    }
}

// ================= EDIT LISTING =================
async function openEditModal(listingId) {
    try {
        showLoader();

        const response = await fetch(`/api/listings/${listingId}`);
        const listing = await response.json();

        document.getElementById('editListingId').value = listing.listings_id;
        document.getElementById('editListname').value = listing.listname;
        document.getElementById('editListType').value = listing.list_type;
        document.getElementById('editNqfLevel').value = listing.nqf_level;
        document.getElementById('editLocation').value = listing.location || '';
        document.getElementById('editStipend').value = listing.stipend;
        document.getElementById('editDuration').value = listing.duration || '';
        document.getElementById('editRequirements').value = listing.requirements || '';
        document.getElementById('editDescription').value = listing.description || '';

        if (listing.closing_date) {
            document.getElementById('editClosingDate').value =
                new Date(listing.closing_date).toISOString().split('T')[0];
        }

        openModal('editListingModal');

    } catch (error) {
        alert("Failed to load listing");
    } finally {
        hideLoader();
    }
}

async function saveListingEdits() {
    const listingId = document.getElementById('editListingId').value;

    const updatedData = {
        listname: document.getElementById('editListname').value,
        list_type: document.getElementById('editListType').value,
        nqf_level: parseInt(document.getElementById('editNqfLevel').value),
        location: document.getElementById('editLocation').value,
        stipend: parseFloat(document.getElementById('editStipend').value),
        duration: document.getElementById('editDuration').value,
        requirements: document.getElementById('editRequirements').value,
        description: document.getElementById('editDescription').value,
        closing_date: document.getElementById('editClosingDate').value
    };

    try {
        showLoader();

        const response = await fetch(`/api/listings/${listingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);

        alert("Updated successfully");

        closeModal('editListingModal');
        displayOpportunities();

    } catch (error) {
        alert(error.message);
    } finally {
        hideLoader();
    }
}

// ================= MODALS =================
function openModal(id) {
    document.getElementById(id).classList.add("active");
}

function closeModal(id) {
    document.getElementById(id).classList.remove("active");
}

// ================= LOADER =================
function showLoader() {
    document.getElementById("loader").classList.remove("hidden");
}

function hideLoader() {
    document.getElementById("loader").classList.add("hidden");
}

// ================= GLOBAL CLICK HANDLER =================
document.addEventListener("click", async (event) => {

    const editBtn = event.target.closest(".btn-edit");
    const hireBtn = event.target.closest(".btn-hire");
    const rejectBtn = event.target.closest(".btn-reject");

    if (editBtn) {
        const id = editBtn.dataset.id;
        const status = editBtn.dataset.status;

        if (status === "approved" || status === "rejected") {
            if (!confirm("This will resubmit for admin review. Continue?")) return;
        }

        openEditModal(id);
    }

    if (hireBtn || rejectBtn) {
        const id = (hireBtn || rejectBtn).dataset.id;
        const status = hireBtn ? "hired" : "rejected";

        try {
            showLoader();

            await fetch(`/api/listings/applications/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });

            displayApplications();

        } finally {
            hideLoader();
        }
    }
});

// ================= INIT =================
document.addEventListener("DOMContentLoaded", async () => {
    const allowed = await guardProviderPage();
    if (!allowed) return;

    displayOpportunities();
});