function getOpportunities() { return JSON.parse(localStorage.getItem('providerOpportunities') || '[]'); }
function saveOpportunities(o) { localStorage.setItem('providerOpportunities', JSON.stringify(o)); }

function updateStats() {
    const opportunities = getOpportunities();
    document.getElementById('totalOpportunities').innerText = opportunities.length;
    document.getElementById('pendingOpportunities').innerText = opportunities.filter(o => o.status === 'pending').length;
    const userData = localStorage.getItem('userData');
    let applicants = 0, providers = 0;
    if (userData) {
        const user = JSON.parse(userData);
        if (user.role === 'Applicant') applicants++;
        if (user.role === 'Provider') providers++;
    }
    document.getElementById('totalApplicants').innerText = applicants;
    document.getElementById('totalProviders').innerText = providers;
}

function displayPending() {
    const opportunities = getOpportunities();
    const pending = opportunities.filter(o => o.status === 'pending');
    const container = document.getElementById('pendingTable');
    if (pending.length === 0) { container.innerHTML = '<p>No pending opportunities.</p>'; return; }
    let html = '<table><tr><th>Title</th><th>Company</th><th>Location</th><th>Duration</th><th>Stipend</th><th>Actions</th></tr>';
    pending.forEach(opp => {
        const idx = opportunities.findIndex(o => o.title === opp.title && o.company === opp.company);
        html += `<tr><td>${opp.title}</td><td>${opp.company}</td><td>${opp.location}</td><td>${opp.duration}</td><td>${opp.stipend}</td><td>
            <button class="btn-approve" data-index="${idx}">Approve</button>
            <button class="btn-reject" data-index="${idx}">Reject</button>
        </td></tr>`;
    });
    html += '</table>';
    container.innerHTML = html;

    document.querySelectorAll('.btn-approve').forEach(btn => {
        btn.addEventListener('click', () => {
            const o = getOpportunities();
            o[parseInt(btn.getAttribute('data-index'))].status = 'approved';
            saveOpportunities(o); displayPending(); displayAll(); updateStats();
        });
    });

    document.querySelectorAll('.btn-reject').forEach(btn => {
        btn.addEventListener('click', () => {
            const o = getOpportunities();
            o.splice(parseInt(btn.getAttribute('data-index')), 1);
            saveOpportunities(o); displayPending(); displayAll(); updateStats();
        });
    });
}

function displayAll() {
    const opportunities = getOpportunities();
    const container = document.getElementById('allTable');
    if (opportunities.length === 0) { container.innerHTML = '<p>No opportunities.</p>'; return; }
    let html = '<table><tr><th>Title</th><th>Company</th><th>Location</th><th>Status</th><th>Action</th></tr>';
    opportunities.forEach((opp, index) => {
        html += `<tr><td>${opp.title}</td><td>${opp.company}</td><td>${opp.location}</td>
            <td><span class="${opp.status === 'approved' ? 'status-approved' : 'status-pending'}">${opp.status}</span></td>
            <td><button class="btn-delete" data-index="${index}">Delete</button></td></tr>`;
    });
    html += '</table>';
    container.innerHTML = html;

    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => {
            const o = getOpportunities();
            o.splice(parseInt(btn.getAttribute('data-index')), 1);
            saveOpportunities(o); displayPending(); displayAll(); updateStats();
        });
    });
}

function displayUsers() {
    const applicants = [], providers = [];
    const userData = localStorage.getItem('userData');
    if (userData) {
        const user = JSON.parse(userData);
        if (user.role === 'Applicant') applicants.push(user);
        if (user.role === 'Provider') providers.push(user);
    }

    let aHtml = applicants.length === 0 ? '<p>No applicants registered yet.</p>' :
        '<table><tr><th>Name</th><th>Email</th><th>Role</th></tr>' +
        applicants.map(u => `<tr><td>${u.firstName} ${u.lastName || ''}</td><td>${u.email}</td><td>Applicant</td></tr>`).join('') + '</table>';
    document.getElementById('applicantsTable').innerHTML = aHtml;

    let pHtml = providers.length === 0 ? '<p>No providers registered yet.</p>' :
        '<table><tr><th>Name</th><th>Email</th><th>Role</th></tr>' +
        providers.map(u => `<tr><td>${u.firstName}</td><td>${u.email}</td><td>Provider</td></tr>`).join('') + '</table>';
    document.getElementById('providersTable').innerHTML = pHtml;
}

function showTab(tabName) {
    // 1. Hide all tabs and contents first
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // 2. Route to the correct tab based on the exact name passed
    if (tabName === 'opportunities') {
        // Find the button (fallback to index 0 if no ID is set)
        const tabBtn = document.getElementById('tab-opps') || document.querySelectorAll('.tab')[0];
        if (tabBtn) tabBtn.classList.add('active');
        
        // Show content
        document.getElementById('opportunitiesTab').classList.add('active');
        
        // (Optional) If you have a specific render function for this page, call it here:
        // renderAdminOpportunities();
        
    } else if (tabName === 'users') {
        // Find the button (fallback to index 1 if no ID is set)
        const tabBtn = document.getElementById('tab-users') || document.querySelectorAll('.tab')[1];
        if (tabBtn) tabBtn.classList.add('active');
        
        // Show content
        document.getElementById('usersTab').classList.add('active');
        
        // Trigger the data load
        displayUsers();
    }
}

displayPending();
displayAll();
updateStats();
