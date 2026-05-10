let dashboardData = null;
let statusChart = null;
let opportunityChart = null;

async function loadDashboard() {
  try {
    const response = await fetch("/api/dashboard/summary");
    dashboardData = await response.json();

    updateCards(dashboardData);
    renderCharts();
  } catch (error) {
    console.error("Failed to load dashboard:", error);
  }
}

function updateCards(data) {
  document.getElementById("totalListings").innerText = data.totalListings;
  document.getElementById("totalApplications").innerText = data.totalApplications;
  document.getElementById("pendingApplications").innerText = data.pendingApplications;
  document.getElementById("successfulPlacements").innerText = data.successfulPlacements;
}

function getFilteredStatusData() {
  const selectedStatus = document.getElementById("statusFilter").value;

  if (selectedStatus === "all") {
    return dashboardData.statusBreakdown;
  }

  return dashboardData.statusBreakdown.filter(
    (item) => item.status === selectedStatus,
  );
}

function getFilteredOpportunityData() {
  const selectedOpportunityFilter = document.getElementById("opportunityFilter").value;

  if (selectedOpportunityFilter === "nonZero") {
    return dashboardData.applicationsPerOpportunity.filter(
      (item) => item.count > 0,
    );
  }

  return dashboardData.applicationsPerOpportunity;
}

function renderCharts() {
  const filteredStatusData = getFilteredStatusData();
  const filteredOpportunityData = getFilteredOpportunityData();

  if (statusChart) {
    statusChart.destroy();
  }

  if (opportunityChart) {
    opportunityChart.destroy();
  }

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
  });

  opportunityChart = new Chart(document.getElementById("opportunityChart"), {
    type: "bar",
    data: {
      labels: filteredOpportunityData.map((item) => item.opportunity),
      datasets: [
        {
          label: "Applications",
          data: filteredOpportunityData.map((item) => item.count),
        },
      ],
    },
  });
}

function exportDashboardToCSV() {
  if (!dashboardData) return;

  const rows = [
    ["Metric", "Value"],
    ["Total Listings", dashboardData.totalListings],
    ["Total Applications", dashboardData.totalApplications],
    ["Pending Applications", dashboardData.pendingApplications],
    ["Successful Placements", dashboardData.successfulPlacements],
    [],
    ["Status", "Count"],
    ...dashboardData.statusBreakdown.map((item) => [item.status, item.count]),
    [],
    ["Opportunity", "Applications"],
    ...dashboardData.applicationsPerOpportunity.map((item) => [
      item.opportunity,
      item.count,
    ]),
  ];

  const csvContent = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const downloadLink = document.createElement("a");

  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = "skillbridge-dashboard-report.csv";
  downloadLink.click();
}

document.getElementById("statusFilter").addEventListener("change", renderCharts);
document.getElementById("opportunityFilter").addEventListener("change", renderCharts);

document.getElementById("resetFiltersBtn").addEventListener("click", () => {
  document.getElementById("statusFilter").value = "all";
  document.getElementById("opportunityFilter").value = "all";
  renderCharts();
});

document.getElementById("exportCsvBtn").addEventListener("click", exportDashboardToCSV);

loadDashboard();