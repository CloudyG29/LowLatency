async function guardApplicantPage() {
    try {
        const currentUser = firebase.auth().currentUser;

        if (!currentUser) {
            window.location.href = "/login";
            return false;
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
            return false;
        }

        const data = await response.json();

        if (data.role !== "Applicant") {
            window.location.href = "/login";
            return false;
        }

        // store user
        let userData = JSON.parse(localStorage.getItem("userData") || "{}");
        userData.email = data.email || "";
        userData.firstName = data.name || "";
        userData.lastName = data.surname || "";
        userData.role = data.role;

        localStorage.setItem("userData", JSON.stringify(userData));

        return true;

    } catch (error) {
        console.error("Applicant guard failed:", error);
        window.location.href = "/login";
        return false;
    }
}


// -------- OPPORTUNITIES --------
const hardcodedOpportunities = [
    { id: 1, title: "Software Internship", company: "Amazon", location: "Johannesburg", duration: "12 months", stipend: "R5000", description: "Beginner dev internship" },
    { id: 2, title: "Data Science Learnership", company: "Microsoft", location: "Cape Town", duration: "18 months", stipend: "R6000", description: "ML + AI" }
];


function getApplications() {
    return JSON.parse(localStorage.getItem('applications') || '[]');
}

function hasApplied(id) {
    return getApplications().some(a => a.opportunityId == id);
}

function renderOpportunities() {
    const container = document.getElementById('opportunitiesList');
    if (!container) return;

    container.innerHTML = '';

    hardcodedOpportunities.forEach(opp => {
        const applied = hasApplied(opp.id);

        const card = document.createElement('div');
        card.innerHTML = `
            <h3>${opp.title}</h3>
            <p>${opp.company}</p>
            ${applied 
                ? `<p>Already Applied</p>` 
                : `<button onclick="apply(${opp.id}, '${opp.title}', '${opp.company}')">Apply</button>`
            }
        `;

        container.appendChild(card);
    });
}


function apply(id, title, company) {
    let apps = getApplications();

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    apps.push({
        opportunityId: id,
        title,
        company,
        applicantName: `${userData.firstName} ${userData.lastName}`,
        status: "Pending"
    });

    localStorage.setItem('applications', JSON.stringify(apps));
    renderOpportunities();
}


// -------- INIT --------
document.addEventListener("DOMContentLoaded", async () => {
    const allowed = await guardApplicantPage();
    if (!allowed) return;

    renderOpportunities();
});