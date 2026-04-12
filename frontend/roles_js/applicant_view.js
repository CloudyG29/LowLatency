const hardcodedOpportunities = [
    { id: 1, title: "Software Internship", company: "Amazon", location: "Johannesburg, Sandton", duration: "12 months", stipend: "R5000/month", description: "A beginner-friendly internship for aspiring software developers." },
    { id: 2, title: "Data Science Learnership", company: "Microsoft", location: "Cape Town", duration: "18 months", stipend: "R6000/month", description: "Learn data analysis, machine learning, and AI fundamentals." },
    { id: 3, title: "Finance Internship", company: "Standard Bank", location: "Johannesburg", duration: "12 months", stipend: "R5500/month", description: "Gain experience in banking, accounting, and financial analysis." },
    { id: 4, title: "Marketing Learnership", company: "Nike", location: "Cape Town", duration: "6 months", stipend: "R4000/month", description: "Learn digital marketing, social media management, and brand strategy." }
];

const fakeStatuses = { 1: 'Pending', 2: 'Hired', 3: 'Rejected', 4: 'Pending' };

function getApplications() {
    return JSON.parse(localStorage.getItem('applications') || '[]');
}

function hasApplied(id) {
    return getApplications().some(a => a.opportunityId == id);
}

function getAllOpportunities() {
    const providerOpps = JSON.parse(localStorage.getItem('providerOpportunities') || '[]')
        .filter(o => o.status === 'approved')
        .map((o, i) => ({ ...o, id: 'p' + i }));
    return [...hardcodedOpportunities, ...providerOpps];
}

function renderOpportunities() {
    const container = document.getElementById('opportunitiesList');
    container.innerHTML = '';
    const allOpps = getAllOpportunities();

    allOpps.forEach(opp => {
        const card = document.createElement('div');
        card.className = 'opportunity-card';
        const applied = hasApplied(opp.id);
        card.innerHTML = `
            <h3>${opp.title}</h3>
            <p><strong>Company:</strong> ${opp.company}</p>
            <p><strong>Location:</strong> ${opp.location}</p>
            <p><strong>Duration:</strong> ${opp.duration}</p>
            <p><strong>Stipend:</strong> ${opp.stipend}</p>
            <p><strong>Description:</strong> ${opp.description}</p>
            ${applied
                ? `<div class="already-applied">✅ Already Applied</div>`
                : `<button class="apply-btn" data-id="${opp.id}" data-title="${opp.title}" data-company="${opp.company}">Apply Now</button>`
            }
            <div id="msg-${opp.id}" class="message"></div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            const title = btn.getAttribute('data-title');
            const company = btn.getAttribute('data-company');

            // Get applicant name from userData
            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
            const applicantName = (userData.firstName || '') + ' ' + (userData.lastName || '');

            let applications = getApplications();
            applications.push({
                opportunityId: id,
                title: title,
                company: company,
                applicantName: applicantName.trim() || 'Anonymous',
                applicantEmail: userData.email || '',
                appliedDate: new Date().toLocaleDateString(),
                status: fakeStatuses[id] || 'Pending'
            });
            localStorage.setItem('applications', JSON.stringify(applications));
            document.getElementById(`msg-${id}`).innerHTML = '✅ Application submitted!';
            setTimeout(() => renderOpportunities(), 1000);
        });
    });
}

function renderApplications() {
    const applications = getApplications();
    const container = document.getElementById('applicationsList');

    if (applications.length === 0) {
        container.innerHTML = '<div class="empty-state">😕 You have not applied to any opportunities yet.</div>';
        return;
    }

    container.innerHTML = '';
    applications.forEach(app => {
        const div = document.createElement('div');
        div.className = 'application-card';
        div.innerHTML = `
            <div class="application-info">
                <h3>${app.title}</h3>
                <p>${app.company} · Applied on ${app.appliedDate}</p>
            </div>
            <span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span>
        `;
        container.appendChild(div);
    });
}

function showTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    if (tabName === 'opportunities') {
        document.querySelector('.tab:first-child').classList.add('active');
        document.getElementById('opportunitiesTab').classList.add('active');
        renderOpportunities();
    } else {
        document.querySelector('.tab:last-child').classList.add('active');
        document.getElementById('applicationsTab').classList.add('active');
        renderApplications();
    }
}

renderOpportunities();
