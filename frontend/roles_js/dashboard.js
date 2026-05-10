async function loadDashboard() {
  try {
    const response = await fetch("/api/dashboard/summary");
    const data = await response.json();

    document.getElementById("totalListings").innerText = data.totalListings;
    document.getElementById("totalApplications").innerText = data.totalApplications;
    document.getElementById("pendingApplications").innerText = data.pendingApplications;
    document.getElementById("successfulPlacements").innerText = data.successfulPlacements;

    new Chart(document.getElementById("statusChart"), {
      type: "doughnut",
      data: {
        labels: data.statusBreakdown.map((item) => item.status),
        datasets: [{
          data: data.statusBreakdown.map((item) => item.count),
        }],
      },
    });

    new Chart(document.getElementById("opportunityChart"), {
      type: "bar",
      data: {
        labels: data.applicationsPerOpportunity.map((item) => item.opportunity),
        datasets: [{
          label: "Applications",
          data: data.applicationsPerOpportunity.map((item) => item.count),
        }],
      },
    });
  } catch (error) {
    console.error("Failed to load dashboard:", error);
  }
}

loadDashboard();