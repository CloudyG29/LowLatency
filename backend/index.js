require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../frontend"), { index: false }));
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/get_user");
const listingRoutes = require("./routes/listings");
const qualificationsRouter = require('./routes/qualifications');
const profileRoutes = require("./routes/profile");
const dashboardRoutes = require("./routes/dashboard");
const reportRoutes = require("./routes/reports");
const savedListingsRoutes = require('./routes/savedListings');   

app.use("/api/listings", listingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/reports", reportRoutes);  
app.use('/api/qualifications', qualificationsRouter);
app.use('/api/savedListings', savedListingsRoutes);

// Fix COOP header to allow Firebase popups
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);

// Serve HTML files for different routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "landing.html"));
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.get("/get-started", (req, res) => {
  res.redirect("/index");
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "login.html"));
});
app.get("/signup-applicant", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "signup-applicant.html"));
});
app.get("/signup-provider", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "signup-provider.html"));
});
app.get("/signup-admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "signup-admin.html"));
});
app.get("/applicant", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/roles_htmls", "applicant_view.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/roles_htmls", "admin_view.html"));
});
app.get("/provider", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/roles_htmls", "provider_view.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/roles_htmls", "dashboard.html"),
  );
});

app.get("/provider-onboarding", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "provider-onboarding.html"));
});

app.get("/forgot-password", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "forgot-password.html"));
});

app.get("/opportunity/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "opportunity_detail.html"));
});

app.get("/admin/report/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "report_detail.html"));
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
