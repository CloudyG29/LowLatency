require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   MIDDLEWARE (ORDER MATTERS)
========================= */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

/* FIX Firebase popup issue */
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});

/* =========================
   ROUTES
========================= */
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/get_user");
const listingRoutes = require("./routes/listings");
const profileRoutes = require("./routes/profile");
const reportRoutes = require("./routes/reports");

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reports", reportRoutes);

/* =========================
   FRONTEND ROUTES
========================= */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
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

app.get("/opportunity/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/views", "opportunity_detail.html"));
});

/* =========================
   START SERVER
========================= */
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;