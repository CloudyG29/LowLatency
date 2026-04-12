const registerBtn = document.getElementById("registerBtn");
const applyBtn = document.getElementById("applyBtn");
const postBtn = document.getElementById("postBtn");
const approveBtn = document.getElementById("approveBtn");
const rejectBtn = document.getElementById("rejectBtn");
//the if statements check if the buttons exist on the page before adding event listeners to them. This prevents errors in case some buttons are not present on certain pages.
if (registerBtn) {
  registerBtn.addEventListener("click", function () {
    const registerMessage = document.getElementById("registerMessage");
    registerMessage.textContent = "Account created successfully!";
    registerMessage.className = "success";
  });
}

if (applyBtn) {
  applyBtn.addEventListener("click", function () {
    const applyMessage = document.getElementById("applyMessage");
    applyMessage.textContent = "Application submitted successfully!";
    applyMessage.className = "success";
  });
}

if (postBtn) {
  postBtn.addEventListener("click", function () {
    const postMessage = document.getElementById("postMessage");
    postMessage.textContent =
      "Listing submitted successfully! Status: Pending approval.";
    postMessage.className = "success";
  });
}

if (approveBtn) {
  approveBtn.addEventListener("click", function () {
    const adminMessage = document.getElementById("adminMessage");
    const statusText = document.getElementById("statusText");

    if (statusText) {
      statusText.textContent = "Approved";
      statusText.className = "success";
    }

    adminMessage.textContent = "Listing approved successfully!";
    adminMessage.className = "success";
  });
}

if (rejectBtn) {
  rejectBtn.addEventListener("click", function () {
    const adminMessage = document.getElementById("adminMessage");
    const statusText = document.getElementById("statusText");

    if (statusText) {
      statusText.textContent = "Rejected";
      statusText.className = "error";
    }

    adminMessage.textContent = "Listing rejected.";
    adminMessage.className = "error";
  });
}
