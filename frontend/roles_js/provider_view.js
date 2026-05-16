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
        msg.innerText = "Please fill in all fields before posting a job";
        msg.style.color = "#fc8181";
        return;
    }

    try {
        const response = await fetch("/api/listings/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                listname, list_type, nqf_level, description,
                requirements, closing_date, stipend, location, duration,
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
        document.getElementById("list_type").value = "Select Type";
        displayOpportunities();
    } catch (error) {
        msg.innerText = "Error: " + error.message;
        msg.style.color = "#fc8181";
    }
}

async function displayOpportunities() {
    const container = document.getElementById("myOpportunities");
    container.innerHTML = '<div class="empty-state">Loading opportunities...</div>';
    try {
        showLoader();
        const response = await fetch(`/api/listings/provider?email=${currentUser.email}`);
        const listings = await response.json();

        if (listings.length === 0) {
            container.innerHTML = '<div class="empty-state">You have not posted any opportunities yet.</div>';
            hideLoader();
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
                ${(opp.status === "pending" || opp.status === "approved" || opp.status === "rejected")
                    ? `<button class="btn-edit" data-id="${opp.listings_id}" data-status="${opp.status}">Edit</button>`
                    : ``
                }
            `;
            container.appendChild(div);
        });
        hideLoader();
    } catch (error) {
        hideLoader();
        container.innerHTML = '<div class="empty-state">Error loading opportunities.</div>';
    }
}

async function displayApplications() {
    const container = document.getElementById("applicationsList");
    container.innerHTML = '<div class="empty-state">Loading applications...</div>';
    try {
        showLoader();
        const response = await fetch(`/api/listings/provider-applications?email=${currentUser.email}`);
        const applications = await response.json();

        if (applications.length === 0) {
            hideLoader();
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
        hideLoader();
    } catch (error) {
        hideLoader();
        container.innerHTML = '<div class="empty-state">Error loading applications.</div>';
    }
}

// Edit Listing Functions
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
            const date = new Date(listing.closing_date).toISOString().split('T')[0];
            document.getElementById('editClosingDate').value = date;
        }
        
        openModal('editListingModal');
        hideLoader();
    } catch (error) {
        hideLoader();
        console.error('Error loading listing:', error);
        alert('Failed to load listing details');
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
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Update failed');
        }
        
        if (data.message) {
            alert(data.message);
        } else {
            alert('Listing updated successfully!');
        }
        
        closeModal('editListingModal');
        displayOpportunities();
        hideLoader();
    } catch (error) {
        hideLoader();
        alert(error.message);
    }
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Loader Controls
function showLoader() {
    document.getElementById('loader').classList.remove('hidden');
}

function hideLoader() {
    document.getElementById('loader').classList.add('hidden');
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

document.addEventListener("DOMContentLoaded", async () => {
    const allowed = await guardProviderPage();
    if (!allowed) return;
    displayOpportunities();
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = { 
        guardProviderPage,
        displayOpportunities,
        displayApplications
    };
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        displayOpportunities();
    } else {
        window.location.href = "/login";
    }
});

document.addEventListener("click", async (event) => {
    // IF the user clicked an EDIT button
    if (event.target.closest(".btn-edit")) {
        const btn = event.target.closest(".btn-edit");
        const listingId = btn.getAttribute('data-id');
        const currentStatus = btn.getAttribute('data-status');
        
        if (currentStatus === 'approved') {
            const confirmEdit = confirm(
                'Admin has already approved your listing.\n\n' +
                'The edited version will need to be reviewed by admin again before it becomes visible to applicants.\n\n' +
                'Click OK to continue editing.'
            );
            if (confirmEdit) {
                openEditModal(listingId);
            }
        } else if (currentStatus === 'rejected') {
            const confirmEdit = confirm(
                'This listing was rejected.\n\n' +
                'You can edit and resubmit for admin review.\n\n' +
                'Click OK to continue editing.'
            );
            if (confirmEdit) {
                openEditModal(listingId);
            }
        } else {
            openEditModal(listingId);
        }
        return;
    }
    
    if (event.target.closest(".btn-hire")) {
        const btn = event.target.closest(".btn-hire");
        showLoader();
        try {
            await fetch(`/api/listings/applications/${btn.dataset.id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "hired" }),
            });
            displayApplications();
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            hideLoader();
        }
    }

    if (event.target.closest(".btn-reject")) {
        const btn = event.target.closest(".btn-reject");
        showLoader();
        try {
            await fetch(`/api/listings/applications/${btn.dataset.id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "rejected" }),
            });
            displayApplications();
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            hideLoader();
        }
    }
});