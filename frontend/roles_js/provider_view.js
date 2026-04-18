async function guardProviderPage() {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(async (currentUser) => {
            try {
                if (!currentUser) {
                    window.location.href = "/login";
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
                    window.location.href = "/login";
                    return resolve(false);
                }

                const data = await response.json();

                if (data.role !== "Provider") {
                    window.location.href = "/login";
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
                console.error("Provider guard failed:", error);
                window.location.href = "/login";
                resolve(false);
            }
        });
    });
}

// STORAGE
let myOpportunities = JSON.parse(localStorage.getItem('providerOpportunities') || '[]');

function saveOpportunities() {
    localStorage.setItem('providerOpportunities', JSON.stringify(myOpportunities));
}

// POST
function postOpportunity() {
    const titleInput = document.getElementById('title');
    const companyInput = document.getElementById('company');
    const locationInput = document.getElementById('location');
    const durationInput = document.getElementById('duration');
    const stipendInput = document.getElementById('stipend');
    const descriptionInput = document.getElementById('description');
    const msg = document.getElementById('msg');

    const opp = {
        title: titleInput ? titleInput.value.trim() : '',
        company: companyInput ? companyInput.value.trim() : '',
        location: locationInput ? locationInput.value.trim() : '',
        duration: durationInput ? durationInput.value.trim() : '',
        stipend: stipendInput ? stipendInput.value.trim() : '',
        description: descriptionInput ? descriptionInput.value.trim() : '',
        status: 'pending'
    };

    if (!opp.title || !opp.company) {
        if (msg) {
            msg.innerText = "⚠️ Fill title + company";
            msg.style.color = "#fc8181";
        }
        return;
    }

    myOpportunities.push(opp);
    saveOpportunities();

    if (msg) {
        msg.innerText = "✅ Posted! Waiting for admin.";
        msg.style.color = "#68d391";
    }

    document.querySelectorAll('input, textarea').forEach(el => el.value = '');
    displayOpportunities();
}

// DISPLAY OPPORTUNITIES
function displayOpportunities() {
    const container = document.getElementById('myOpportunities');
    if (!container) return;

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
            <p>${opp.company} · ${opp.location || 'No location provided'}</p>
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
    return JSON.parse(localStorage.getItem('applications') || '[]');
}

function saveApplications(apps) {
    localStorage.setItem('applications', JSON.stringify(apps));
}

function displayApplications() {
    const container = document.getElementById('applicationsList');
    if (!container) return;

    const apps = getApplications();

    if (apps.length === 0) {
        container.innerHTML = '<p style="color:#718096;">No applications yet.</p>';
        return;
    }

    container.innerHTML = '';

    apps.forEach((app, i) => {
        const div = document.createElement('div');
        div.className = 'opportunity-card';

        div.innerHTML = `
            <p><strong>${app.applicantName || 'Unknown Applicant'}</strong> applied for ${app.title}</p>
            <span class="status-badge status-${(app.status || 'Pending').toLowerCase()}">${app.status || 'Pending'}</span><br><br>
            ${app.status === 'Pending' ? `
                <button class="btn-hire" onclick="hire(${i})">Hire</button>
                <button class="btn-reject" onclick="reject(${i})">Reject</button>
            ` : ''}
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
function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    if (tabName === 'post') {
        const tabBtn = document.getElementById('tab-post') || document.querySelectorAll('.tab')[0];
        if (tabBtn) tabBtn.classList.add('active');

        const postTab = document.getElementById('postTab');
        if (postTab) postTab.classList.add('active');

    } else if (tabName === 'manage') {
        const tabBtn = document.getElementById('tab-manage') || document.querySelectorAll('.tab')[1];
        if (tabBtn) tabBtn.classList.add('active');

        const manageTab = document.getElementById('manageTab');
        if (manageTab) manageTab.classList.add('active');

        displayOpportunities();

    } else if (tabName === 'applications') {
        const tabBtn = document.getElementById('tab-apps') || document.querySelectorAll('.tab')[2];
        if (tabBtn) tabBtn.classList.add('active');

        const applicationsTab = document.getElementById('applicationsTab');
        if (applicationsTab) applicationsTab.classList.add('active');

        displayApplications();
    }
}

// INIT
document.addEventListener("DOMContentLoaded", async () => {
    const allowed = await guardProviderPage();
    if (!allowed) return;

    displayOpportunities();

    const postButton = document.getElementById('postOpportunityBtn');
    if (postButton) {
        postButton.addEventListener('click', postOpportunity);
    }
});