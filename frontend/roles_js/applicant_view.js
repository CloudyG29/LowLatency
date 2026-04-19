function redirectToLogin() {
    if (typeof window !== "undefined" && typeof window.__redirectToLoginMock === "function") {
        window.__redirectToLoginMock("/login");
        return;
    }
    window.location.assign("/login");
}

async function guardApplicantPage() {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged(async (currentUser) => {
            try {
                if (!currentUser) {
                    redirectToLogin();
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
                    redirectToLogin();
                    return resolve(false);
                }

                const data = await response.json();

                if (data.role !== "Applicant") {
                    redirectToLogin();
                    return resolve(false);
                }

                let userData = JSON.parse(localStorage.getItem("userData") || "{}");
                userData.email = data.email || "";
                userData.firstName = data.name || "";
                userData.lastName = data.surname || "";
                userData.role = data.role;

                localStorage.setItem("userData", JSON.stringify(userData));

                const topName = document.getElementById("topName");
                const topRole = document.getElementById("topRole");
                const displayFirstName = document.getElementById("displayFirstName");
                const displayLastName = document.getElementById("displayLastName");
                const displayEmail = document.getElementById("displayEmail");
                const displayRoleBottom = document.getElementById("displayRoleBottom");

                if (topName) topName.textContent = `${userData.firstName} ${userData.lastName}`.trim();
                if (topRole) topRole.textContent = userData.role || "Applicant";
                if (displayFirstName) displayFirstName.textContent = userData.firstName || "Not set";
                if (displayLastName) displayLastName.textContent = userData.lastName || "Not set";
                if (displayEmail) displayEmail.textContent = userData.email || "Not set";
                if (displayRoleBottom) displayRoleBottom.textContent = userData.role || "Applicant";

                resolve(true);
            } catch (error) {
                console.error("Applicant guard failed:", error);
                redirectToLogin();
                resolve(false);
            }
        });
    });
}

// -------- OPPORTUNITIES --------
const hardcodedOpportunities = [
    {
        id: 1,
        title: "Software Internship",
        company: "Amazon",
        location: "Johannesburg",
        duration: "12 months",
        stipend: "R5000",
        description: "Beginner dev internship"
    },
    {
        id: 2,
        title: "Data Science Learnership",
        company: "Microsoft",
        location: "Cape Town",
        duration: "18 months",
        stipend: "R6000",
        description: "ML + AI"
    }
];

function getApplications() {
    return JSON.parse(localStorage.getItem("applications") || "[]");
}

function hasApplied(id) {
    return getApplications().some(a => a.opportunityId == id);
}

function renderOpportunities() {
    const container = document.getElementById("opportunitiesList");
    if (!container) return;

    container.innerHTML = "";

    hardcodedOpportunities.forEach(opp => {
        const applied = hasApplied(opp.id);

        const card = document.createElement("div");
        card.className = "opportunity-card";
        card.innerHTML = `
            <h3>${opp.title}</h3>
            <p><strong>Company:</strong> ${opp.company}</p>
            <p><strong>Location:</strong> ${opp.location}</p>
            <p><strong>Duration:</strong> ${opp.duration}</p>
            <p><strong>Stipend:</strong> ${opp.stipend}</p>
            <p><strong>Description:</strong> ${opp.description}</p>
            ${applied
                ? `<p>Already Applied</p>`
                : `<button onclick="apply(${opp.id}, '${opp.title}', '${opp.company}')">Apply</button>`
            }
        `;

        container.appendChild(card);
    });
}

function renderApplications() {
    const container = document.getElementById("applicationsList");
    if (!container) return;

    const applications = getApplications();

    if (applications.length === 0) {
        container.innerHTML = "<p>No applications yet.</p>";
        return;
    }

    container.innerHTML = "";

    applications.forEach(app => {
        const card = document.createElement("div");
        card.className = "application-card";
        card.innerHTML = `
            <h3>${app.title}</h3>
            <p>${app.company}</p>
            <p>Status: ${app.status}</p>
        `;
        container.appendChild(card);
    });
}

function apply(id, title, company) {
    let apps = getApplications();

    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    apps.push({
        opportunityId: id,
        title,
        company,
        applicantName: `${userData.firstName || ""} ${userData.lastName || ""}`.trim(),
        status: "Pending"
    });

    localStorage.setItem("applications", JSON.stringify(apps));
    renderOpportunities();
    renderApplications();
}

function showTab(tabName) {
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

    if (tabName === "opportunities") {
        document.getElementById("opportunitiesTab")?.classList.add("active");
        renderOpportunities();
    } else if (tabName === "applications") {
        document.getElementById("applicationsTab")?.classList.add("active");
        renderApplications();
    } else if (tabName === "profile") {
        document.getElementById("profileTab")?.classList.add("active");
    }
}

// -------- INIT --------
document.addEventListener("DOMContentLoaded", async () => {
    const allowed = await guardApplicantPage();
    if (!allowed) return;

    document.body.style.display = "block";
    renderOpportunities();
});

if (typeof module !== "undefined" && module.exports) {
  module.exports = { guardApplicantPage };
}