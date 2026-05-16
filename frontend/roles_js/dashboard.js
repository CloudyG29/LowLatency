let dashboardData = null;
let statusChart = null;
let opportunityChart = null;
let sectorChart = null;

async function loadDashboard() {
  showLoader();
  try {
    const response = await fetch("/api/dashboard/summary");

    if (!response.ok) {
      throw new Error("Failed to fetch dashboard summary");
    }

    dashboardData = await response.json();

    updateCards(dashboardData);
    populateStatusFilter(dashboardData.statusBreakdown);
    renderCharts();
    renderTopOpportunitiesTable(dashboardData.topOpportunities);
  } catch (error) {
    console.error("Failed to load dashboard:", error);
    alert("Failed to load dashboard analytics.");
  } finally {
    hideLoader();
  }
}

function updateCards(data) {
  showLoader();
  document.getElementById("totalListings").innerText = data.totalListings;
  document.getElementById("totalApplications").innerText = data.totalApplications;
  document.getElementById("shortlistedApplicants").innerText = data.shortlistedApplicants;
  document.getElementById("successfulPlacements").innerText = data.successfulPlacements;
  document.getElementById("averagePlacementRate").innerText = data.averagePlacementRate;
  hideLoader();
}

function populateStatusFilter(statusBreakdown) {
  showLoader();
  const statusFilter = document.getElementById("statusFilter");

  statusBreakdown.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.status;
    option.textContent = item.status;
    statusFilter.appendChild(option);
  });
  hideLoader();
}

function getFilteredStatusData() {
  showLoader();
  const selectedStatus = document.getElementById("statusFilter").value;

  if (selectedStatus === "all") {
    hideLoader();
    return dashboardData.statusBreakdown;
  }

  hideLoader();
  return dashboardData.statusBreakdown.filter(
    (item) => item.status === selectedStatus
  );
}

function getFilteredOpportunityData() {
  showLoader();
  const selectedOpportunityFilter =
    document.getElementById("opportunityFilter").value;

  if (selectedOpportunityFilter === "all") {
    hideLoader();
    return dashboardData.applicationsPerOpportunity;
  }
  hideLoader();
  return dashboardData.applicationsPerOpportunity.filter(
    (item) => item.count > 0
  );

}

function destroyExistingCharts() {
  if (statusChart) statusChart.destroy();
  if (opportunityChart) opportunityChart.destroy();
  if (sectorChart) sectorChart.destroy();
}

function renderCharts() {
  showLoader();
  if (!dashboardData) {
    hideLoader();
    return;
  }

  destroyExistingCharts();

  const filteredStatusData = getFilteredStatusData();
  const filteredOpportunityData = getFilteredOpportunityData();

  opportunityChart = new Chart(
    document.getElementById("opportunityChart"),
    {
      type: "bar",
      data: {
        labels: filteredOpportunityData.map(
          (item) => item.opportunity
        ),
        datasets: [
          {
            label: "Applications",
            data: filteredOpportunityData.map(
              (item) => item.count
            ),
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }
  );

  statusChart = new Chart(document.getElementById("statusChart"), {
    type: "doughnut",
    data: {
      labels: filteredStatusData.map((item) => item.status),
      datasets: [
        {
          data: filteredStatusData.map((item) => item.count),
        },
      ],
    },
    options: {
      responsive: true,
    },
  });

  sectorChart = new Chart(document.getElementById("sectorChart"), {
    type: "bar",
    data: {
      labels: dashboardData.sectorAnalysis.map(
        (item) => item.sector
      ),
      datasets: [
        {
          label: "Success Rate (%)",
          data: dashboardData.sectorAnalysis.map(
            (item) => item.successRate
          ),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
        },
      },
    },
  });
}

function renderTopOpportunitiesTable(topOpportunities) {
  showLoader();
  const tableBody = document.getElementById(
    "topOpportunitiesTable"
  );

  tableBody.innerHTML = "";

  if (!topOpportunities || topOpportunities.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6">No opportunities found yet.</td>
      </tr>
    `;
    hideLoader();
    return;
  }

  topOpportunities.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.opportunity}</td>
      <td>${item.sector}</td>
      <td>${item.count}</td>
      <td>${item.shortlisted}</td>
      <td>${item.placements}</td>
      <td>${item.successRate}%</td>
    `;

    tableBody.appendChild(row);
  });
  hideLoader();
}

function exportDashboardToCSV() {
  showLoader();
  if (!dashboardData) {
    hideLoader();
    return;
  }

  const rows = [
    ["Metric", "Value"],
    ["Total Opportunities", dashboardData.totalListings],
    ["Total Applications", dashboardData.totalApplications],
    ["Shortlisted Applicants", dashboardData.shortlistedApplicants],
    ["Successful Placements", dashboardData.successfulPlacements],
    [
      "Average Placement Rate",
      `${dashboardData.averagePlacementRate}%`,
    ],
    [],
    ["Status", "Count"],
    ...dashboardData.statusBreakdown.map((item) => [
      item.status,
      item.count,
    ]),
    [],
    ["Sector", "Applications", "Placements", "Success Rate"],
    ...dashboardData.sectorAnalysis.map((item) => [
      item.sector,
      item.applications,
      item.placements,
      `${item.successRate}%`,
    ]),
    [],
    [
      "Opportunity",
      "Sector",
      "Applications",
      "Shortlisted",
      "Placements",
      "Success Rate",
    ],
    ...dashboardData.applicationsPerOpportunity.map((item) => [
      item.opportunity,
      item.sector,
      item.count,
      item.shortlisted,
      item.placements,
      `${item.successRate}%`,
    ]),
  ];

  const csvContent = rows.map((row) => row.join(",")).join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv",
  });

  const downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "skillbridge-dashboard-report.csv";
  downloadLink.click();
  hideLoader();
}

function showLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

function hideLoader() {
  document.getElementById('loader').classList.add('hidden');
}

document
  .getElementById("statusFilter")
  .addEventListener("change", renderCharts);

document
  .getElementById("opportunityFilter")
  .addEventListener("change", renderCharts);

document
  .getElementById("resetFiltersBtn")
  .addEventListener("click", () => {
    document.getElementById("statusFilter").value = "all";
    document.getElementById("opportunityFilter").value = "nonZero";
    renderCharts();
  });

document
  .getElementById("exportCsvBtn")
  .addEventListener("click", exportDashboardToCSV);

loadDashboard();