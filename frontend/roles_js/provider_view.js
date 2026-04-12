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

    msg.innerText = "✅ Posted! Waiting for admin.";
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
function getApplications() {
    return JSON.parse(localStorage.getItem('applications') || '[]');
}

function saveApplications(apps) {
    localStorage.setItem('applications', JSON.stringify(apps));
}

function displayApplications() {
    const container = document.getElementById('applicationsList');
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
            <p><strong>${app.applicantName}</strong> applied for ${app.title}</p>
            <span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span><br><br>
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
